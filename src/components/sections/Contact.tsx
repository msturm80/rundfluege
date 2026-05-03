import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  AlertCircle,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2,
  Loader2,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { CONTACT, buildWhatsappUrl } from "../../config/contact";
import { PREFILL_ROUTE_EVENT } from "../../lib/prefillEvent";
import { meetingMapsUrl } from "../../lib/maps";
import MapsConsent from "../ui/MapsConsent";

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  passengers: "1" | "2" | "3";
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_REGEX = /^\+?\d{7,15}$/;
const cleanPhone = (raw: string) => raw.replace(/[\s\-().\/]/g, "");

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  passengers: "2",
  message: "",
};

function Contact() {
  const { language, t } = useI18n();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handlePrefill = (event: CustomEvent<{ route: string; message: string }>) => {
      const { message } = event.detail;
      setStatus("idle");
      setErrors({});
      setValues((prev) => ({ ...prev, message }));
      window.requestAnimationFrame(() => {
        const el = messageRef.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        const end = el.value.length;
        el.setSelectionRange(end, end);
      });
    };
    window.addEventListener(PREFILL_ROUTE_EVENT, handlePrefill);
    return () => window.removeEventListener(PREFILL_ROUTE_EVENT, handlePrefill);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = t("contact.form.required");
    if (!values.email.trim()) next.email = t("contact.form.required");
    else if (!EMAIL_REGEX.test(values.email.trim()))
      next.email = t("contact.form.invalidEmail");
    if (!values.phone.trim()) next.phone = t("contact.form.required");
    else if (!PHONE_DIGITS_REGEX.test(cleanPhone(values.phone)))
      next.phone = t("contact.form.invalidPhone");
    if (!values.message.trim()) next.message = t("contact.form.required");
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, language }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("contact submit failed", err);
      setStatus("error");
    }
  };

  const successWhatsappMessage =
    language === "de"
      ? "Hallo Hans, ich habe eben eine Anfrage geschickt und schreibe Ihnen hier ergänzend."
      : "Hi Hans, I just sent an inquiry and wanted to follow up here as well.";

  const detailsWhatsappMessage =
    language === "de"
      ? "Hallo Hans, ich interessiere mich für einen Rundflug über den Bodensee."
      : "Hi Hans, I'm interested in a sightseeing flight over Lake Constance.";

  const noteText =
    language === "de"
      ? "Sie können auch direkt per WhatsApp schreiben:"
      : "You can also write directly via WhatsApp:";

  const fieldError = (key: keyof FormState) =>
    errors[key] ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : "";

  const isLocked = status === "sending" || status === "success";

  const requiredMark = (
    <span aria-hidden="true" className="text-red-500"> *</span>
  );

  const labelBase =
    "pointer-events-none absolute left-3 -top-2.5 z-10 px-1.5 text-xs font-medium bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 transition-all duration-150";

  const labelFloating = (hasError: boolean) =>
    `${labelBase} ${
      hasError ? "text-red-600 dark:text-red-400" : ""
    } peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-500 dark:peer-placeholder-shown:text-slate-400 peer-placeholder-shown:bg-transparent dark:peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-medium peer-focus:bg-white dark:peer-focus:bg-slate-900 peer-focus:px-1.5 peer-focus:text-brand-700 dark:peer-focus:text-brand-300`;

  const labelStatic = (hasError: boolean) =>
    `${labelBase} ${hasError ? "text-red-600 dark:text-red-400" : ""}`;

  return (
    <section
      id="contact"
      className="section bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="container-x">
        <div className="reveal mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
              {t("contact.eyebrow")}
            </p>
            <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="reveal lg:col-span-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
              {status === "success" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-start gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-700/60 dark:bg-emerald-900/30 dark:text-emerald-100"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30 dark:bg-emerald-400/15 dark:text-emerald-300 dark:ring-emerald-400/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <p className="font-display text-xl font-semibold leading-snug md:text-2xl">
                    {t("contact.form.success")}
                  </p>
                  <div className="w-full border-t border-emerald-200/70 pt-4 dark:border-emerald-700/40">
                    <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80">
                      {noteText}
                    </p>
                    <a
                      href={buildWhatsappUrl(successWhatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1fbb5b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {t("common.whatsapp")}
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  autoComplete="on"
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        autoCapitalize="words"
                        spellCheck={false}
                        placeholder=" "
                        value={values.name}
                        onChange={handleChange}
                        disabled={isLocked}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className={`peer input-field placeholder-transparent ${fieldError("name")}`}
                      />
                      <label htmlFor="contact-name" className={labelFloating(Boolean(errors.name))}>
                        {t("contact.form.name")}
                        {requiredMark}
                      </label>
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        inputMode="email"
                        placeholder=" "
                        value={values.email}
                        onChange={handleChange}
                        disabled={isLocked}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className={`peer input-field placeholder-transparent ${fieldError("email")}`}
                      />
                      <label htmlFor="contact-email" className={labelFloating(Boolean(errors.email))}>
                        {t("contact.form.email")}
                        {requiredMark}
                      </label>
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder=" "
                        value={values.phone}
                        onChange={handleChange}
                        disabled={isLocked}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                        className={`peer input-field placeholder-transparent ${fieldError("phone")}`}
                      />
                      <label htmlFor="contact-phone" className={labelFloating(Boolean(errors.phone))}>
                        {t("contact.form.phone")}
                        {requiredMark}
                      </label>
                      {errors.phone && (
                        <p
                          id="contact-phone-error"
                          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="contact-date"
                        name="date"
                        type="date"
                        autoComplete="off"
                        placeholder=" "
                        min={new Date().toISOString().slice(0, 10)}
                        value={values.date}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="peer input-field cursor-pointer pr-11"
                      />
                      <label htmlFor="contact-date" className={labelStatic(false)}>
                        {t("contact.form.date")}
                      </label>
                      <Calendar
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-brand-600 dark:text-brand-300"
                      />
                    </div>

                    <div className="relative md:col-span-2">
                      <select
                        id="contact-passengers"
                        name="passengers"
                        value={values.passengers}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="input-field appearance-none pr-10"
                      >
                        <option value="1">{t("contact.form.passengersOptions.1")}</option>
                        <option value="2">{t("contact.form.passengersOptions.2")}</option>
                        <option value="3">{t("contact.form.passengersOptions.3")}</option>
                      </select>
                      <label htmlFor="contact-passengers" className={labelStatic(false)}>
                        {t("contact.form.passengers")}
                      </label>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                      >
                        ▾
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      ref={messageRef}
                      rows={5}
                      required
                      autoCapitalize="sentences"
                      spellCheck
                      placeholder=" "
                      value={values.message}
                      onChange={handleChange}
                      disabled={isLocked}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={`peer input-field resize-y placeholder-transparent ${fieldError("message")}`}
                    />
                    <label
                      htmlFor="contact-message"
                      className={labelFloating(Boolean(errors.message))}
                    >
                      {t("contact.form.message")}
                      {requiredMark}
                    </label>
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot field — hidden from humans, bots will fill it. */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    onChange={() => undefined}
                    value=""
                  />

                  {status === "error" && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700/60 dark:bg-red-900/30 dark:text-red-200"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <p>{t("contact.form.error")}</p>
                    </div>
                  )}

                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {language === "de" ? (
                      <>
                        Mit dem Absenden des Formulars erklären Sie sich damit
                        einverstanden, dass Ihre Angaben zur Bearbeitung Ihrer
                        Anfrage verarbeitet werden. Weitere Informationen finden
                        Sie in der{" "}
                        <Link
                          to="/datenschutz"
                          className="underline transition hover:text-brand-600 dark:hover:text-brand-300"
                        >
                          Datenschutzerklärung
                        </Link>
                        .
                      </>
                    ) : (
                      <>
                        By submitting this form you agree that your information
                        will be processed to handle your inquiry. For details
                        see our{" "}
                        <Link
                          to="/datenschutz"
                          className="underline transition hover:text-brand-600 dark:hover:text-brand-300"
                        >
                          privacy policy
                        </Link>
                        .
                      </>
                    )}
                  </p>

                  <div className="flex flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      <span aria-hidden="true" className="text-red-500">*</span>{" "}
                      {t("contact.form.required")}
                    </p>
                    <button
                      type="submit"
                      disabled={isLocked}
                      className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t("contact.form.submit")}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <aside className="reveal lg:col-span-2">
            <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Mail
                    strokeWidth={1.6}
                    className="mt-1 h-7 w-7 flex-shrink-0 text-brand-600 dark:text-brand-300"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {t("contact.details.email")}
                    </p>
                    <a
                      href={`mailto:${CONTACT.pilotEmail}`}
                      className="mt-1 block break-all font-medium text-slate-900 transition hover:text-brand-600 dark:text-white dark:hover:text-brand-300"
                    >
                      {CONTACT.pilotEmail}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <MapPin
                    strokeWidth={1.6}
                    className="mt-1 h-7 w-7 flex-shrink-0 text-brand-600 dark:text-brand-300"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {t("contact.details.meetingPoint")}
                    </p>
                    <a
                      href={meetingMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Treffpunkt auf Google Maps öffnen"
                      className="group mt-1 inline-block transition hover:text-brand-600 dark:hover:text-brand-300"
                    >
                      <address className="not-italic text-sm leading-relaxed text-slate-700 underline decoration-slate-300 decoration-1 underline-offset-4 transition group-hover:decoration-brand-500 dark:text-slate-200 dark:decoration-slate-600">
                        <span className="block">{CONTACT.meetingAddress.line1}</span>
                        <span className="block">{CONTACT.meetingAddress.line2}</span>
                        <span className="block">{CONTACT.meetingAddress.line3}</span>
                      </address>
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <MessageCircle
                    strokeWidth={1.6}
                    className="mt-1 h-7 w-7 flex-shrink-0 text-[#1fbb5b] dark:text-[#4be38c]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {t("common.whatsapp")}
                    </p>
                    <a
                      href={buildWhatsappUrl(detailsWhatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 font-medium text-slate-900 transition hover:text-[#1fbb5b] dark:text-white dark:hover:text-[#4be38c]"
                    >
                      {t("contact.form.whatsapp")}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="reveal mt-10">
          <MapsConsent />
        </div>
      </div>
    </section>
  );
}

export default Contact;
