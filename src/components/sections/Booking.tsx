import { useEffect, useState } from "react";
import { Calendar, Clock, Euro, Plane, Plus, Users } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { CONTACT, buildWhatsappUrl } from "../../config/contact";
import { PHOTOS } from "../../config/images";
import { isQuietHoursBerlin } from "../../lib/quietHours";

function Booking() {
  const { t, language } = useI18n();
  const [quiet, setQuiet] = useState<boolean>(false);

  useEffect(() => {
    const update = () => setQuiet(isQuietHoursBerlin());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const whatsappMessage =
    language === "de"
      ? "Hallo Hans, ich interessiere mich für einen Rundflug über den Bodensee."
      : "Hi Hans, I'm interested in a sightseeing flight over Lake Constance.";
  const whatsappUrl = buildWhatsappUrl(whatsappMessage);

  const includes = language === "de"
    ? ["Cessna D-EIZY", "Erfahrener Pilot", "Individuelle Route", "Ab Flughafen Friedrichshafen"]
    : ["Cessna D-EIZY", "Experienced pilot", "Individual route", "From Friedrichshafen airport"];

  return (
    <section
      id="booking"
      className="section relative overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-700/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/20"
      />

      <div className="container-x relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
              {t("booking.eyebrow")}
            </p>
            <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
            {t("booking.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            {t("booking.subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Featured price card */}
          <div className="reveal relative isolate flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl shadow-brand-900/20 lg:col-span-7 lg:p-10">
            <img
              src={PHOTOS.lindau.lg}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/95 via-slate-950/85 to-brand-900/70"
            />

            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
                <Plane className="h-4 w-4" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-200">
                {language === "de" ? "Standard-Rundflug" : "Standard flight"}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold leading-none tracking-tight md:text-7xl">
                  {CONTACT.priceBase}
                </span>
                <span className="font-display text-2xl font-semibold text-brand-200 md:text-3xl">
                  €
                </span>
                <span className="text-sm text-white/70 md:text-base">
                  {language === "de" ? "für 2 Personen" : "for 2 people"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-200" />
                  {language === "de" ? "ca. 60 Minuten Flugzeit" : "approx. 60 min flight"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-brand-200" />
                  <span>
                    {language === "de"
                      ? `${CONTACT.priceExtraPerson} € pro 3. Person`
                      : `${CONTACT.priceExtraPerson} € for the 3rd person`}
                  </span>
                </span>
              </div>

              <ul className="mt-7 grid gap-2.5 text-sm sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/90">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20 transition hover:bg-brand-50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                {t("booking.cta")}
              </a>
              {!quiet && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  {t("booking.ctaWhatsapp")}
                </a>
              )}
            </div>
          </div>

          {/* Side stat tiles */}
          <div className="reveal grid gap-6 lg:col-span-5 sm:grid-cols-3 lg:grid-cols-1">
            {([
              { key: "duration", Icon: Clock },
              { key: "price", Icon: Euro },
              { key: "extra", Icon: Users },
            ] as const).map(({ key, Icon }) => (
              <article
                key={key}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-600/60"
              >
                <div className="flex items-start gap-4">
                  <Icon
                    strokeWidth={1.6}
                    className="h-9 w-9 shrink-0 text-brand-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[-6deg] dark:text-brand-300"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight text-slate-900 dark:text-white">
                      {t(`booking.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {t(`booking.${key}.body`)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="reveal mt-10 overflow-hidden rounded-2xl border border-brand-200/70 bg-gradient-to-br from-brand-50 via-white to-brand-100/60 p-6 shadow-sm dark:border-brand-900/40 dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 md:p-8">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-7">
            <Calendar
              strokeWidth={1.6}
              className="h-12 w-12 shrink-0 text-brand-600 dark:text-brand-300"
            />
            <div className="flex-1">
              <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                {t("booking.flexible.title")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                {t("booking.flexible.body")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;
