import { ChevronDown, Plane } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { HERO_PHOTO } from "../../config/images";

const HERO_IMAGE = HERO_PHOTO.lg;

function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center animate-slow-pan"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950/80"
      />

      <Plane
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[22%] h-12 w-12 -rotate-12 text-white/30 animate-float md:h-16 md:w-16"
      />
      <Plane
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] bottom-[26%] h-8 w-8 rotate-12 text-white/20 animate-float md:h-10 md:w-10"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container-x relative w-full py-28 md:py-32">
        <div className="mx-auto max-w-3xl rounded-3xl bg-slate-950/30 px-6 py-10 text-center shadow-xl shadow-black/30 ring-1 ring-white/10 backdrop-blur-md sm:px-10 sm:py-12 md:px-14 md:py-14">
          <p
            className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-200 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
          >
            <span aria-hidden="true" className="h-px w-10 bg-brand-300/70" />
            <span>{t("hero.eyebrow")}</span>
            <span aria-hidden="true" className="h-px w-10 bg-brand-300/70" />
          </p>

          <h1
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-sm opacity-0 animate-fade-up sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            {t("hero.title")}{" "}
            <span className="italic text-brand-300">{t("hero.titleAccent")}</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 opacity-0 animate-fade-up sm:text-lg md:text-xl"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="mt-10 flex flex-col items-center justify-center gap-3 opacity-0 animate-fade-up sm:flex-row sm:gap-4"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <a href="#contact" className="btn-primary px-7 py-3.5 text-sm">
              {t("hero.cta")}
            </a>
            <a
              href="#experience"
              className="btn inline-flex border border-white/40 bg-white/5 px-7 py-3.5 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <p
            className="mt-8 text-sm italic text-white/70 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            {t("hero.tagline")}
          </p>
        </div>
      </div>

      <a
        href="#experience"
        aria-label={t("hero.ctaSecondary")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 transition-colors hover:text-white"
      >
        <span className="flex flex-col items-center gap-2">
          <span className="h-10 w-px bg-white/40" aria-hidden="true" />
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </span>
      </a>
    </section>
  );
}

export default Hero;
