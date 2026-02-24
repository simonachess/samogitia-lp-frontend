import "../styles/global.css";
import SiteLayout from "../components/layout/layout";
import CookieConsent from "../components/cookie-consent";
import AnalyticsGate from "../components/analytics-gate";
import { HERO_IMAGE_SRC } from "../components/hero";
import { validateEnv, getSiteUrl } from "../lib/env";
import { Inter, Public_Sans } from "next/font/google";

validateEnv();

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "optional",
  preload: true,
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-public-sans",
  display: "optional",
  preload: true,
});

const siteUrl = getSiteUrl();
// Use same origin as site for og:image so crawlers (Facebook, etc.) fetch from the working domain.
// Set NEXT_PUBLIC_SITE_URL to your canonical URL in Vercel (e.g. https://www.samogitiagroup.lt).

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Žemės gerbūvio darbai | Samogitia Group",
    template: "%s | Samogitia Group",
  },
  description:
    "Profesionalūs žemės gerbūvio darbai, sklypų paruošimas, komunikacijų kasimas ir aplinkos tvarkymas Žemaitijoje.",
  keywords: [
    "žemės darbai",
    "žemės gerbūvis",
    "sklypo paruošimas",
    "komunikacijų kasimas",
    "aplinkos tvarkymas",
    "gerbūvio darbai",
    "mini ekskavatorius nuoma",
    "technikos nuoma",
    "įrankių nuoma",
  ],
  openGraph: {
    type: "website",
    locale: "lt_LT",
    title: "Žemės gerbūvio darbai | Samogitia Group",
    description:
      "Žemės gerbūvio darbai, sklypų paruošimas, komunikacijų kasimas ir aplinkos tvarkymas Žemaitijoje.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/samogitia_group_og.jpg`,
        width: 1200,
        height: 630,
        alt: "Samogitia Group – žemės gerbūvio darbai",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Samogitia Group",
    description:
      "Žemės gerbūvio darbai, sklypų paruošimas, komunikacijų kasimas ir aplinkos tvarkymas Lietuvoje, ypač Žemaitijos regione.",
    areaServed: [
      "Telšiai",
      "Plungė",
      "Mažeikiai",
      "Šiauliai",
      "Klaipėda",
      "Žemaitija",
      "Lietuva",
    ],
    url: siteUrl,
    telephone: "+37064768414",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Telšiai",
      addressCountry: "LT",
    },
  };

  return (
    <html lang="lt" className={`${inter.variable} ${publicSans.variable}`}>
      <head>
        {/* Preload LCP hero on desktop (unoptimized = same URL); mobile uses Next optimized URL */}
        <link
          rel="preload"
          as="image"
          href={HERO_IMAGE_SRC}
          fetchPriority="high"
          media="(min-width: 769px)"
        />
      </head>
      <body>
        {/* 🔹 LocalBusiness structured data Google'ui */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
        <SiteLayout>{children}</SiteLayout>
        <CookieConsent />
        <AnalyticsGate />
      </body>
    </html>
  );
}
