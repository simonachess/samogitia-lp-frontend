/**
 * Cookie consent: storage key and values.
 * Use getCookieConsent() in client code to check before setting non-essential cookies or loading analytics.
 */

export const COOKIE_CONSENT_KEY = "cookie-consent";
export const COOKIE_CONSENT_ACCEPTED = "accepted";
export const COOKIE_CONSENT_REJECTED = "rejected";

/**
 * Returns current consent: "accepted" | "rejected" | null (not yet chosen).
 * Call only in browser (useEffect or event handler).
 */
export function getCookieConsent() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(COOKIE_CONSENT_KEY);
}

/**
 * True only when user has explicitly accepted. Use this before loading analytics or non-essential cookies.
 */
export function hasAcceptedCookies() {
  return getCookieConsent() === COOKIE_CONSENT_ACCEPTED;
}
