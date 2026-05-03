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
const HONEYPOT_FIELD = "company";

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
      return res.status(502).json({
        error: "Mail delivery failed",
        reason: error.message,
        name: error.name,
        from,
      });
    }
    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("send failed", err);
    return res.status(502).json({ error: "Mail delivery failed", reason: message });
  }
}
