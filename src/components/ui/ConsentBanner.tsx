import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { grantMapsConsent } from "../../lib/consent";

const SEEN_KEY = "consentBannerSeen";
const SHOW_DELAY_MS = 800;

const isSeen = (): boolean => {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(SEEN_KEY) === "true";
  } catch {
    return true;
  }
};

const markSeen = (): void => {
  try {
    window.localStorage.setItem(SEEN_KEY, "true");
  } catch {
    /* localStorage disabled */
  }
};

function ConsentBanner() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isSeen()) return;
    if (pathname === "/cookies" || pathname === "/datenschutz") return;

    const timer = window.setTimeout(() => {
      setMounted(true);
      window.requestAnimationFrame(() => setOpen(true));
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!mounted) return null;

  const close = () => {
    setOpen(false);
    markSeen();
    window.setTimeout(() => setMounted(false), 350);
  };

  const handleAccept = () => {
    grantMapsConsent();
    close();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Hinweis"
      className={`pointer-events-none fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-md transition-all duration-300 ease-out sm:bottom-6 sm:left-6 sm:right-auto sm:mx-0 ${
        open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="pointer-events-auto rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-black/10 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/95 dark:shadow-black/40">
        <div className="flex items-start gap-3">
          <Cookie
            strokeWidth={1.6}
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600 dark:text-brand-300"
          />
          <div className="min-w-0 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <p>
              Diese Seite nutzt nur technisch notwendige Funktionen.{" "}
              <strong>Google Maps</strong> wird ausschließlich nach Ihrer
              Einwilligung geladen.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAccept}
                className="rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                Maps erlauben
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-full px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Ablehnen
              </button>
              <Link
                to="/cookies"
                onClick={close}
                className="ml-auto text-xs font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
              >
                Mehr
              </Link>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Schließen"
            className="-mr-1 -mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentBanner;
