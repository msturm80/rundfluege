import { useEffect, useState } from "react";
import { MessageCircle, Moon } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";
import { buildWhatsappUrl } from "../../config/contact";
import { isQuietHoursBerlin } from "../../lib/quietHours";

function WhatsAppButton() {
  const { language, t } = useI18n();
  const [quiet, setQuiet] = useState<boolean>(false);

  useEffect(() => {
    const update = () => setQuiet(isQuietHoursBerlin());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const baseMessage =
    language === "de"
      ? "Hallo Hans, ich interessiere mich für einen Rundflug über den Bodensee."
      : "Hi Hans, I'm interested in a sightseeing flight over Lake Constance.";

  const quietPrefix =
    language === "de"
      ? "(Hinweis: außerhalb der Sprechzeiten — Antwort am nächsten Werktag.)\n\n"
      : "(Note: outside business hours — reply next working day.)\n\n";

  const message = quiet ? quietPrefix + baseMessage : baseMessage;

  const label = t("common.whatsapp");
  const tooltip = quiet
    ? language === "de"
      ? "WhatsApp · außerhalb der Sprechzeiten"
      : "WhatsApp · outside business hours"
    : label;

  return (
    <div className="group fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-within:-translate-x-1 group-focus-within:opacity-100 dark:bg-slate-100/95 dark:text-slate-900 dark:ring-slate-900/10"
      >
        {tooltip}
      </span>
      <a
        href={buildWhatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tooltip}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/25 ring-1 ring-white/30 transition-transform duration-200 hover:scale-105 hover:bg-[#1fbb5b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:h-16 sm:w-16"
      >
        {!quiet && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"
          />
        )}
        <MessageCircle className="relative h-7 w-7" strokeWidth={2.25} />
      </a>
      {quiet && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -left-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-amber-300 ring-2 ring-white shadow-lg dark:ring-slate-950"
          title={tooltip}
        >
          <Moon className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );
}

export default WhatsAppButton;
