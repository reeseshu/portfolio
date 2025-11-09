/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const isStaticExport = !isDev && process.env.STATIC_EXPORT !== 'false';

const nextConfig = {
  // Only enable static export in production builds, not in dev mode
  ...(isStaticExport ? {
    output: 'export',
    basePath: '/portfolio',
    assetPrefix: '/portfolio',
  } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
