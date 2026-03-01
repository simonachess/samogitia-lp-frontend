import { getSiteUrl } from "../../lib/env";

export const metadata = {
  alternates: {
    canonical: `${getSiteUrl()}/kontaktai`,
  },
};

export default function KontaktaiLayout({ children }) {
  return children;
}
