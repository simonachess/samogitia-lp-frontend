"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_REJECTED,
} from "../lib/cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (
      consent !== COOKIE_CONSENT_ACCEPTED &&
      consent !== COOKIE_CONSENT_REJECTED
    ) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_ACCEPTED);
    setVisible(false);
    // Allow analytics/cookies to be loaded (e.g. listen for this event or check localStorage)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookie-consent-accepted"));
    }
  };

  const reject = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_REJECTED);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Slapukų pranešimas"
      className="fixed bottom-0 left-0 right-0 z-[200] bg-primary-800 text-gray-white px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
    >
      <div className="page-container flex flex-wrap flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm leading-relaxed">
          Naudodamiesi šia svetaine galite sutikti arba atsisakyti mūsų{" "}
          <Link href="/privatumas" className="link-default text-gray-white">
            privatumo politikoje
          </Link>{" "}
          aprašytų slapukų. Būtini slapukai veikia be jūsų sutikimo; analitikos
          ir panašius įjungiame tik su jūsų sutikimu.
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button type="button" onClick={reject} className="btn-secondary-dark">
            Atšaukti
          </button>
          <button type="button" onClick={accept} className="btn-primary">
            Sutinku
          </button>
        </div>
      </div>
    </div>
  );
}
