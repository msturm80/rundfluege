export const MAPS_CONSENT_KEY = "mapsConsent";
export const MAPS_CONSENT_EVENT = "rundfluege:maps-consent";

export const hasMapsConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(MAPS_CONSENT_KEY) === "true";
  } catch {
    return false;
  }
};

export const grantMapsConsent = (): void => {
  try {
    window.localStorage.setItem(MAPS_CONSENT_KEY, "true");
  } catch {
    /* localStorage disabled */
  }
  window.dispatchEvent(new CustomEvent<boolean>(MAPS_CONSENT_EVENT, { detail: true }));
};

export const revokeMapsConsent = (): void => {
  try {
    window.localStorage.removeItem(MAPS_CONSENT_KEY);
  } catch {
    /* localStorage disabled */
  }
  window.dispatchEvent(new CustomEvent<boolean>(MAPS_CONSENT_EVENT, { detail: false }));
};

declare global {
  interface WindowEventMap {
    [MAPS_CONSENT_EVENT]: CustomEvent<boolean>;
  }
}
