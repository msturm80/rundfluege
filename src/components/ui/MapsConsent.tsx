import { useEffect, useState } from "react";
import { Map, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT } from "../../config/contact";
import {
  MAPS_CONSENT_EVENT,
  grantMapsConsent,
  hasMapsConsent,
} from "../../lib/consent";

const buildMapEmbedUrl = (): string => {
  const q = encodeURIComponent(
    `${CONTACT.meetingAddress.line1}, ${CONTACT.meetingAddress.line2}, ${CONTACT.meetingAddress.line3}`,
  );
  return `https://www.google.com/maps?q=${q}&output=embed`;
};

function MapsConsent() {
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    setConsent(hasMapsConsent());
    const onChange = (e: CustomEvent<boolean>) => setConsent(e.detail);
    window.addEventListener(MAPS_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(MAPS_CONSENT_EVENT, onChange);
  }, []);

  if (consent) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
        <iframe
          title="Karte – Treffpunkt am Flughafen Friedrichshafen"
          src={buildMapEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-72 w-full md:h-96"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="flex items-start gap-4">
        <Map
          strokeWidth={1.6}
          className="mt-1 h-8 w-8 flex-shrink-0 text-brand-600 dark:text-brand-300"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            Karte ausgeblendet
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Zur Anzeige der Karte wird Google Maps geladen. Dabei können
            personenbezogene Daten an Google übertragen werden. Bitte stimmen
            Sie der Nutzung von Google Maps zu.
          </p>
          <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={grantMapsConsent}
              className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm"
            >
              <ShieldCheck className="h-4 w-4" />
              Google Maps anzeigen
            </button>
            <Link
              to="/datenschutz"
              className="text-xs font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300 sm:ml-2"
            >
              Mehr in der Datenschutzerklärung
            </Link>
          </div>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            {CONTACT.meetingAddress.line1}, {CONTACT.meetingAddress.line2},{" "}
            {CONTACT.meetingAddress.line3}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MapsConsent;
