import { Heart } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { CONTACT } from "../../config/contact";
import { PILOT_PHOTOS } from "../../config/images";

const PILOT_IMAGE = PILOT_PHOTOS.cockpit;
const PILOT_IMAGE_SECONDARY = PILOT_PHOTOS.walking;

function Pilot() {
  const { t } = useI18n();

  const stats = ["years", "flights", "aircraft"] as const;

  return (
    <section
      id="pilot"
      className="section relative bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-16">
          <div className="reveal relative order-2 md:order-1">
            <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-brand-200/60 blur-3xl dark:bg-brand-900/30" />

            <div className="relative mx-auto w-full max-w-md md:max-w-lg">
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200/60 dark:ring-slate-800">
                <img
                  src={PILOT_IMAGE}
                  alt={`${CONTACT.pilotName} – ${CONTACT.aircraft}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -left-6 hidden w-44 overflow-hidden rounded-2xl shadow-xl shadow-slate-900/25 ring-4 ring-white dark:ring-slate-900 sm:block md:w-52 md:-bottom-10 md:-left-8">
                <img
                  src={PILOT_IMAGE_SECONDARY}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>

              <div className="absolute -top-3 right-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-xl shadow-slate-900/15 ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/60">
                <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                  {CONTACT.pilotName}
                </span>
                <span className="rounded-full bg-brand-600/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  {CONTACT.aircraft}
                </span>
              </div>
            </div>
          </div>

          <div className="reveal order-1 md:order-2">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
                {t("pilot.eyebrow")}
              </p>
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
              {t("pilot.title")}
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
              <p>{t("pilot.paragraph1")}</p>
              <p>{t("pilot.paragraph2")}</p>
              <p>{t("pilot.paragraph3")}</p>
            </div>

            <figure className="mt-8 flex gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 dark:border-brand-900/50 dark:bg-brand-950/30">
              <Heart
                strokeWidth={1.6}
                className="h-7 w-7 shrink-0 text-brand-600 dark:text-brand-300"
              />
              <blockquote className="font-display text-base italic leading-relaxed text-slate-700 dark:text-slate-200 md:text-lg">
                {t("pilot.paragraph3")}
              </blockquote>
            </figure>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8 dark:border-slate-800">
              {stats.map((key) => (
                <div key={key} className="text-center sm:text-left">
                  <dt className="font-display text-3xl font-bold text-brand-700 dark:text-brand-300 md:text-4xl">
                    {t(`pilot.stats.${key}.value`)}
                  </dt>
                  <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {t(`pilot.stats.${key}.label`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pilot;
