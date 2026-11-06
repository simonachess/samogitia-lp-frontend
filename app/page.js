import Image from "next/image";
import Link from "next/link";
import Hero, { HERO_IMAGE_SRC } from "../components/hero";
import FeatureContainer from "../components/feature-container";
import ContactForm from "../components/contact-form";
import { client, urlFor } from "../lib/sanity";
import { getSiteUrl } from "../lib/env";
import groq from "groq";

export const revalidate = 60;

export const metadata = {
  alternates: {
    canonical: getSiteUrl(),
  },
};

export default async function HomePage() {
  const projects = await client.fetch(
    groq`*[_type == "project"] | order(order asc)[0...4] {
      _id,
      title,
      "slug": slug.current,
      mainImage
    }`,
  );

  const projectItems = projects.map((project) => ({
    id: project._id,
    title: project.title || "Atliktas projektas",
    href: project.slug ? `/projektai/${project.slug}` : "/projektai",
    imageUrl: project.mainImage
      ? urlFor(project.mainImage).width(720).height(480).url()
      : HERO_IMAGE_SRC,
  }));

  return (
    <div className="home-page">
      <Hero />
      <FeatureContainer />
      <section
        className="home-section home-projects"
        aria-labelledby="home-projects-heading"
      >
        <div className="home-container">
          <div className="home-section-heading">
            <h2 id="home-projects-heading" className="home-heading">
              Paskutiniai atlikti darbai
            </h2>
          </div>

          {projectItems.length > 0 ? (
            <div className="home-project-grid">
              {projectItems.map((project) => (
                <Link
                  key={project.id}
                  href={project.href}
                  className="home-project-card"
                  aria-label={`Peržiūrėti projektą: ${project.title}`}
                >
                  <span className="home-project-image">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 700px) 50vw, 280px"
                      className="object-cover"
                    />
                  </span>
                  <span className="home-project-title">{project.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="home-empty-projects">
              Naujausius mūsų darbus netrukus rasite čia.
            </p>
          )}

          <Link
            href="/projektai"
            className="button button-outline home-outline-link"
          >
            Visi atlikti darbai
          </Link>
        </div>
      </section>

      <section
        className="home-section home-contact"
        aria-labelledby="home-contact-heading"
      >
        <div className="home-container home-contact-layout">
          <div className="home-contact-copy">
            <h2 id="home-contact-heading" className="home-heading">
              Susisiekite
            </h2>
            <p>
              Turite klausimų ar norite pasitarti dėl darbų? Parašykite mums –
              susisieksime ir aptarsime jūsų poreikius.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
