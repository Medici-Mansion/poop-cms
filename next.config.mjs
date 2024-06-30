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
    ],
  },
};
export default config;
