import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EmptyState from "../../components/empty-state";
import { client } from "../../lib/sanity";
import { getSiteUrl } from "../../lib/env";
import groq from "groq";

export const revalidate = 60;

export const metadata = {
  alternates: {
    canonical: `${getSiteUrl()}/paslaugos`,
  },
};

export default async function ServicesPage() {
  const services = await client.fetch(
    groq`*[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      icon
    }`,
  );

  return (
    <section className="services-page" aria-labelledby="paslaugos-heading">
      <div className="services-page-container">
        <div className="services-page-heading">
          <h1 id="paslaugos-heading" className="services-page-title">
            Žemės gerbūvio paslaugos
          </h1>
          <p>
            Paslaugos, kurias atliekame jūsų sklype, kieme ir aplinkoje – nuo
            žemės darbų iki aplinkos sutvarkymo.
          </p>
        </div>

        <div className="services-page-grid">
          {services.length === 0 ? (
            <div className="col-span-full">
              <EmptyState message="Šiuo metu neturime paslaugų. Norite sužinoti daugiau? Susisiekite su mumis." />
            </div>
          ) : (
            services.map((service) => {
              const content = (
                <>
                  <span className="services-page-card-title">
                    {service.title}
                  </span>
                  <span className="services-page-card-arrow" aria-hidden="true">
                    <ArrowUpRight
                      className="ui-icon"
                      size={16}
                      strokeWidth={1.8}
                    />
                  </span>
                </>
              );

              return service.slug ? (
                <Link
                  key={service._id}
                  href={`/${service.slug}`}
                  className="services-page-card"
                >
                  {content}
                </Link>
              ) : (
                <article key={service._id} className="services-page-card">
                  {content}
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
