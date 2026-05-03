import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Info, Map, MapPin, Navigation, ShieldCheck } from "lucide-react";
import {
  MEETING_ADDRESS,
  meetingDirectionsUrl,
  meetingMapsEmbedUrl,
  meetingMapsUrl,
} from "../../lib/maps";
import {
  MAPS_CONSENT_EVENT,
  grantMapsConsent,
  hasMapsConsent,
} from "../../lib/consent";

function MapsConsent() {
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    setConsent(hasMapsConsent());
    const onChange = (e: CustomEvent<boolean>) => setConsent(e.detail);
    window.addEventListener(MAPS_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(MAPS_CONSENT_EVENT, onChange);
  }, []);

  const directionsButton = (
    <a
      href={meetingDirectionsUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-brand-200 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
    >
      <Navigation className="h-4 w-4" />
      Route planen
    </a>
  );

  const meetingHint = (
    <p className="inline-flex items-start gap-1.5 text-xs italic leading-relaxed text-slate-500 dark:text-slate-400">
      <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
      <span>
        Treffpunkt: <strong className="font-semibold not-italic">Parkplatz neben der Flugschule Phoenix Bodensee</strong>.
        Google Maps zeigt für die Adresse den Eintrag der Flugschule – wir
        treffen uns daneben.
      </span>
    </p>
  );

  if (consent) {
    return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
          <iframe
            title="Karte – Treffpunkt am Flughafen Friedrichshafen"
            src={meetingMapsEmbedUrl()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-72 w-full md:h-96"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
          <a
            href={meetingMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Treffpunkt auf Google Maps öffnen"
            className="group inline-flex items-center gap-1.5 rounded transition hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 dark:hover:text-brand-300"
          >
            <MapPin className="h-4 w-4 text-brand-600 dark:text-brand-300" />
            <span className="underline decoration-slate-300 decoration-1 underline-offset-4 transition group-hover:decoration-brand-500 dark:decoration-slate-600">
              {MEETING_ADDRESS}
            </span>
            <ExternalLink className="h-3 w-3 opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
          </a>
          {directionsButton}
        </div>
        {meetingHint}
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
            {directionsButton}
            <Link
              to="/datenschutz"
              className="text-xs font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300 sm:ml-2"
            >
              Mehr in der Datenschutzerklärung
            </Link>
          </div>
          <a
            href={meetingMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Treffpunkt auf Google Maps öffnen"
            className="group mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span className="underline decoration-slate-300 decoration-1 underline-offset-4 transition group-hover:decoration-brand-500 dark:decoration-slate-700">
              {MEETING_ADDRESS}
            </span>
          </a>
          <div className="mt-2">{meetingHint}</div>
        </div>
      </div>
    </div>
  );
}

export default MapsConsent;
