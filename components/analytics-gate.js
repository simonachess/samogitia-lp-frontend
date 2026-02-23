"use client";

import { useEffect } from "react";
import { hasAcceptedCookies } from "../lib/cookie-consent";

/**
 * Loads analytics only when user has accepted cookies.
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env (e.g. G-XXXXXXXXXX) to enable Google Analytics.
 * If not set, this component does nothing.
 */
export default function AnalyticsGate() {
  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!gaId) return;

    const loadAnalytics = () => {
      if (!hasAcceptedCookies()) return;
      // Load gtag script and init (example; adjust to your GA setup)
      if (typeof window.gtag === "function") return; // already loaded
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { anonymize_ip: true });
    };

    loadAnalytics();
    window.addEventListener("cookie-consent-accepted", loadAnalytics);
    return () =>
      window.removeEventListener("cookie-consent-accepted", loadAnalytics);
  }, []);

  return null;
}
