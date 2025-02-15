/** @type {import('next').NextConfig} */

const path = require("path");
const isStaticExport = 'false';

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    minimumCacheTTL: 60,
  },
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
  webpack: (config, { dev }) => {
    config.resolve.alias['slick-carousel'] = path.resolve(__dirname, 'node_modules/slick-carousel');
    if (dev) {
      config.resolve.alias['react-refresh/runtime'] = path.resolve('noop');
    }
    return config;
  },
};

module.exports = nextConfig;
