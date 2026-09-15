import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    // Modern formats = smaller bytes, same look → faster loads + better pagespeed
    formats: ["image/avif", "image/webp"],
    // Match polaroid grid + lightbox display widths (avoid shipping multi‑MB originals)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384, 512],
    // Cache optimized variants so repeat visits stay snappy
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
