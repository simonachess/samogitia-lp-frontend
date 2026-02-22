import ServicesContainer from "../../components/services-container";
import { client, urlFor } from "../../lib/sanity";
import groq from "groq";

export const revalidate = 60;

export const metadata = {
  title: "Atlikti darbai",
  description:
    "Mūsų atlikti žemės gerbūvio darbai, sklypų paruošimo ir aplinkos tvarkymo projektai Žemaitijoje ir kituose Lietuvos regionuose.",
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
    }`,
  );

  const items = projects.map((p) => ({
    id: p._id,
    title: p.title,
    description: p.description,
    imageUrl: p.mainImage
      ? urlFor(p.mainImage).width(800).height(500).url()
      : "/card-1@3x.png",
    imageAlt: p.title
      ? `${p.title} – atliktas projektas`
      : "Atliktas projektas",
    href: p.slug ? `/projektai/${p.slug}` : "#",
    gallery: p.gallery || [],
  }));

  return <ServicesContainer items={items} />;
}
