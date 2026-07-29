import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker/Coolify için standalone çıktı (küçük runtime imajı)
  output: "standalone",
  // Birden fazla lockfile ortamında doğru workspace kökü
  turbopack: {
    root: __dirname,
  },
  images: {
    // sharp gerektirmeden çalış (standalone runtime'da native optimize yok)
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
