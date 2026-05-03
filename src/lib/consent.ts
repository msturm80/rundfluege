export const MAPS_CONSENT_KEY = "mapsConsent";
export const ANALYTICS_CONSENT_KEY = "analyticsConsent";

export const MAPS_CONSENT_EVENT = "rundfluege:maps-consent";
export const ANALYTICS_CONSENT_EVENT = "rundfluege:analytics-consent";

const readBool = (key: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
};

const writeBool = (key: string, value: boolean): void => {
  try {
    if (value) window.localStorage.setItem(key, "true");
    else window.localStorage.removeItem(key);
  } catch {
    /* localStorage disabled */
  }
};

const dispatch = (eventName: string, value: boolean): void => {
  window.dispatchEvent(new CustomEvent<boolean>(eventName, { detail: value }));
};

export const hasMapsConsent = () => readBool(MAPS_CONSENT_KEY);
export const grantMapsConsent = () => {
  writeBool(MAPS_CONSENT_KEY, true);
  dispatch(MAPS_CONSENT_EVENT, true);
};
export const revokeMapsConsent = () => {
  writeBool(MAPS_CONSENT_KEY, false);
  dispatch(MAPS_CONSENT_EVENT, false);
};

export const hasAnalyticsConsent = () => readBool(ANALYTICS_CONSENT_KEY);
export const grantAnalyticsConsent = () => {
  writeBool(ANALYTICS_CONSENT_KEY, true);
  dispatch(ANALYTICS_CONSENT_EVENT, true);
};
export const revokeAnalyticsConsent = () => {
  writeBool(ANALYTICS_CONSENT_KEY, false);
  dispatch(ANALYTICS_CONSENT_EVENT, false);
};

declare global {
  interface WindowEventMap {
    [MAPS_CONSENT_EVENT]: CustomEvent<boolean>;
    [ANALYTICS_CONSENT_EVENT]: CustomEvent<boolean>;
  }
}
