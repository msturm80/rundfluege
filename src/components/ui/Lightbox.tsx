import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "../../config/images";
import { useI18n } from "../../i18n/I18nContext";

type LightboxProps = {
  photos: Photo[];
  openIndex: number | null;
  onClose: () => void;
};

function Lightbox({ photos, openIndex, onClose }: LightboxProps) {
  const { t, language } = useI18n();
  const [currentIndex, setCurrentIndex] = useState<number>(openIndex ?? 0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const isOpen = openIndex !== null;
  const total = photos.length;

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  useEffect(() => {
    if (openIndex !== null) {
      setCurrentIndex(openIndex);
    }
  }, [openIndex]);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (!isOpen || total === 0) return null;

  const photo = photos[currentIndex];
  const caption = photo.caption?.[language];
  const counter = t("gallery.counter")
    .replace("{{current}}", String(currentIndex + 1))
    .replace("{{total}}", String(total));

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("gallery.title")}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm touch-pan-y"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={t("gallery.close")}
        className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 hover:ring-white/40 focus:outline-none focus:ring-2 focus:ring-brand-400 md:right-6 md:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label={t("gallery.previous")}
          className="absolute left-2 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 hover:shadow-[0_0_30px_-5px] hover:shadow-brand-400/60 hover:ring-brand-300/50 focus:outline-none focus:ring-2 focus:ring-brand-400 md:inline-flex md:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label={t("gallery.next")}
          className="absolute right-2 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 hover:shadow-[0_0_30px_-5px] hover:shadow-brand-400/60 hover:ring-brand-300/50 focus:outline-none focus:ring-2 focus:ring-brand-400 md:inline-flex md:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full max-w-full flex-col items-center justify-center px-4"
      >
        <img
          key={currentIndex}
          src={photo.lg}
          alt={photo.alt[language]}
          className="animate-fade-in max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
        />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-3 px-4 md:bottom-8"
      >
        {total > 1 && (
          <div className="pointer-events-auto flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={goPrev}
              aria-label={t("gallery.previous")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t("gallery.next")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="pointer-events-auto glass max-w-[92vw] rounded-full px-5 py-3 text-center text-white shadow-xl">
          {caption && (
            <p className="font-display text-sm italic leading-snug text-white/95 md:text-base">
              {caption}
            </p>
          )}
          <p
            className={`text-xs font-medium uppercase tracking-[0.2em] text-white/70 ${
              caption ? "mt-1" : ""
            }`}
          >
            {counter}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Lightbox;
