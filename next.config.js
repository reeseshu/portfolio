/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  async redirects() {
    return [];
  },
  async headers() {
    return [];
  },
};

module.exports = nextConfig;
