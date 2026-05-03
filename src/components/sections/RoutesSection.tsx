import type { ComponentType, CSSProperties, SVGProps } from "react";
import {
  ArrowRight,
  Castle,
  Clock,
  Euro,
  Mountain,
  Sailboat,
  Ship,
} from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { dispatchPrefillRoute } from "../../lib/prefillEvent";
import { PHOTOS, type Photo } from "../../config/images";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

type RouteKey = "klein" | "gross" | "alpen" | "neuschwanstein";

type RouteItem = {
  key: RouteKey;
  Icon: LucideIcon;
  photo: Photo;
};

const ROUTES: RouteItem[] = [
  { key: "klein", Icon: Sailboat, photo: PHOTOS.konstanz },
  { key: "gross", Icon: Ship, photo: PHOTOS.lindau },
  { key: "alpen", Icon: Mountain, photo: PHOTOS.alps },
  { key: "neuschwanstein", Icon: Castle, photo: PHOTOS.neuschwanstein },
];

function RoutesSection() {
  const { t, language } = useI18n();

  const handleRouteClick = (routeTitle: string) => {
    const message = t("routes.prefillTemplate").replace("{{route}}", routeTitle);
    dispatchPrefillRoute({ route: routeTitle, message });
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <section
      id="routes"
      className="section bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
              {t("routes.eyebrow")}
            </p>
            <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
            {t("routes.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            {t("routes.subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ROUTES.map(({ key, Icon, photo }, index) => {
            const style: CSSProperties = { transitionDelay: `${index * 70}ms` };
            const title = t(`routes.items.${key}.title`);
            const body = t(`routes.items.${key}.body`);
            const duration = t(`routes.items.${key}.duration`);
            const price = t(`routes.items.${key}.price`);
            const requestLabel = t("routes.requestThis");
            const durationLabel = t("routes.durationLabel");
            const priceLabel = t("routes.priceLabel");

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleRouteClick(title)}
                aria-label={`${requestLabel}: ${title}`}
                style={style}
                className="reveal group relative h-80 cursor-pointer rounded-2xl text-left text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 md:h-96"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 overflow-hidden rounded-2xl bg-slate-900"
                >
                  <img
                    src={photo.md}
                    alt={photo.alt[language]}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/15" />
                </span>

                <span className="relative flex h-full flex-col justify-between p-6 md:p-7">
                  <span className="flex items-start justify-between gap-3">
                    <Icon
                      strokeWidth={1.6}
                      className="h-10 w-10 text-white transition-transform duration-500 ease-out [filter:drop-shadow(0_2px_8px_rgb(0_0_0_/_0.55))] group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:rotate-[-6deg] md:h-12 md:w-12"
                    />
                    <span className="flex flex-col items-end gap-1.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-white/30 backdrop-blur-md"
                        title={durationLabel}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        <span className="sr-only">{durationLabel}: </span>
                        {duration}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/90 px-3 py-1 text-xs font-bold text-white shadow-sm ring-1 ring-white/30 backdrop-blur-md"
                        title={priceLabel}
                      >
                        <Euro className="h-3.5 w-3.5" />
                        <span className="sr-only">{priceLabel}: </span>
                        {price}
                      </span>
                    </span>
                  </span>

                  <span className="block">
                    <span className="block font-display text-2xl font-bold leading-tight drop-shadow-md md:text-3xl">
                      {title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/90 drop-shadow-sm md:text-base">
                      {body}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-2.5">
                      {requestLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RoutesSection;
