import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      }
    ],
    unoptimized: true, // 对于favicon这种小图标，可以禁用优化
  },
};

export default nextConfig;
