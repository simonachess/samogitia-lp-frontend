// app/projektai/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";
import { portableTextToPlainText } from "../../../lib/portable-text";
import { getSiteUrl } from "../../../lib/env";
import ProjectGallery from "../../../components/project-gallery";
import RichBody from "../../../components/rich-body";

export const revalidate = 60;

// Sugeneruojam statinius kelius /projects/[slug]
export async function generateStaticParams() {
  const projects = await client.fetch(
    groq`*[_type == "project"]{ "slug": slug.current }`,
  );

  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

// SEO metaduomenys kiekvienam projektui
export async function generateMetadata({ params }) {
  const project = await client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      title,
      description
    }`,
    { slug: params.slug },
  );

  if (!project) {
    return {
      title: "Projektas nerastas",
      description: "Ieškomas projektas nerastas.",
    };
  }

  const pageTitle = project.title || "Atliktas projektas";
  const pageDescription = Array.isArray(project.description)
    ? portableTextToPlainText(project.description) ||
      "Žemės gerbūvio ir aplinkos tvarkymo projektas."
    : project.description || "Žemės gerbūvio ir aplinkos tvarkymo projektas.";
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/projektai/${params.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "article",
      url: canonical,
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      title,
      description,
      mainImage,
      gallery
    }`,
    { slug: params.slug },
  );

  if (!project) return notFound();

  const siteUrl = getSiteUrl();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: Array.isArray(project.description)
      ? portableTextToPlainText(project.description)
      : project.description,
    url: `${siteUrl}/projektai/${params.slug}`,
  };

  // Build images list: main first, then gallery (for display + modal)
  const images = [];
  if (project.mainImage) {
    images.push({
      src: urlFor(project.mainImage).width(1200).url(),
      alt: project.title || "Projekto nuotrauka",
    });
  }
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((img, idx) => {
      images.push({
        src: urlFor(img).width(1200).url(),
        alt: `${project.title} nuotrauka ${images.length + 1}`,
      });
    });
  }

  return (
    <section className="page-section" aria-labelledby="project-title">
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
              <Link href="/projektai" className="link-default">
                Atlikti darbai
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-primary-800" aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>
        <article>
          <div className="flex flex-col gap-6 items-center w-full">
            <h1
              id="project-title"
              className="page-heading w-full max-w-[960px]"
            >
              {project.title}
            </h1>
            {project.description &&
              (Array.isArray(project.description) ? (
                <RichBody value={project.description} />
              ) : (
                <div className="rich-description page-subheading w-full max-w-[960px] text-left">
                  {String(project.description)
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
            {images.length > 0 && (
              <ProjectGallery images={images} projectTitle={project.title} />
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
