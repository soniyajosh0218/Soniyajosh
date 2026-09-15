import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // Keep media delivery simple on Vercel (photos + blessing art in /public)
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
