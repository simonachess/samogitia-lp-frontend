// app/sitemap.js
import { client } from "../lib/sanity";
import groq from "groq";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://samogitiagroup.lt";

  let services = [];
  let projects = [];
  let rent = [];

  try {
    [services, projects, rent] = await Promise.all([
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
      client.fetch(
        groq`*[_type == "rent" && defined(slug.current)]{
          "slug": slug.current,
          _updatedAt
        }`,
      ),
    ]);
  } catch (err) {
    console.error("Sitemap Sanity fetch error:", err);
    // Continue with empty arrays so static pages still get generated
  }

  const staticPages = [
    "",
    "/paslaugos",
    "/nuoma",
    "/projektai",
    "/kontaktai",
    "/apie",
    "/privatumas",
    "/taisykles",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceUrls =
    services?.map((s) => ({
      url: `${baseUrl}/paslaugos/${s.slug}`,
      lastModified: s._updatedAt ? new Date(s._updatedAt) : new Date(),
    })) ?? [];

  const projectUrls =
    projects?.map((p) => ({
      url: `${baseUrl}/projektai/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    })) ?? [];

  const rentUrls =
    rent?.map((r) => ({
      url: `${baseUrl}/nuoma/${r.slug}`,
      lastModified: r._updatedAt ? new Date(r._updatedAt) : new Date(),
    })) ?? [];

  return [...staticPages, ...serviceUrls, ...projectUrls, ...rentUrls];
}
