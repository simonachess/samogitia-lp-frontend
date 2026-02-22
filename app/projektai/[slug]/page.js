// app/projektai/[slug]/page.js
import { notFound } from "next/navigation";
import { client, urlFor } from "../../../lib/sanity";
import groq from "groq";
import ProjectGallery from "../../../components/project-gallery";

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

  // Build images list: main first, then gallery (for display + modal)
  const images = [];
  if (project.mainImage) {
    images.push({
      src: urlFor(project.mainImage).width(1200).height(800).url(),
      alt: project.title || "Projekto nuotrauka",
    });
  }
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((img, idx) => {
      images.push({
        src: urlFor(img).width(1200).height(800).url(),
        alt: `${project.title} nuotrauka ${images.length + 1}`,
      });
    });
  }

  return (
    <div className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] w-full px-4 flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="page-heading">{project.title}</h1>
          {project.description && (
            <p className="page-subheading">{project.description}</p>
          )}
          {images.length > 0 && (
            <ProjectGallery images={images} projectTitle={project.title} />
          )}
        </div>
      </div>
    </div>
  );
}
