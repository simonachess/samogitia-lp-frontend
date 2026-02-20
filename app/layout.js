import "../styles/global.css";
import SiteLayout from "../components/layout/layout";

export const metadata = {
  // set this to your real domain when you have it
  // metadataBase: new URL("https://samogitiagroup.lt"),
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
  ],
  openGraph: {
    type: "website",
    locale: "lt_LT",
    title: "Žemės gerbūvio darbai | Samogitia",
    description:
      "Žemės gerbūvio darbai, sklypų paruošimas, komunikacijų kasimas ir aplinkos tvarkymas Lietuvoje.",
    // url: "https://samogitiagroup.lt", // uncomment & set when you have a domain
  },
  alternates: {
    // canonical: "https://samogitiagroup.lt", // set later
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="lt">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
