// app/paslaugos/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";
import { portableTextToPlainText } from "../../../lib/portable-text";
import { getSiteUrl } from "../../../lib/env";
import {
  COMPANY_PHONE,
  COMPANY_PHONE_DISPLAY,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "../../../lib/constants";
import RichBody from "../../../components/rich-body";
import Breadcrumb from "../../../components/breadcrumb";

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

export default async function ServiceDetailPage({ params }) {
  const [service, allServices] = await Promise.all([
    client.fetch(groq`*[_type == "service" && slug.current == $slug][0]`, {
      slug: params.slug,
    }),
    client.fetch(
      groq`*[_type == "service"] | order(order asc) { title, "slug": slug.current }`,
    ),
  ]);

  if (!service) return notFound();

  const otherServices = allServices.filter(
    (s) => s.slug && s.slug !== params.slug,
  );
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
      <div className="page-container page-section-inner">
        <Breadcrumb
          items={[
            { href: "/", label: "Pradžia" },
            { href: "/paslaugos", label: "Paslaugos" },
            { label: service.title },
          ]}
        />
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

        <div className="w-full max-w-[960px] border-t border-primary-100 flex flex-col gap-[80px]">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-primary-800 font-medium m-0">
              Norite užsakyti šią paslaugą? Susisiekite su mumis.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`tel:${COMPANY_PHONE}`}
                className="btn-primary inline-flex items-center justify-center gap-2"
                aria-label={COMPANY_PHONE_DISPLAY}
              >
                <svg
                  className="w-5 h-5 shrink-0 text-gray-white"
                  aria-hidden
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z"
                  />
                </svg>
                {COMPANY_PHONE_DISPLAY}
              </a>
              <Link
                href="/kontaktai"
                className="btn-primary inline-flex items-center justify-center gap-2"
                aria-label="Rašyti žinutę per kontaktų formą"
              >
                <svg
                  className="w-5 h-5 shrink-0 text-gray-white"
                  aria-hidden
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Rašyti žinutę
              </Link>
            </div>
          </div>

          {otherServices.length > 0 && (
            <div className="flex flex-col gap-10">
              <h2 className="text-lg font-semibold text-primary-800 mb-0 mt-0">
                Kitos paslaugos
              </h2>
              <ul className="flex flex-wrap list-none m-0 p-0 gap-10 justify-center w-full">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/paslaugos/${s.slug}`}
                      className="link-default text-primary-500 no-underline"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-sm mb-0 mt-0 text-primary-500">
                <Link
                  href="/paslaugos"
                  className="link-default text-primary-500 no-underline"
                >
                  Visos paslaugos →
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
