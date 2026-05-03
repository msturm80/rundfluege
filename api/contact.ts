import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  passengers?: "1" | "2" | "3";
  message?: string;
  language?: "de" | "en";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?\d{7,15}$/;
const cleanPhone = (raw: string) => raw.replace(/[\s\-().\/]/g, "");
const HONEYPOT_FIELD = "company";

// In-memory sliding-window rate limit. Per-IP, two windows:
//   - 3 requests per 10 minutes (short-burst protection)
//   - 10 requests per 24 hours  (slow-drip protection)
// Stored on the function-instance heap. Cold starts reset state, but cold
// starts also slow attacks naturally. Combined with honeypot + validation
// this is plenty for a low-traffic site. Upgrade to Upstash if you ever
// see actual abuse.
const SHORT_WINDOW_MS = 10 * 60 * 1000;
const SHORT_WINDOW_MAX = 3;
const LONG_WINDOW_MS = 24 * 60 * 60 * 1000;
const LONG_WINDOW_MAX = 10;

const ipHits = new Map<string, number[]>();

const getClientIp = (req: VercelRequest): string => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  const real = req.headers["x-real-ip"];
  if (typeof real === "string" && real.length > 0) return real;
  return req.socket?.remoteAddress ?? "unknown";
};

type LimitResult = { ok: true } | { ok: false; retryAfter: number };

const checkRateLimit = (ip: string): LimitResult => {
  const now = Date.now();
  const all = (ipHits.get(ip) ?? []).filter((t) => now - t < LONG_WINDOW_MS);
  const recent = all.filter((t) => now - t < SHORT_WINDOW_MS);

  if (recent.length >= SHORT_WINDOW_MAX) {
    const retryAfter = Math.ceil((SHORT_WINDOW_MS - (now - recent[0])) / 1000);
    return { ok: false, retryAfter };
  }
  if (all.length >= LONG_WINDOW_MAX) {
    const retryAfter = Math.ceil((LONG_WINDOW_MS - (now - all[0])) / 1000);
    return { ok: false, retryAfter };
  }

  all.push(now);
  ipHits.set(ip, all);

  // Opportunistic GC: prevent the map from growing unbounded.
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits.entries()) {
      const fresh = v.filter((t) => now - t < LONG_WINDOW_MS);
      if (fresh.length === 0) ipHits.delete(k);
      else ipHits.set(k, fresh);
    }
  }

  return { ok: true };
};

const passengersLabel = (count: string | undefined, lang: "de" | "en") => {
  const n = count ?? "2";
  if (lang === "en") return n === "1" ? "1 passenger" : `${n} passengers`;
  return n === "1" ? "1 Person" : `${n} Personen`;
};

const buildBody = (p: ContactPayload, lang: "de" | "en") => {
  const linesDe = [
    `Hallo Hans,`,
    ``,
    `eine neue Rundflug-Anfrage über die Website ist eingegangen.`,
    ``,
    `Name:           ${p.name}`,
    `E-Mail:         ${p.email}`,
    `Telefon:        ${p.phone}`,
    `Wunschtermin:   ${p.date || "—"}`,
    `Personen:       ${passengersLabel(p.passengers, "de")}`,
    ``,
    `Nachricht:`,
    p.message ?? "",
    ``,
    `— gesendet via bodensee-rundflug.com`,
  ];
  const linesEn = [
    `Hi Hans,`,
    ``,
    `A new sightseeing flight inquiry came in via the website.`,
    ``,
    `Name:             ${p.name}`,
    `Email:            ${p.email}`,
    `Phone:            ${p.phone}`,
    `Preferred date:   ${p.date || "—"}`,
    `Passengers:       ${passengersLabel(p.passengers, "en")}`,
    ``,
    `Message:`,
    p.message ?? "",
    ``,
    `— sent via bodensee-rundflug.com`,
  ];
  return (lang === "en" ? linesEn : linesDe).join("\n");
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    res.setHeader("Retry-After", String(limit.retryAfter));
    return res.status(429).json({ error: "Too many requests", retryAfter: limit.retryAfter });
  }

  const body = (req.body ?? {}) as ContactPayload & Record<string, unknown>;
  const { name, email, phone, message } = body;
  const language: "de" | "en" = body.language === "en" ? "en" : "de";

  if (body[HONEYPOT_FIELD]) {
    return res.status(200).json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!PHONE_RE.test(cleanPhone(phone.trim()))) {
    return res.status(400).json({ error: "Invalid phone" });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: "Message too long" });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.MAIL_FROM?.trim() ||
    "Rundflüge Bodensee <noreply@bodensee-rundflug.com>";
  const to = process.env.INQUIRY_EMAIL?.trim() || "martin@sturms.org";

  if (!apiKey) {
    console.error("RESEND_API_KEY missing");
    return res.status(500).json({ error: "Server not configured" });
  }

  const resend = new Resend(apiKey);
  const subject =
    language === "en"
      ? `Sightseeing flight inquiry from ${name}`
      : `Rundflug-Anfrage von ${name}`;

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text: buildBody(body, language),
    });
    if (error) {
      console.error("Resend error", error);
      return res.status(502).json({ error: "Mail delivery failed" });
    }
    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("send failed", err);
    return res.status(502).json({ error: "Mail delivery failed" });
  }
}
