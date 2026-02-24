/**
 * Validates required env vars at build/runtime.
 * Logs warnings in development; in production, missing vars may cause runtime errors.
 */
const required = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
};

const optional = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
};

export function validateEnv() {
  const missing = Object.entries(required).filter(([, v]) => !v);
  if (missing.length > 0 && process.env.NODE_ENV === "development") {
    console.warn(
      "[env] Missing recommended env vars:",
      missing.map(([k]) => k).join(", "),
    );
  }
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://samogitia.lt";
}
