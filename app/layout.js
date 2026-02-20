import "../styles/global.css";
import SiteLayout from "../components/layout/layout";

export const metadata = {
  title: "Žemės gerbūvio darbai",
  description:
    "Žemės gerbūvio darbai ir technikos bei įrankių nuoma Lietuvoje.",
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
