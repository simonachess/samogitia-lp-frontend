import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Construction, Images, Wrench } from "lucide-react";

const cards = [
  {
    href: "/paslaugos",
    title: "Žemės gerbūvio paslaugos",
    description:
      "Aplinka, sklypo paruošimas, žemės lyginimas ir kiti žemės tvarkymo darbai.",
    label: "Visos paslaugos",
    icon: Construction,
    featured: true,
  },
  {
    href: "/nuoma",
    title: "Technikos ir įrankių nuoma",
    description: "Technika ir įrankiai sklypo, kiemo ir aplinkos darbams.",
    label: "Nuomoti",
    icon: Wrench,
  },
  {
    href: "/projektai",
    title: "Atlikti darbai",
    description: "Mūsų įgyvendinti projektai ir atlikti darbai.",
    label: "Peržiūrėti",
    icon: Images,
  },
];

export default function FeatureContainer() {
  return (
    <section className="home-section" aria-labelledby="features-heading">
      <div className="home-container">
        <div className="home-section-heading">
          <h2 id="features-heading" className="home-heading">
            Paslaugos
          </h2>
          <p>
            Teikiame žemės gerbūvio darbus, sklypų paruošimą, komunikacijų
            tiesimo paslaugas, aplinkos tvarkymą bei technikos ir įrankių nuomą.
            Dirbame visoje Žemaitijoje.
          </p>
        </div>

        <div className="home-services-grid">
          {cards.map(
            ({ href, title, description, label, icon: Icon, featured }) => (
              <Link
                key={href}
                href={href}
                className={`home-service-card ${
                  featured ? "home-service-card-main" : ""
                }`}
              >
                <span className="home-service-icon">
                  <Icon
                    className="ui-icon"
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <span className="home-service-title">{title}</span>
                <span className="home-service-description">{description}</span>
                {href === "/paslaugos" && (
                  <span className="home-service-image">
                    <Image
                      src="/hero-v7.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 700px) 100vw, 540px"
                      className="object-cover"
                    />
                  </span>
                )}
                <span className="button button-outline home-service-link">
                  {label}
                  <ArrowUpRight
                    className="ui-icon"
                    size={16}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
