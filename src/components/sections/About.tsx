import { Plane, Sparkles, Heart, Star } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { CONTACT } from "../../config/contact";
import { ABOUT_MAIN_PHOTO, ABOUT_SECONDARY_PHOTO } from "../../config/images";

function About() {
  const { t, language } = useI18n();

  const features = [
    { key: "f1", Icon: Sparkles },
    { key: "f2", Icon: Heart },
    { key: "f3", Icon: Star },
  ] as const;

  return (
    <section
      id="experience"
      className="section bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-16">
          <div className="reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
                {t("about.subtitle")}
              </p>
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
              {t("about.title")}
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
              <p>{t("about.paragraph1")}</p>
              <p>{t("about.paragraph2")}</p>
              <p>{t("about.paragraph3")}</p>
            </div>
          </div>

          <div className="reveal relative md:pl-6">
            <div className="absolute -top-10 -right-6 h-48 w-48 rounded-full bg-brand-200/50 blur-3xl dark:bg-brand-900/30" />
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/70 dark:shadow-black/40 dark:ring-slate-800">
                <img
                  src={ABOUT_MAIN_PHOTO.lg}
                  srcSet={`${ABOUT_MAIN_PHOTO.md} 1400w, ${ABOUT_MAIN_PHOTO.lg} 2400w`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt={ABOUT_MAIN_PHOTO.alt[language]}
                  loading="lazy"
                  className="h-[420px] w-full object-cover md:h-[480px]"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 hidden h-48 w-56 overflow-hidden rounded-2xl shadow-xl shadow-slate-900/20 ring-4 ring-white dark:ring-slate-950 sm:block">
                <img
                  src={ABOUT_SECONDARY_PHOTO.md}
                  alt={ABOUT_SECONDARY_PHOTO.alt[language]}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="animate-float absolute -top-6 left-6 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/15 ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/95 dark:shadow-black/40 dark:ring-slate-700/60">
                <Plane className="h-6 w-6 -rotate-12 text-brand-600 dark:text-brand-300" />
                <div className="leading-tight">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {t("about.subtitle")}
                  </p>
                  <p className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                    {CONTACT.aircraft}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {features.map(({ key, Icon }) => (
            <article
              key={key}
              className="reveal group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700/60 dark:hover:shadow-brand-500/10"
            >
              <Icon
                strokeWidth={1.6}
                className="h-9 w-9 text-brand-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[-6deg] dark:text-brand-300"
              />
              <h3 className="mt-5 font-display text-xl font-semibold text-slate-900 dark:text-white">
                {t(`about.features.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t(`about.features.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
