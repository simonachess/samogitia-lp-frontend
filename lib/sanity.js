import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-02-20",
  useCdn: true, // CDN cache for faster reads
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
