import { prisma } from "@/lib/prisma";

/**
 * Shopify entegrasyonu — "link yapıştır → otomatik çek".
 * Public `/products/<handle>.json` endpoint'ini kullanır (token gerektirmez),
 * böylece herhangi bir Shopify mağazasının ürün linki desteklenir.
 */

export type NormalizedProduct = {
  shopifyId: string | null;
  handle: string | null;
  sourceUrl: string;
  title: string;
  description: string | null;
  priceAmount: string | null;
  compareAtPrice: string | null;
  priceCurrency: string;
  imageUrl: string | null;
  available: boolean;
};

const DEFAULT_CURRENCY = process.env.SHOPIFY_DEFAULT_CURRENCY ?? "TRY";

/** Shopify ürün linkinden domain + handle çıkarır */
export function parseShopifyUrl(input: string): { origin: string; handle: string } | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  // /products/<handle>  ya da  /collections/x/products/<handle>
  const match = url.pathname.match(/\/products\/([^/?#]+)/);
  if (!match) return null;
  const handle = decodeURIComponent(match[1]).replace(/\.json$/, "");
  return { origin: url.origin, handle };
}

function stripHtml(html: string | null | undefined): string | null {
  if (!html) return null;
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Verilen Shopify ürün linkinden normalize edilmiş ürün verisi çeker */
export async function fetchShopifyProduct(sourceUrl: string): Promise<NormalizedProduct> {
  const parsed = parseShopifyUrl(sourceUrl);
  if (!parsed) {
    throw new Error("Geçerli bir Shopify ürün linki değil (/products/<handle> bekleniyor)");
  }

  const jsonUrl = `${parsed.origin}/products/${parsed.handle}.json`;
  const res = await fetch(jsonUrl, {
    headers: { "User-Agent": "MuyBieno-Link/1.0", Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Ürün çekilemedi (HTTP ${res.status}) — link doğru mu?`);
  }

  const data = (await res.json()) as { product?: ShopifyProductJson };
  const p = data.product;
  if (!p) throw new Error("Ürün bulunamadı");

  const firstVariant = p.variants?.[0];
  const image = p.images?.[0]?.src ?? p.image?.src ?? null;
  const available = (p.variants ?? []).some((v) => v.available !== false);

  return {
    shopifyId: p.id ? `gid://shopify/Product/${p.id}` : null,
    handle: p.handle ?? parsed.handle,
    sourceUrl: `${parsed.origin}/products/${p.handle ?? parsed.handle}`,
    title: p.title ?? parsed.handle,
    description: stripHtml(p.body_html),
    priceAmount: firstVariant?.price ?? null,
    compareAtPrice: firstVariant?.compare_at_price ?? null,
    priceCurrency: DEFAULT_CURRENCY,
    imageUrl: image,
    available,
  };
}

/** Bir Shopify linkinden ürünü DB'ye ekler/günceller (upsert) */
export async function upsertProductFromUrl(sourceUrl: string) {
  const n = await fetchShopifyProduct(sourceUrl);

  const data = {
    handle: n.handle,
    sourceUrl: n.sourceUrl,
    title: n.title,
    description: n.description,
    priceAmount: n.priceAmount ? Number(n.priceAmount) : null,
    compareAtPrice: n.compareAtPrice ? Number(n.compareAtPrice) : null,
    priceCurrency: n.priceCurrency,
    imageUrl: n.imageUrl,
    available: n.available,
    syncedAt: new Date(),
    syncError: null,
  };

  if (n.shopifyId) {
    return prisma.product.upsert({
      where: { shopifyId: n.shopifyId },
      update: data,
      create: { shopifyId: n.shopifyId, ...data },
    });
  }
  // shopifyId yoksa sourceUrl ile ara
  const existing = await prisma.product.findFirst({ where: { sourceUrl: n.sourceUrl } });
  if (existing) {
    return prisma.product.update({ where: { id: existing.id }, data });
  }
  return prisma.product.create({ data });
}

/** Mevcut bir ürünü kaynak linkinden yeniden senkronize eder */
export async function resyncProduct(productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Ürün bulunamadı");
  try {
    return await upsertProductFromUrl(product.sourceUrl);
  } catch (err) {
    await prisma.product.update({
      where: { id: productId },
      data: { syncError: err instanceof Error ? err.message : "Bilinmeyen hata" },
    });
    throw err;
  }
}

type ShopifyVariantJson = {
  id?: number;
  price?: string;
  compare_at_price?: string | null;
  available?: boolean;
};

type ShopifyProductJson = {
  id?: number;
  title?: string;
  handle?: string;
  body_html?: string;
  vendor?: string;
  variants?: ShopifyVariantJson[];
  images?: Array<{ src?: string }>;
  image?: { src?: string };
};
