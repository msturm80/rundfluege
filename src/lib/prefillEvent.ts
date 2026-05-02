export const PREFILL_ROUTE_EVENT = "rundfluege:prefill-route";

export type PrefillRouteDetail = {
  route: string;
  message: string;
};

export const dispatchPrefillRoute = (detail: PrefillRouteDetail): void => {
  window.dispatchEvent(
    new CustomEvent<PrefillRouteDetail>(PREFILL_ROUTE_EVENT, { detail }),
  );
};

declare global {
  interface WindowEventMap {
    [PREFILL_ROUTE_EVENT]: CustomEvent<PrefillRouteDetail>;
  }
}
