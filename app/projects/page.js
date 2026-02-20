import ServicesContainer from "../../components/services-container";
import { client, urlFor } from "../../lib/sanity";
import groq from "groq";

export const metadata = {
  title: "Atlikti darbai",
};

export default async function WorksPage() {
  const projects = await client.fetch(
    groq`*[_type == "project"] | order(order asc) {
      _id,
      title,
      description,
      "slug": slug.current,
      mainImage,
      gallery
    }`
  );

  const items = projects.map((p) => ({
    id: p._id,
    title: p.title,
    description: p.description,
    // convert mainImage to CSS background-image string
    bg: p.mainImage
      ? `url("${urlFor(p.mainImage).width(800).height(500).url()}")`
      : `url("/card-1@3x.png")`, // fallback
    href: p.slug ? `/works/${p.slug}` : "#",
    gallery: p.gallery || [],
  }));

  return <ServicesContainer items={items} />;
}
