// app/services/[slug]/page.js
import { notFound } from "next/navigation";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await client.fetch(
    groq`*[_type == "service"]{ "slug": slug.current }`,
  );

  return services.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const service = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0]{
      title,
      description,
      longDescription
    }`,
    { slug: params.slug },
  );

  if (!service) {
    return {
      title: "Paslauga nerasta",
      description: "Ieškoma paslauga nerasta.",
    };
  }

  const pageTitle = service.title || "Žemės gerbūvio paslauga";
  const pageDescription =
    service.longDescription ||
    service.description ||
    "Žemės gerbūvio ir aplinkos tvarkymo paslauga.";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const service = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0]`,
    { slug: params.slug },
  );

  if (!service) return notFound();

  return (
    <div className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
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

          <div className="page-subheading max-w-[800px]">
            {service.longDescription || service.description}
          </div>
        </div>
      </div>
    </div>
  );
}
