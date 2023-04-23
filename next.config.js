/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  // env: {
  //   NEXT_PUBLIC_API_URL: 'http://localhost:3000',
  // },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ecolecta.s3.sa-east-1.amazonaws.com'],
  },
  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

if (isProduction) {
  // Aplica next-pwa solo en producción
  module.exports = withPWA({
    ...nextConfig,
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
    },
  });
} else {
  module.exports = nextConfig;
}
