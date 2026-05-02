import { useI18n } from "../../i18n/I18nContext";

const OPTIONS = ["de", "en"] as const;
type Lang = (typeof OPTIONS)[number];

function LanguageToggle() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("common.languageSwitch")}
      className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 p-0.5 text-xs font-semibold tracking-wide dark:border-slate-700 dark:bg-slate-900/70"
    >
      {OPTIONS.map((lang: Lang) => {
        const active = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className={
              "rounded-full px-3 py-1.5 uppercase transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 " +
              (active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100")
            }
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageToggle;
