// app/sitemap.js
import { client } from "../lib/sanity";
import groq from "groq";

export default async function sitemap() {
  // TODO: kai turėsi domeną, pakeisk į tikrą:
  // pvz. const baseUrl = "https://samogitia.lt";
  const baseUrl = "https://samogitiagroup.lt";

  // Vienu metu parsitraukiam paslaugas ir projektus iš Sanity
  const [services, projects] = await Promise.all([
    client.fetch(
      groq`*[_type == "service" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }`,
    ),
    client.fetch(
      groq`*[_type == "project" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }`,
    ),
  ]);

  // Statiniai puslapiai (jei turi /contact, irgi pridėk)
  const staticPages = [
    "",
    "/services",
    "/projects",
    // "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceUrls =
    services?.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: s._updatedAt ? new Date(s._updatedAt) : new Date(),
    })) ?? [];

  const projectUrls =
    projects?.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    })) ?? [];

  return [...staticPages, ...serviceUrls, ...projectUrls];
}
