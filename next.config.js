/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.AWS_DOMAIN],
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
