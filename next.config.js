/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // 只在生產環境強制 HTTPS 轉址，避免本機開發出現 https 無效回應
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }

    // 獲取域名，如果沒有設定則使用 localhost
    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: `${domain}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    // 開發環境不送出 HSTS 與 upgrade-insecure-requests，避免本機因憑證導致問題
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
