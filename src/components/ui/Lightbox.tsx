import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, RotateCw, X } from "lucide-react";
import type { Photo } from "../../config/images";
import { useI18n } from "../../i18n/I18nContext";

type LightboxProps = {
  photos: Photo[];
  openIndex: number | null;
  onClose: () => void;
};

const ADVANCE_MS = 5000;

function Lightbox({ photos, openIndex, onClose }: LightboxProps) {
  const { t, language } = useI18n();
  const [currentIndex, setCurrentIndex] = useState<number>(openIndex ?? 0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
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
    if (openIndex !== null) setCurrentIndex(openIndex);
  }, [openIndex]);

  // Track orientation. Auto-advance only kicks in when the device is in
  // landscape (the cinema-mode experience).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(orientation: landscape)");
    const apply = (matches: boolean) =>
      setOrientation(matches ? "landscape" : "portrait");
    apply(mql.matches);
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Auto-advance in landscape
  useEffect(() => {
    if (!isOpen) return;
    if (orientation !== "landscape") return;
    if (total < 2) return;
    const id = window.setTimeout(goNext, ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [isOpen, orientation, currentIndex, total, goNext]);

  // Body scroll lock + focus trap setup + keyboard nav
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

  const isLandscape = orientation === "landscape";
  const rotateHint =
    language === "de"
      ? "Quer drehen für Vollbild"
      : "Rotate for fullscreen";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("gallery.title")}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="animate-fade-in fixed inset-0 z-[60] bg-black touch-pan-y"
    >
      {/* Image — full bleed, no chrome, no rounding */}
      <img
        key={currentIndex}
        src={photo.lg}
        alt={photo.alt[language]}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in absolute inset-0 h-full w-full object-contain"
      />

      {/* Close button — always visible */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={t("gallery.close")}
        className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-6 md:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Portrait-only chrome: side prev/next on tablet+, rotate hint, caption + counter */}
      {!isLandscape && (
        <>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label={t("gallery.previous")}
                className="absolute left-2 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex md:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label={t("gallery.next")}
                className="absolute right-2 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex md:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Rotate-for-fullscreen hint, mobile portrait only */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 md:hidden"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md">
              <RotateCw className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
              {rotateHint}
            </span>
          </div>

          {/* Caption + counter */}
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label={t("gallery.next")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="pointer-events-auto max-w-[92vw] rounded-full bg-black/45 px-5 py-2.5 text-center text-white backdrop-blur-md">
              {caption && (
                <p className="font-display text-sm italic leading-snug text-white/95 md:text-base">
                  {caption}
                </p>
              )}
              <p
                className={`text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 ${
                  caption ? "mt-0.5" : ""
                }`}
              >
                {counter}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Landscape-only chrome: progress dot indicator */}
      {isLandscape && total > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center md:bottom-6"
        >
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 backdrop-blur-md">
            {photos.map((p, i) => {
              const active = i === currentIndex;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`${i + 1} / ${total}`}
                  aria-current={active ? "true" : undefined}
                  className={`h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                    active ? "w-9 bg-white/30" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                >
                  {active && (
                    <span
                      key={currentIndex}
                      aria-hidden="true"
                      className="block h-full w-full origin-left bg-white animate-progress"
                      style={{ ["--progress-duration" as string]: `${ADVANCE_MS}ms` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}

export default Lightbox;
