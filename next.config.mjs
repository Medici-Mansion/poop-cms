await import('./env.mjs');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/poop-storage/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/poop-storage/raw/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.medici-mansion.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'poop-api.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'poop-storage.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd3j361wruo71ic.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default config;
