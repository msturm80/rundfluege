import { useEffect, useState } from "react";
import { BarChart3, CheckCircle2, Map, ShieldCheck, ShieldOff } from "lucide-react";
import LegalLayout from "../components/layout/LegalLayout";
import {
  ANALYTICS_CONSENT_EVENT,
  MAPS_CONSENT_EVENT,
  grantAnalyticsConsent,
  grantMapsConsent,
  hasAnalyticsConsent,
  hasMapsConsent,
  revokeAnalyticsConsent,
  revokeMapsConsent,
} from "../lib/consent";

type ServiceProps = {
  Icon: typeof Map;
  title: string;
  description: string;
  granted: boolean;
  onGrant: () => void;
  onRevoke: () => void;
};

function ServiceToggle({ Icon, title, description, granted, onGrant, onRevoke }: ServiceProps) {
  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <Icon
          strokeWidth={1.6}
          className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand-600 dark:text-brand-300"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold text-slate-900 dark:text-white">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm font-medium">
            {granted ? (
              <>
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                <span className="text-emerald-700 dark:text-emerald-200">Aktuell erlaubt</span>
              </>
            ) : (
              <>
                <ShieldOff className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="text-slate-600 dark:text-slate-400">Aktuell nicht erlaubt</span>
              </>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            {!granted && (
              <button
                type="button"
                onClick={onGrant}
                className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm"
              >
                <ShieldCheck className="h-4 w-4" />
                Erlauben
              </button>
            )}
            {granted && (
              <button
                type="button"
                onClick={onRevoke}
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
  );
}

function Cookies() {
  const [maps, setMaps] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<boolean>(false);

  useEffect(() => {
    setMaps(hasMapsConsent());
    setAnalytics(hasAnalyticsConsent());
    const onMaps = (e: CustomEvent<boolean>) => setMaps(e.detail);
    const onAnalytics = (e: CustomEvent<boolean>) => setAnalytics(e.detail);
    window.addEventListener(MAPS_CONSENT_EVENT, onMaps);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, onAnalytics);
    return () => {
      window.removeEventListener(MAPS_CONSENT_EVENT, onMaps);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, onAnalytics);
    };
  }, []);

  return (
    <LegalLayout title="Cookie-Einstellungen">
      <p>
        Diese Website verwendet technisch notwendige Funktionen sowie optionale
        externe Dienste. Die Auswahl wird lokal in Ihrem Browser gespeichert und
        gilt für künftige Besuche, bis Sie die Einwilligung widerrufen.
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
      <ServiceToggle
        Icon={Map}
        title="Google Maps"
        description="Karte mit dem Treffpunkt am Flughafen Friedrichshafen."
        granted={maps}
        onGrant={grantMapsConsent}
        onRevoke={revokeMapsConsent}
      />

      <h2>Anonyme Statistik (Google Analytics)</h2>
      <p>
        Google Analytics 4 hilft uns, anonym zu erfassen, welche Inhalte
        besucht werden, damit wir die Website verbessern können. Erst nach
        Ihrer Zustimmung wird das Mess-Skript geladen.
      </p>
      <ServiceToggle
        Icon={BarChart3}
        title="Google Analytics 4"
        description="IP-Adresse anonymisiert; Mess-ID G-KKJGPNL47Z."
        granted={analytics}
        onGrant={grantAnalyticsConsent}
        onRevoke={revokeAnalyticsConsent}
      />
    </LegalLayout>
  );
}

export default Cookies;
