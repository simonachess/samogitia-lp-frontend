import InfoCard from "./info-card";
import { client, urlFor } from "../lib/sanity";
import groq from "groq";

export default async function FeatureContainer() {
  const services = await client.fetch(
    groq`*[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      icon,
      description
    }`
  );

  return (
    <section className=" w-full bg-primary-50 py-[80px]  flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col gap-[54px] px-[30px]">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="page-heading">Paslaugos</h2>
          <div className="page-subheading">
            Teikiame žemės gerbūvio darbus bei technikos ir įrankių nuomą.
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-6 ">
          {services.length === 0 ? (
            <p className="text-lightslategray">
              Šiuo metu paslaugos dar nesukonfigūruotos.
            </p>
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
                description={service.description}
                href={`/services/${service.slug}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
