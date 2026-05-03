import { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, ShieldOff } from "lucide-react";
import LegalLayout from "../components/layout/LegalLayout";
import {
  MAPS_CONSENT_EVENT,
  grantMapsConsent,
  hasMapsConsent,
  revokeMapsConsent,
} from "../lib/consent";

function Cookies() {
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    setConsent(hasMapsConsent());
    const onChange = (e: CustomEvent<boolean>) => setConsent(e.detail);
    window.addEventListener(MAPS_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(MAPS_CONSENT_EVENT, onChange);
  }, []);

  return (
    <LegalLayout title="Cookie-Einstellungen">
      <p>
        Diese Website verwendet technisch notwendige Funktionen sowie optionale
        externe Dienste.
      </p>

      <h2>Technisch notwendige Funktionen</h2>
      <p>
        Diese Funktionen sind erforderlich, damit die Website korrekt angezeigt
        und betrieben werden kann. Sie können nicht deaktiviert werden.
      </p>
      <div className="not-prose my-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900 dark:border-emerald-700/60 dark:bg-emerald-900/30 dark:text-emerald-100">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <p>Aktiv – nicht abwählbar.</p>
      </div>

      <h2>Google Maps</h2>
      <p>
        Google Maps wird verwendet, um Karteninhalte anzuzeigen. Der Dienst
        wird erst geladen, wenn eine Einwilligung erteilt wurde.
      </p>

      <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start gap-3">
          {consent ? (
            <ShieldCheck className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600 dark:text-emerald-300" />
          ) : (
            <ShieldOff className="mt-0.5 h-6 w-6 flex-shrink-0 text-slate-500 dark:text-slate-400" />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold text-slate-900 dark:text-white">
              {consent
                ? "Google Maps ist aktuell erlaubt."
                : "Google Maps ist aktuell nicht erlaubt."}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Die Auswahl wird lokal in Ihrem Browser gespeichert und gilt
              für künftige Besuche, bis Sie die Einwilligung widerrufen.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              {!consent && (
                <button
                  type="button"
                  onClick={grantMapsConsent}
                  className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Google Maps erlauben
                </button>
              )}
              {consent && (
                <button
                  type="button"
                  onClick={revokeMapsConsent}
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm"
                >
                  <ShieldOff className="h-4 w-4" />
                  Einwilligung widerrufen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}

export default Cookies;
