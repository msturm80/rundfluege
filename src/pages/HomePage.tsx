import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import RoutesSection from "../components/sections/RoutesSection";
import Pilot from "../components/sections/Pilot";
import Booking from "../components/sections/Booking";
import Gallery from "../components/sections/Gallery";
import Contact from "../components/sections/Contact";
import WhatsAppButton from "../components/ui/WhatsAppButton";

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
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

export default HomePage;
