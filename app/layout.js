import "../styles/global.css";
import SiteLayout from "../components/layout/layout";
import CookieConsent from "../components/cookie-consent";
import AnalyticsGate from "../components/analytics-gate";
import { validateEnv, getSiteUrl } from "../lib/env";
import { Inter, Public_Sans } from "next/font/google";

validateEnv();

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();
// Always use production domain for og:image so Facebook gets a stable image URL
// (avoids Vercel preview / 404 and fallback to hero _next/image)
const ogImageOrigin = "https://samogitia-lp-frontend.vercel.app/";

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
        url: `${ogImageOrigin}/samogitia_group_og.jpg`,
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
