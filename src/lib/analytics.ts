/**
 * Tiny analytics wrapper around gtag.js.
 *
 * GoogleAnalytics.tsx injects gtag only after the visitor has granted
 * consent. trackEvent therefore checks for window.gtag at call time —
 * if it's not there yet (no consent or script still loading) the call
 * is a silent no-op.
 */

type EventValue = string | number | boolean | undefined;
export type EventParams = Record<string, EventValue>;

type GtagFn = (...args: unknown[]) => void;

const getGtag = (): GtagFn | undefined => {
  if (typeof window === "undefined") return undefined;
  const fn = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof fn === "function" ? fn : undefined;
};

export const trackEvent = (event: string, params: EventParams = {}): void => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", event, params);
};

// Pre-defined event names — keep in one place so dashboards stay consistent.
export const Events = {
  formSubmitSuccess: "form_submit_success",
  formSubmitError: "form_submit_error",
  formSubmitRateLimited: "form_submit_rate_limited",
  routeSelect: "route_select",
  galleryOpen: "gallery_open",
  whatsappClick: "whatsapp_click",
  emailCtaClick: "email_cta_click",
  consentGrant: "consent_grant",
  mapsConsent: "maps_consent_grant",
  bookingCtaPrimary: "booking_cta_primary",
  bookingCtaWhatsapp: "booking_cta_whatsapp",
} as const;
