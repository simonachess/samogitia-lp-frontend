export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://samogitiagroup.lt/sitemap.xml",
  };
}
