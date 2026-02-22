// app/paslaugos/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";
import { portableTextToPlainText } from "../../../lib/portable-text";
import RichBody from "../../../components/rich-body";

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
  const rawDesc = service.longDescription ?? service.description;
  const pageDescription = Array.isArray(rawDesc)
    ? portableTextToPlainText(rawDesc) ||
      "Žemės gerbūvio ir aplinkos tvarkymo paslauga."
    : rawDesc || "Žemės gerbūvio ir aplinkos tvarkymo paslauga.";

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
          <div className="flex items-center gap-4 mb-6">
            {service.icon && (
              <Image
                src={urlFor(service.icon).width(56).height(56).url()}
                alt={service.title}
                width={56}
                height={56}
                sizes="56px"
                className="w-[56px] h-[56px]"
              />
            )}
            <h2 className="page-heading">{service.title}</h2>
          </div>

          {(service.longDescription ?? service.description) &&
            (Array.isArray(service.longDescription ?? service.description) ? (
              <RichBody
                value={service.longDescription ?? service.description}
              />
            ) : (
              <div className="rich-description page-subheading w-full text-left">
                {String(service.longDescription ?? service.description)
                  .split(/\n/)
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      className="mb-4 last:mb-0 text-primary-800 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
