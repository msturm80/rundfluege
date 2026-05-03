/**
 * Quiet hours: 21:00 – 08:00 Europe/Berlin.
 * Used to nudge visitors that an answer outside these hours
 * may take longer; the website never blocks WhatsApp itself
 * (we don't control the user's device).
 */

const QUIET_START_HOUR = 21;
const QUIET_END_HOUR = 8;

export const isQuietHoursBerlin = (now = new Date()): boolean => {
  // Get the current hour in Europe/Berlin regardless of visitor's TZ
  const berlinHourStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    hour12: false,
  }).format(now);
  const hour = Number.parseInt(berlinHourStr, 10);
  if (Number.isNaN(hour)) return false;
  return hour >= QUIET_START_HOUR || hour < QUIET_END_HOUR;
};

export const QUIET_HOURS_RANGE = {
  start: QUIET_START_HOUR,
  end: QUIET_END_HOUR,
};
