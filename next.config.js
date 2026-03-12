const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/cocinas',
        destination: '/es',
        statusCode: 301,
      },
      {
        source: '/faq',
        destination: '/es',
        statusCode: 301,
      },
      {
        source: '/interiores',
        destination: '/es',
        statusCode: 301,
      },
      {
        source: '/contacto',
        destination: '/es',
        statusCode: 301,
      },
      {
        source: '/sus-fundadores',
        destination: '/es/community',
        statusCode: 301,
      },
      {
        source: '/como-funciona',
        destination: '/es',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'kalicolivings.com' }],
        destination: 'https://www.kalicoliving.com/:path*',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kalicolivings.com' }],
        destination: 'https://www.kalicoliving.com/:path*',
        statusCode: 301,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'offloadmedia.feverup.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kalicoliving.vercel.app',
        pathname: '/**',
      }
    ],
  },
};

module.exports = withNextIntl(nextConfig);