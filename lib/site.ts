import { prisma } from "@/lib/prisma";
import type { SiteConfig } from "@prisma/client";

export type SocialLink = { platform: string; url: string; icon?: string };

export const DEFAULT_SITE: SiteConfig = {
  id: 1,
  brandName: "MuyBieno",
  tagline: "Tüm dijital bağlantılarımız tek çatı altında",
  avatarUrl: null,
  logoUrl: null,
  themeColor: "#3E2723",
  accentColor: "#936B2F",
  backgroundCss: null,
  seoTitle: "MuyBieno — Bağlantılar",
  seoDescription:
    "MuyBieno satış sitesi, pazaryerleri, ürünler ve geri bildirim — hepsi tek yerde.",
  socials: [],
  footerText: `© ${new Date().getFullYear()} MuyBieno`,
  updatedAt: new Date(),
  createdAt: new Date(),
};

/** SiteConfig tekil kaydını getirir; DB erişilemezse varsayılan döner. */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const cfg = await prisma.siteConfig.findUnique({ where: { id: 1 } });
    return cfg ?? DEFAULT_SITE;
  } catch {
    return DEFAULT_SITE;
  }
}

export function getSocials(cfg: SiteConfig): SocialLink[] {
  const raw = cfg.socials;
  if (Array.isArray(raw)) return raw as unknown as SocialLink[];
  return [];
}
