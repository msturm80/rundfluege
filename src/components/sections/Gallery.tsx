import { useMemo, useState } from "react";
import { Maximize2, RotateCw } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { galleryPhotos } from "../../config/images";
import Lightbox from "../ui/Lightbox";

function Gallery() {
  const { t, language } = useI18n();
  const photos = useMemo(() => galleryPhotos(), []);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="section bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
    >
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-brand-600 dark:bg-brand-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
              {t("gallery.eyebrow")}
            </p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
            {t("gallery.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            {t("gallery.subtitle")}
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200/60 dark:bg-brand-900/30 dark:text-brand-200 dark:ring-brand-700/40 sm:hidden">
            <RotateCw className="h-3.5 w-3.5" />
            {language === "de"
              ? "Tipp: Handy drehen für Vollbild · seitwärts wischen"
              : "Tip: rotate phone for fullscreen · swipe sideways"}
          </p>
        </div>

        <div className="reveal mt-14 grid auto-rows-[12rem] grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-[14rem] lg:grid-cols-3 lg:auto-rows-[16rem] lg:gap-5">
          {photos.map((photo, index) => {
            const isFeatured = index === 0;
            const caption = photo.caption?.[language];
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={t("gallery.open")}
                className={`group relative overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200/60 transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-900/15 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-slate-800 dark:ring-slate-800 dark:hover:shadow-black/40 dark:focus:ring-offset-slate-950 ${
                  isFeatured
                    ? "row-span-1 lg:col-span-2 lg:row-span-2"
                    : "row-span-1"
                }`}
              >
                <img
                  src={photo.md}
                  srcSet={`${photo.md} 1400w`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  alt={photo.alt[language]}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 ring-1 ring-white/30 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Maximize2 className="h-4 w-4" />
                </span>

                {caption && (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 block translate-y-2 px-5 pb-4 text-left font-display text-sm italic leading-snug text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:text-base">
                    {caption}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        photos={photos}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}

export default Gallery;
