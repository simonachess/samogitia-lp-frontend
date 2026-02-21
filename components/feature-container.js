// app/components/feature-container.js
import InfoCard from "./info-card";

export default function FeatureContainer() {
  return (
    <section className="w-full bg-primary-50 py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="w-[1200px] items-center px-4 max-w-full flex flex-col gap-20">
        {/* Heading + subheading – same as before */}
        <div className="flex w-full flex-col gap-6 items-center">
          <h2 className="page-heading">Paslaugos</h2>
          <div className="page-subheading">
            Teikiame žemės gerbūvio darbus bei technikos ir įrankių nuomą.
            Atliekame žemės darbus tiek privatiems, tiek verslo klientams visoje
            Žemaitijoje.
          </div>
        </div>

        {/* Two cards instead of many services */}
        <div className="w-full max-w-[940px] flex md:flex-col gap-10 md:gap-4">
          <InfoCard
            // icon={...} // optional: you can pass a static icon URL here if you want
            icon={null}
            title="Žemės gerbūvio paslaugos"
            description="Aplinka, sklypo paruošimas, žemės lyginimas ir kiti žemės tvarkymo darbai."
            href="/paslaugos"
          />

          <InfoCard
            icon={null}
            title="Technikos ir įrankių nuoma"
            description="Technika ir įrankiai skirti sklypo, kiemo ir aplinkos tvarkymo darbams."
            href="/nuoma"
          />
        </div>
      </div>
    </section>
  );
}
