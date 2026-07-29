import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { ICONS } from "@/components/ui/icons";
import { LinkHub, type HubLink, type HubProduct } from "@/components/LinkHub";
import type { LinkBlock } from "@prisma/client";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [links, products] = await Promise.all([
      prisma.linkBlock.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
      prisma.product.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
    ]);
    return { links, products };
  } catch {
    return { links: [], products: [] };
  }
}

const CATEGORY_ICON: Record<string, string> = {
  SALES: "globe",
  MARKETPLACE: "bag",
  FEEDBACK: "messageCircle",
  PRODUCTS: "package",
  SOCIAL: "instagram",
  CUSTOM: "externalLink",
};

function resolveIcon(l: LinkBlock): string {
  if (l.icon && ICONS[l.icon]) return l.icon;
  return CATEGORY_ICON[l.category] ?? "externalLink";
}

function toHubLink(l: LinkBlock, tone: "espresso" | "almond"): HubLink {
  return {
    id: l.id,
    title: l.title,
    subtitle: l.subtitle,
    url: l.url,
    icon: resolveIcon(l),
    tone,
    openInNewTab: l.openInNewTab,
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const sp = await searchParams;
  const initialTab = sp?.tab === "urunler" ? "urunler" : "iletisim";

  const [cfg, { links, products }] = await Promise.all([getSiteConfig(), getData()]);

  const contact = links
    .filter((l) => l.category !== "MARKETPLACE" && l.category !== "PRODUCTS")
    .map((l) => toHubLink(l, "espresso"));

  const marketplace = links
    .filter((l) => l.category === "MARKETPLACE")
    .map((l) => toHubLink(l, "almond"));

  const hubProducts: HubProduct[] = products.map((p) => ({
    id: p.id,
    title: p.title,
    priceLabel: formatPrice(p.priceAmount, p.priceCurrency),
    compareLabel: formatPrice(p.compareAtPrice, p.priceCurrency),
    imageUrl: p.imageUrl,
    sourceUrl: p.sourceUrl,
    available: p.available,
  }));

  return (
    <LinkHub
      brandName={cfg.brandName}
      tagline={cfg.tagline}
      avatarUrl={cfg.avatarUrl}
      contact={contact}
      marketplace={marketplace}
      products={hubProducts}
      initialTab={initialTab}
    />
  );
}
