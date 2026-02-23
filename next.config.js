/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
    optimizeCss: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // produce a static export (replaces the old `next export` CLI)
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
