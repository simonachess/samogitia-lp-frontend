/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // produce a static export (replaces the old `next export` CLI)
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
