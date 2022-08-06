/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['cdn.sanity.io'],
    swcMinify: true,
  },
};

module.exports = nextConfig;
