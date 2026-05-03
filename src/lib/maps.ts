import { CONTACT } from "../config/contact";

export const MEETING_LAT = 47.667308;
export const MEETING_LNG = 9.511404;
export const MEETING_ZOOM = 17;

const COORDS = `${MEETING_LAT},${MEETING_LNG}`;

export const MEETING_ADDRESS = `${CONTACT.meetingAddress.line1}, ${CONTACT.meetingAddress.line2}, ${CONTACT.meetingAddress.line3}`;

/**
 * Public map URL — opens in user's preferred map app.
 * iOS Safari/macOS Safari offer "Open in Maps"; Android opens Google Maps app
 * if installed; desktop browsers open google.com/maps in a new tab.
 */
export const meetingMapsUrl = (): string =>
  `https://www.google.com/maps?q=${COORDS}&ll=${COORDS}&z=${MEETING_ZOOM}`;

/**
 * Apple Maps URL — opens directly in the Maps app on iOS/macOS,
 * fallback page on other platforms.
 */
export const meetingAppleMapsUrl = (): string =>
  `https://maps.apple.com/?ll=${COORDS}&q=Treffpunkt&z=${MEETING_ZOOM}`;

/** Embed URL for iframes (consent-gated). */
export const meetingMapsEmbedUrl = (): string =>
  `${meetingMapsUrl()}&output=embed`;

/** Directions URL — destination prefilled. */
export const meetingDirectionsUrl = (): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`;
