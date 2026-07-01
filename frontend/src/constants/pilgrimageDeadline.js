// Registration closes 4 July 2026 at 23:59 Kigali time (UTC+2)
export const PILGRIMAGE_REGISTRATION_DEADLINE_UTC = new Date('2026-07-04T21:59:59Z');
export const PILGRIMAGE_REGISTRATION_DEADLINE_LABEL = '4 July 2026';
export const PILGRIMAGE_REGISTRATION_DEADLINE_FULL =
  '4 July 2026 at 23:59 (Kigali time)';

export function isPilgrimageRegistrationClosed(now = new Date()) {
  return now >= PILGRIMAGE_REGISTRATION_DEADLINE_UTC;
}

export function getTimeUntilPilgrimageDeadline(now = new Date()) {
  return PILGRIMAGE_REGISTRATION_DEADLINE_UTC - now;
}

export function getPilgrimageCountdown(now = new Date()) {
  const difference = getTimeUntilPilgrimageDeadline(now);

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, closed: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    closed: false,
  };
}
