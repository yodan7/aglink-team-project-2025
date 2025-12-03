import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "placehold.co",
      "placehold.co",
      // 他に外部ホストがあればここに追加
    ],
  },
};

export default nextConfig;
