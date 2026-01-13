import Head from "next/head";
import Header from "../components/header";
import Hero from "../components/hero";
import ServicesContainer from "../components/services-container";
import FeatureContainer from "../components/feature-container";
import Contact from "../components/contact";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Real Estate</title>
        <meta name="description" content="Discover your perfect home" />
      </Head>
      <div className="relative bg-gray-white w-full flex flex-col items-center justify-start">
        <Header hamburger={false} />
        <Hero />
        <FeatureContainer />
        <ServicesContainer />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
