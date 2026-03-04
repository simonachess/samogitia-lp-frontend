// app/[slug]/page.js – service pages at root (e.g. /drenazo-irengimas)
// Canonical URL is the short root path (e.g. /drenazo-irengimas).
import { notFound } from "next/navigation";
import { client, urlFor } from "../../lib/sanity";
import groq from "groq";
import { portableTextToPlainText } from "../../lib/portable-text";
import { getSiteUrl } from "../../lib/env";
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "../../lib/constants";
import ServiceDetailContent from "../../components/service-detail-content";

const RESERVED_PATHS = new Set([
  "apie",
  "kontaktai",
  "paslaugos",
  "nuoma",
  "projektai",
  "privatumas",
  "taisykles",
]);

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await client.fetch(
    groq`*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`,
  );
  return (services || [])
    .filter((s) => s.slug && !RESERVED_PATHS.has(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  if (RESERVED_PATHS.has(params.slug)) return {};
  const service = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0]{
      title,
      description,
      longDescription,
      metaDescription,
      icon,
      ogImage
    }`,
    { slug: params.slug },
  );
  if (!service) return {};
  const pageTitle = service.title || "Žemės gerbūvio paslauga";
  const pageDescription =
    service.metaDescription?.trim() ||
    (() => {
      const rawDesc = service.longDescription ?? service.description;
      return Array.isArray(rawDesc)
        ? portableTextToPlainText(rawDesc) ||
            "Žemės gerbūvio ir aplinkos tvarkymo paslauga."
        : rawDesc || "Žemės gerbūvio ir aplinkos tvarkymo paslauga.";
    })();
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/${params.slug}`;
  const ogImageUrl = service.ogImage
    ? urlFor(service.ogImage)
        .width(OG_IMAGE_WIDTH)
        .height(OG_IMAGE_HEIGHT)
        .fit("fill")
        .url()
    : service.icon
      ? urlFor(service.icon)
          .width(OG_IMAGE_WIDTH)
          .height(OG_IMAGE_HEIGHT)
          .fit("fill")
          .url()
      : `${siteUrl}/samogitiagroup_og.jpg`;
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "article",
      url: canonical,
      images: [
        {
          url: ogImageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: pageTitle,
        },
      ],
    },
  };
}

export default async function RootServicePage({ params }) {
  if (RESERVED_PATHS.has(params.slug)) notFound();
  const [service, allServices] = await Promise.all([
    client.fetch(groq`*[_type == "service" && slug.current == $slug][0]`, {
      slug: params.slug,
    }),
    client.fetch(
      groq`*[_type == "service"] | order(order asc) { title, "slug": slug.current }`,
    ),
  ]);
  if (!service) return notFound();
  const otherServices = (allServices || []).filter(
    (s) => s.slug && s.slug !== params.slug,
  );
  const siteUrl = getSiteUrl();
  return (
    <ServiceDetailContent
      service={service}
      otherServices={otherServices}
      slug={params.slug}
      siteUrl={siteUrl}
    />
  );
}
