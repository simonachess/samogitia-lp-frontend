// app/nuoma/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import groq from "groq";
import { client, urlFor } from "../../../lib/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  const items = await client.fetch(
    groq`*[_type == "rent"]{ "slug": slug.current }`,
  );

  return items.filter((i) => i.slug).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const item = await client.fetch(
    groq`*[_type == "rent" && slug.current == $slug][0]{
      title,
      description,
      longDescription
    }`,
    { slug: params.slug },
  );

  if (!item) {
    return {
      title: "Nuomos objektas nerastas",
      description: "Ieškomas nuomos objektas nerastas.",
    };
  }

  const pageTitle = item.title || "Technikos nuoma";
  const pageDescription =
    item.longDescription ||
    item.description ||
    "Technikos ir įrangos nuomos paslauga.";

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

export default async function RentDetailPage({ params }) {
  const item = await client.fetch(
    groq`*[_type == "rent" && slug.current == $slug][0]`,
    { slug: params.slug },
  );

  if (!item) return notFound();

  return (
    <div className="page-section">
      <div className="page-container page-section-inner">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex items-center gap-4">
            {item.icon && (
              <Image
                src={urlFor(item.icon).width(56).height(56).url()}
                alt={item.title}
                width={56}
                height={56}
                sizes="56px"
                className="w-[56px] h-[56px]"
              />
            )}
            <h1 className="page-heading">{item.title}</h1>
          </div>

          <div className="page-subheading max-w-[800px]">
            {item.longDescription || item.description}
          </div>

          {(item.pricePerDay || item.pricePerHour) && (
            <div className="mt-4 text-primary-800 font-semibold text-lg">
              {item.pricePerDay && `Kaina nuo ${item.pricePerDay} €/diena`}
              {item.pricePerDay && item.pricePerHour && " · "}
              {item.pricePerHour && `nuo ${item.pricePerHour} €/val.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
