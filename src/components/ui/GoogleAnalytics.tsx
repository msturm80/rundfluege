import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  hasAnalyticsConsent,
} from "../../lib/consent";

const MEASUREMENT_ID = "G-KKJGPNL47Z";
const SCRIPT_ID = "ga-gtag";
const INIT_ID = "ga-init";
const DISABLE_FLAG = `ga-disable-${MEASUREMENT_ID}`;

const setDisabled = (disabled: boolean) => {
  (window as unknown as Record<string, unknown>)[DISABLE_FLAG] = disabled;
};

const injectScripts = () => {
  if (document.getElementById(SCRIPT_ID)) return;
  const tag = document.createElement("script");
  tag.id = SCRIPT_ID;
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(tag);

  const init = document.createElement("script");
  init.id = INIT_ID;
  init.text = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('js', new Date());",
    `gtag('config', '${MEASUREMENT_ID}', { anonymize_ip: true });`,
  ].join("\n");
  document.head.appendChild(init);
};

function GoogleAnalytics() {
  const [granted, setGranted] = useState<boolean>(false);

  useEffect(() => {
    setGranted(hasAnalyticsConsent());
    const onChange = (e: CustomEvent<boolean>) => setGranted(e.detail);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (granted) {
      setDisabled(false);
      injectScripts();
    } else {
      // Even if a script was already injected during this session, this flag
      // blocks all gtag.js calls. The data layer remains in memory until reload.
      setDisabled(true);
    }
  }, [granted]);

  return null;
}

export default GoogleAnalytics;
