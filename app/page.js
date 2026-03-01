import Hero from "../components/hero";
import FeatureContainer from "../components/feature-container";
import { getSiteUrl } from "../lib/env";

export const metadata = {
  alternates: {
    canonical: getSiteUrl(),
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureContainer />
    </>
  );
}
