import { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Pilot from "./components/sections/Pilot";
import Booking from "./components/sections/Booking";
import RoutesSection from "./components/sections/RoutesSection";
import Gallery from "./components/sections/Gallery";
import Contact from "./components/sections/Contact";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useI18n } from "./i18n/I18nContext";

function App() {
  useScrollReveal();
  const { language } = useI18n();

  useEffect(() => {
    const meta: Record<"de" | "en", { title: string; description: string; locale: string }> = {
      de: {
        title: "Rundflüge Bodensee — Erleben Sie den Bodensee von oben | Pilot Hans Weiss",
        description:
          "Rundflüge ab Friedrichshafen über den Bodensee, Lindau, Konstanz, Mainau und die Alpen. Ab 300 € für 2 Personen. Persönlich, individuell und unvergesslich – mit Pilot Hans Weiss und Cessna D-EIZY.",
        locale: "de_DE",
      },
      en: {
        title: "Lake Constance Sightseeing Flights — Discover Lake Constance from above | Pilot Hans Weiss",
        description:
          "Sightseeing flights from Friedrichshafen over Lake Constance, Lindau, Konstanz, Mainau Island and the Alps. From €300 for 2 people. Personal, tailored and unforgettable — with pilot Hans Weiss and Cessna D-EIZY.",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <RoutesSection />
        <Pilot />
        <Booking />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
