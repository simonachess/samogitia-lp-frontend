// app/services/[slug]/page.js
import { notFound } from "next/navigation";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";

export async function generateStaticParams() {
  const services = await client.fetch(
    groq`*[_type == "service"]{ "slug": slug.current }`
  );

  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }) {
  const service = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!service) return notFound();

  return (
    <div className="w-full px-[30px] py-[80px] text-left">
      <div className="flex items-center gap-4">
        {service.icon && (
          <img
            src={urlFor(service.icon).width(56).height(56).url()}
            alt={service.title}
            className="w-[56px] h-[56px]"
          />
        )}
        <h1 className="page-heading">{service.title}</h1>
      </div>

      <div className="page-subheading">
        {service.longDescription || service.description}
      </div>
    </div>
  );
}
