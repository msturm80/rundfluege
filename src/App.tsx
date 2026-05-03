import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Cookies from "./pages/Cookies";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useI18n } from "./i18n/I18nContext";

function App() {
  useScrollReveal();
  const { language } = useI18n();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta: Record<"de" | "en", { title: string; description: string; locale: string }> = {
      de: {
        title:
          "Rundflüge Bodensee — Erleben Sie den Bodensee von oben | Pilot Hans Weiss",
        description:
          "Rundflüge ab Friedrichshafen über den Bodensee, Lindau, Konstanz, Mainau und die Alpen. Persönlich, individuell und unvergesslich – mit Pilot Hans Weiss und Cessna D-EIZY.",
        locale: "de_DE",
      },
      en: {
        title:
          "Lake Constance Sightseeing Flights — Discover Lake Constance from above | Pilot Hans Weiss",
        description:
          "Sightseeing flights from Friedrichshafen over Lake Constance, Lindau, Konstanz, Mainau Island and the Alps. Personal, tailored and unforgettable — with pilot Hans Weiss and Cessna D-EIZY.",
        locale: "en_US",
      },
    };
    const m = meta[language];
    document.title = m.title;
    const setMeta = (selector: string, value: string) => {
      const el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) el.content = value;
    };
    setMeta('meta[name="description"]', m.description);
    setMeta('meta[property="og:title"]', m.title);
    setMeta('meta[property="og:description"]', m.description);
    setMeta('meta[property="og:locale"]', m.locale);
    setMeta('meta[name="twitter:title"]', m.title);
    setMeta('meta[name="twitter:description"]', m.description);
  }, [language]);

  // Smooth scroll to hash anchors after navigating between pages.
  useEffect(() => {
    if (pathname !== "/" || !hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      window.requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
