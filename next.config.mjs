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
    domains: ['img.daisyui.com', 'picsum.photos'],
  },
};

export default nextConfig;
