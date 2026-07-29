import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker/Coolify için standalone çıktı (küçük runtime imajı)
  output: "standalone",
  // Birden fazla lockfile ortamında doğru workspace kökü
  turbopack: {
    root: __dirname,
  },
  images: {
    // Shopify CDN görselleri (ProductCard <img> kullanıyor; ileride next/image için)
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
