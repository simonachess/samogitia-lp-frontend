// app/services/[slug]/page.js
import { notFound } from "next/navigation";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";

export async function generateStaticParams() {
  const services = await client.fetch(
    groq`*[_type == "service"]{ "slug": slug.current }`,
  );

  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }) {
  const service = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0]`,
    { slug: params.slug },
  );

  if (!service) return notFound();

  return (
    <div className="w-full bg-primary-50 py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] w-full px-4 items-center">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex items-center gap-4">
            {service.icon && (
              <img
                src={urlFor(service.icon).width(56).height(56).url()}
                alt={service.title}
                className="w-[56px] h-[56px]"
              />
            )}
            <h2 className="page-heading">{service.title}</h2>
          </div>

          <div className="page-subheading">
            {service.longDescription || service.description}
          </div>
        </div>
      </div>
    </div>
  );
}
