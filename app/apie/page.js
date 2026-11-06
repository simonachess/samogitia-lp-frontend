import Image from "next/image";
import { Check } from "lucide-react";
import { getSiteUrl } from "../../lib/env";
import ContactActions from "../../components/contact-actions";
import ServiceAreaSection from "../../components/service-area-section";

const services = [
  "Žemės gerbūvio darbai ir sklypo paruošimas",
  "Reljefo formavimas ir žemės lyginimas",
  "Komunikacijų tiesimas ir kasimas",
  "Aplinkos tvarkymas",
  "Technikos ir įrankių nuoma",
];

export const metadata = {
  title: "Apie mus",
  description:
    "Samogitia Group – žemės gerbūvio darbai, sklypų paruošimas, technikos ir įrankių nuoma Žemaitijoje ir visoje Lietuvoje.",
  alternates: {
    canonical: `${getSiteUrl()}/apie`,
  },
};

export default function AboutPage() {
  return (
    <div className="apie-page">
      <section className="apie-hero" aria-labelledby="apie-heading">
        <Image
          src="/hero-v7.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="apie-hero-image"
        />
        <div className="apie-hero-overlay" />
        <div className="apie-hero-content">
          <h1 id="apie-heading">Apie mus</h1>
          <p>
            Teikiame profesionalius žemės gerbūvio darbus, sklypų paruošimą,
            technikos ir įrankių nuomą visoje Žemaitijoje ir Lietuvoje.
          </p>
          <ContactActions
            className="apie-hero-actions"
            secondaryVariant="light"
          />
        </div>
      </section>

      <div className="apie-main">
        <section className="apie-intro" aria-labelledby="apie-company-heading">
          <div className="apie-intro-image">
            <Image
              src="/hero-v7.jpg"
              alt="Samogitia Group technika ir žemės darbai"
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="apie-intro-copy">
            <h2 id="apie-company-heading">Kas mes esame?</h2>
            <p>
              Samogitia Group – įmonė, specializuojanti žemės gerbūvio darbuose.
              Atliekame sklypų paruošimą, reljefo formavimą, komunikacijų
              tiesimą ir aplinkos tvarkymą. Taip pat siūlome technikos ir
              įrankių nuomą privatiems ir verslo klientams.
            </p>
          </div>
        </section>

        <section
          className="apie-services"
          aria-labelledby="apie-services-heading"
        >
          <h2 id="apie-services-heading">Mūsų paslaugos</h2>
          <ul>
            {services.map((service) => (
              <li key={service}>
                <span className="apie-service-icon">
                  <Check
                    className="ui-icon"
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </section>

        <ServiceAreaSection
          title="Aptarnaujame"
          areas={[
            "Telšiuose",
            "Plungėje",
            "Mažeikiuose",
            "Šiauliuose",
            "Klaipėdos regione",
            "Visoje Žemaitijoje",
          ]}
          message="Susisiekite su mumis – paruošime individualų pasiūlymą jūsų projektui."
        />
      </div>
    </div>
  );
}
