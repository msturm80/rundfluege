import LegalLayout from "../components/layout/LegalLayout";

type Credit = {
  title: string;
  thumb: string;
  author: string;
  authorUrl: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  notes?: string;
};

const CC_BY_SA_4 = {
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.de",
};

const CREDITS: Credit[] = [
  {
    title: "Konstanz – Luftbild",
    thumb: "/images/photos/konstanz_md.jpg",
    author: "SimonWaldherr",
    authorUrl: "https://commons.wikimedia.org/wiki/User:SimonWaldherr",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Konstanz_Aerial.jpg",
    notes: "Bearbeitet: zugeschnitten und für die Web-Anzeige skaliert.",
    ...CC_BY_SA_4,
  },
  {
    title: "Schloss Neuschwanstein – Luftbild",
    thumb: "/images/photos/neuschwanstein_md.jpg",
    author: "Carsten Steger",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Carsten_Steger",
    source: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aerial_image_of_Neuschwanstein_Castle_(view_from_the_northwest).jpg",
    notes: "Bearbeitet: skaliert für die Web-Anzeige.",
    ...CC_BY_SA_4,
  },
];

function Bildnachweise() {
  return (
    <LegalLayout title="Bildnachweise">
      <p>
        Die folgenden Aufnahmen stehen unter freien Lizenzen. Wir nennen
        Urheber und Lizenz wie vorgeschrieben. Alle übrigen Bilder auf dieser
        Website stammen vom Betreiber selbst.
      </p>

      <ul className="not-prose mt-8 space-y-6">
        {CREDITS.map((c) => (
          <li
            key={c.sourceUrl}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-start"
          >
            <img
              src={c.thumb}
              alt={c.title}
              loading="lazy"
              className="aspect-[3/2] w-full max-w-[12rem] flex-shrink-0 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 sm:w-44"
            />
            <div className="min-w-0 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="font-display text-base font-semibold text-slate-900 dark:text-white">
                {c.title}
              </p>
              <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
                <dt className="text-slate-500 dark:text-slate-400">Urheber</dt>
                <dd>
                  <a
                    href={c.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 underline decoration-1 underline-offset-2 transition hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                  >
                    {c.author}
                  </a>
                </dd>
                <dt className="text-slate-500 dark:text-slate-400">Quelle</dt>
                <dd>
                  <a
                    href={c.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 underline decoration-1 underline-offset-2 transition hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                  >
                    {c.source}
                  </a>
                </dd>
                <dt className="text-slate-500 dark:text-slate-400">Lizenz</dt>
                <dd>
                  <a
                    href={c.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 underline decoration-1 underline-offset-2 transition hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                  >
                    {c.license}
                  </a>
                </dd>
                {c.notes && (
                  <>
                    <dt className="text-slate-500 dark:text-slate-400">Hinweis</dt>
                    <dd className="text-slate-600 dark:text-slate-400">{c.notes}</dd>
                  </>
                )}
              </dl>
            </div>
          </li>
        ))}
      </ul>

      <h2>Eigene Aufnahmen</h2>
      <p>
        Alle weiteren Aufnahmen – darunter Lindau, Mainau, Friedrichshafen,
        Pfänder, Alpen sowie die Porträts und Cessna-Aufnahmen – wurden vom
        Betreiber selbst angefertigt. Eine Verwendung außerhalb dieser Website
        bedarf der ausdrücklichen Zustimmung.
      </p>
    </LegalLayout>
  );
}

export default Bildnachweise;
