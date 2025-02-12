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
};

module.exports = nextConfig;
