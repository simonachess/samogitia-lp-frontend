import Image from "next/image";
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
      icon
    }`,
  );

  return (
    <section className="w-full bg-primary-50 py-[40px] md:py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] w-full mx-auto px-4 flex flex-col items-center gap-10 md:gap-20">
        <div className="flex w-full flex-col gap-6 items-center">
          <h1 className="page-heading">Žemės gerbūvio paslaugos</h1>
          <div className="page-subheading">
            Paslaugos, kurias atliekame jūsų sklype, kieme ir aplinkoje – nuo
            žemės darbų iki aplinkos sutvarkymo.
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] w-full max-w-[960px] gap-4">
          {services.length === 0 ? (
            <p className="text-lightslategray">Informacija ruošiama...</p>
          ) : (
            services.map((service) => (
              <InfoCard
                key={service._id}
                icon={
                  service.icon ? (
                    <Image
                      src={urlFor(service.icon).width(64).height(64).url()}
                      alt=""
                      width={64}
                      height={64}
                      sizes="64px"
                      className="w-16 h-16 object-contain"
                    />
                  ) : null
                }
                title={service.title}
                href={service.slug ? `/paslaugos/${service.slug}` : undefined}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
