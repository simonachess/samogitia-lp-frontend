import { getSiteUrl } from "../lib/env";

const siteUrl = getSiteUrl();

export default function robots() {
  return {
    rules: [
      // Explicitly allow Facebook's link scraper (required for OG previews / Sharing Debugger)
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
