// app/projektai/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";

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
  const pageDescription =
    project.description || "Žemės gerbūvio ir aplinkos tvarkymo projektas.";

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

  return (
    <div className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] w-full px-4 flex flex-col gap-10 items-center">
        {/* Title + main image */}
        <div className="flex flex-col gap-6 items-center">
          <h1 className="page-heading">{project.title}</h1>
          {project.description && (
            <p className="page-subheading">{project.description}</p>
          )}
          {project.mainImage && (
            <div className="w-full max-w-[900px] relative aspect-[2/1]">
              <Image
                src={urlFor(project.mainImage).width(1200).height(600).url()}
                alt={project.title}
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          )}
        </div>

        {/* Gallery (jei yra daugiau nuotraukų) */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="w-full max-w-[900px] flex flex-col gap-4 items-start text-left">
            <h2 className="text-2xl font-semibold text-primary-800">
              Papildomos projekto nuotraukos
            </h2>
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] gap-4">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="relative h-[200px]">
                  <Image
                    src={urlFor(img).width(800).height(600).url()}
                    alt={`${project.title} nuotrauka ${idx + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 800px) 100vw, 220px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
