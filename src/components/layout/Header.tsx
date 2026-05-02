import { useEffect, useState } from "react";
import { Menu, Plane, X } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import LanguageToggle from "../ui/LanguageToggle";
import ThemeToggle from "../ui/ThemeToggle";

type NavItem = { href: string; key: string };

const NAV_ITEMS: NavItem[] = [
  { href: "#experience", key: "nav.experience" },
  { href: "#pilot", key: "nav.pilot" },
  { href: "#booking", key: "nav.booking" },
  { href: "#routes", key: "nav.routes" },
  { href: "#gallery", key: "nav.gallery" },
  { href: "#contact", key: "nav.contact" },
];

function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const headerShellClass =
    "sticky top-0 z-40 transition-all duration-300 " +
    (scrolled
      ? "glass border-b border-slate-200/60 dark:border-slate-700/50 shadow-sm"
      : "bg-transparent border-b border-transparent");

  return (
    <header className={headerShellClass}>
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <a
          href="#top"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Rundflüge Bodensee"
        >
          <Plane className="h-7 w-7 -rotate-12 text-brand-600 transition-transform duration-300 group-hover:-rotate-[18deg] group-hover:scale-110 dark:text-brand-300" />
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white md:text-xl">
            Rundflüge Bodensee
          </span>
        </a>

        <nav className="hidden md:flex" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <ThemeToggle />
          <a
            href="#contact"
            className="btn-primary hidden px-4 py-2 text-xs lg:inline-flex"
          >
            {t("nav.bookNow")}
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={
          "overflow-hidden border-t border-slate-200/60 transition-[max-height,opacity] duration-300 ease-out dark:border-slate-700/50 md:hidden " +
          (mobileOpen ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 opacity-0")
        }
      >
        <div className="glass">
          <div className="container-x flex flex-col gap-1 py-4">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMobile}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={closeMobile}
              className="btn-primary mt-2 w-full"
            >
              {t("nav.bookNow")}
            </a>
            <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-slate-700/50">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
