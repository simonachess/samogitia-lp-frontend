"use client";

import { useEffect } from "react";
import { hasAcceptedCookies } from "../lib/cookie-consent";

/**
 * Loads analytics only when user has accepted cookies (deferred; does not block first paint).
 * - Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env (e.g. G-XXXXXXXXXX) to enable Google Analytics.
 * - Set NEXT_PUBLIC_CLARITY_PROJECT_ID in .env (e.g. abc123xyz) to enable Microsoft Clarity.
 * If adding Segment/Sentry, use next/script with strategy="afterInteractive" or "lazyOnload".
 */
function loadGoogleAnalytics(gaId) {
  if (typeof window.gtag === "function") return;
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
}

/**
 * Microsoft Clarity: session recordings and heatmaps. Loads only after cookie consent.
 * @see https://clarity.microsoft.com/
 */
function loadClarity(projectId) {
  if (typeof window.clarity === "function") return;
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", projectId);
}

export default function AnalyticsGate() {
  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    const loadAnalytics = () => {
      if (!hasAcceptedCookies()) return;
      if (gaId) loadGoogleAnalytics(gaId);
      if (clarityId) loadClarity(clarityId);
    };

    loadAnalytics();
    window.addEventListener("cookie-consent-accepted", loadAnalytics);
    return () =>
      window.removeEventListener("cookie-consent-accepted", loadAnalytics);
  }, []);

  return null;
}
