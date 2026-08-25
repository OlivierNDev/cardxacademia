// Israel Holy Land tour: 6–14 October 2026
// Registration remains closed (applications not accepted).
export const PILGRIMAGE_TOUR_DATES_SHORT = 'October 6 – October 14, 2026';
export const PILGRIMAGE_TOUR_DATES_LONG = 'October 6, 2026 – October 14, 2026';
export const PILGRIMAGE_DEPARTURE_LABEL = 'October 6, 2026';
export const PILGRIMAGE_RETURN_LABEL = 'October 14, 2026';

// Kept for messaging; registration is forced closed regardless of date.
export const PILGRIMAGE_REGISTRATION_DEADLINE_UTC = new Date('2026-07-04T21:59:59Z');
export const PILGRIMAGE_REGISTRATION_DEADLINE_LABEL = 'Registration closed';
export const PILGRIMAGE_REGISTRATION_DEADLINE_FULL = 'Registration is closed';

export function isPilgrimageRegistrationClosed() {
  return true;
}

export function getTimeUntilPilgrimageDeadline() {
  return 0;
}

export function getPilgrimageCountdown() {
  return { days: 0, hours: 0, minutes: 0, seconds: 0, closed: true };
}
