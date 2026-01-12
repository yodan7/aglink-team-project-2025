import type { NextConfig } from "next";

// ★セキュリティ: 環境変数からSupabase URLのホスト名を抽出
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : "";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "placehold.co",
      // 他に外部ホストがあればここに追加
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
