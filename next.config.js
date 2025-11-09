/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Skip API routes during static export - they will be ignored automatically
  trailingSlash: true,
};

module.exports = nextConfig;
