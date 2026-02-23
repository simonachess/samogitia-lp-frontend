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
    <section className="page-section">
      <div className="page-container page-section-inner animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
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
