import "../styles/global.css";
import SiteLayout from "../components/layout/layout";
import { Inter, Public_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-public-sans",
});

export const metadata = {
  metadataBase: new URL("https://samogitiagroup.lt"),
  title: {
    default: "Žemės gerbūvio darbai | Samogitia",
    template: "%s | Samogitia",
  },
  description:
    "Profesionalūs žemės gerbūvio darbai, sklypų paruošimas, komunikacijų kasimas ir aplinkos tvarkymas Lietuvoje.",
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
    title: "Žemės gerbūvio darbai | Samogitia",
    description:
      "Žemės gerbūvio darbai, sklypų paruošimas, komunikacijų kasimas ir aplinkos tvarkymas Lietuvoje.",
    url: "https://samogitiagroup.lt",
  },
  alternates: {
    canonical: "https://samogitiagroup.lt",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Samogitia",
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
    url: "https://samogitiagroup.lt",
    // kai turėsi, galėsim pridėti:
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
      </body>
    </html>
  );
}
