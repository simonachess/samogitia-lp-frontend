// app/paslaugos/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";
import { portableTextToPlainText } from "../../../lib/portable-text";
import { getSiteUrl } from "../../../lib/env";
import RichBody from "../../../components/rich-body";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await client.fetch(
    groq`*[_type == "service"]{ "slug": slug.current }`,
  );

  return services.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

export async function generateMetadata({ params }) {
  const service = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0]{
      title,
      description,
      longDescription,
      icon
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
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/paslaugos/${params.slug}`;

  const ogImageUrl = service.icon
    ? urlFor(service.icon)
        .width(OG_IMAGE_WIDTH)
        .height(OG_IMAGE_HEIGHT)
        .fit("fill")
        .url()
    : `${siteUrl}/original_size.jpg`;

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

export default async function ServiceDetailPage({ params }) {
  const service = await client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0]`,
    { slug: params.slug },
  );

  if (!service) return notFound();

  const siteUrl = getSiteUrl();
  const rawDesc = service.longDescription ?? service.description;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: service.title,
    description: Array.isArray(rawDesc)
      ? portableTextToPlainText(rawDesc)
      : rawDesc,
    url: `${siteUrl}/paslaugos/${params.slug}`,
  };

  return (
    <section className="page-section" aria-labelledby="service-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="page-container page-section-inner animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
        <nav
          aria-label="Navigacijos kelias"
          className="w-full max-w-[960px] mb-4"
        >
          <ol className="flex flex-wrap gap-2 text-sm text-primary-500 list-none m-0 p-0">
            <li>
              <Link href="/" className="link-default">
                Pradžia
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/paslaugos" className="link-default">
                Paslaugos
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-primary-800" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>
        <article>
          <div className="flex flex-col gap-6 items-center w-full">
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
              <h1 id="service-title" className="page-heading">
                {service.title}
              </h1>
            </div>

            {(service.longDescription ?? service.description) &&
              (Array.isArray(service.longDescription ?? service.description) ? (
                <RichBody
                  value={service.longDescription ?? service.description}
                />
              ) : (
                <div className="rich-description page-subheading w-full max-w-[960px] text-left">
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
        </article>
      </div>
    </section>
  );
}
