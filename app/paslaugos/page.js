import InfoCard from "../../components/info-card";
import { client, urlFor } from "../../lib/sanity";
import groq from "groq";

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await client.fetch(
    groq`*[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      icon,
      description
    }`,
  );

  return (
    <section className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="w-[1200px] items-center px-4 max-w-full flex flex-col md:gap-10 gap-20">
        <div className="flex w-full flex-col gap-6 items-center">
          <h1 className="page-heading">Žemės gerbūvio paslaugos</h1>
          <div className="page-subheading">
            Paslaugos, kurias atliekame jūsų sklype, kieme ir aplinkoje – nuo
            žemės darbų iki aplinkos sutvarkymo.
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] w-full flex md:flex-col gap-10 md:gap-4">
          {services.length === 0 ? (
            <p className="text-lightslategray">Informacija ruošiama...</p>
          ) : (
            services.map((service) => (
              <InfoCard
                key={service._id}
                icon={
                  service.icon
                    ? urlFor(service.icon).width(64).height(64).url()
                    : null
                }
                title={service.title}
                href={`/paslaugos/${service.slug}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
