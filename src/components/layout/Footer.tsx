import { Plane, Mail, Phone, MapPin, Heart } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { CONTACT } from "../../config/contact";

function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "#experience", key: "nav.experience" },
    { href: "#pilot", key: "nav.pilot" },
    { href: "#booking", key: "nav.booking" },
    { href: "#contact", key: "nav.contact" },
  ] as const;

  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 font-display text-lg font-semibold text-slate-900 dark:text-white"
            >
              <Plane className="h-6 w-6 -rotate-12 text-brand-600 dark:text-brand-300" />
              Rundflüge Bodensee
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-white">
              {t("nav.contact")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-300" />
                <a
                  href={`mailto:${CONTACT.pilotEmail}`}
                  className="break-all transition hover:text-brand-600 dark:hover:text-brand-300"
                >
                  {CONTACT.pilotEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-300" />
                <a
                  href={`tel:${CONTACT.pilotPhoneTel}`}
                  className="transition hover:text-brand-600 dark:hover:text-brand-300"
                >
                  {CONTACT.pilotPhone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-300" />
                <address className="not-italic leading-relaxed">
                  <span className="block">{CONTACT.address.line1}</span>
                  <span className="block">{CONTACT.address.line2}</span>
                  <span className="block">{CONTACT.address.line3}</span>
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-white">
              {t("nav.experience")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 transition hover:text-brand-600 dark:hover:text-brand-300"
                  >
                    <span className="h-px w-4 bg-slate-300 transition-all dark:bg-slate-700" />
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-[11px] leading-relaxed text-slate-500 dark:text-slate-500">
          Bildnachweis Konstanz: ©{" "}
          <a
            href="https://commons.wikimedia.org/wiki/User:SimonWaldherr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-brand-600 dark:hover:text-brand-300"
          >
            SimonWaldherr
          </a>{" "}
          /{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-brand-600 dark:hover:text-brand-300"
          >
            CC BY-SA 4.0
          </a>
          {" "}via Wikimedia Commons.
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200/80 pt-8 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {CONTACT.pilotName} &middot; {t("footer.rights")}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a
                href="#imprint"
                className="transition hover:text-brand-600 dark:hover:text-brand-300"
              >
                {t("footer.imprint")}
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="transition hover:text-brand-600 dark:hover:text-brand-300"
              >
                {t("footer.privacy")}
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-brand-600 dark:text-brand-300" />
              {t("footer.builtWith")}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
