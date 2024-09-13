/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {

    config.resolve.fallback = { fs: false };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  basePath: process.env.NEXT_PUBLIC_NODE_ENV != "PRODUCTION" ?  null : '/FaceIO',
};

export default nextConfig;
