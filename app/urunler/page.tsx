import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { maskStyle, ICONS } from "@/components/ui/icons";
import { ProductCard } from "@/components/ui/ProductCard";
import { PageView } from "@/components/PageView";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const [cfg, products] = await Promise.all([getSiteConfig(), getProducts()]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
      <PageView path="/urunler" />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px 64px" }}>
        {/* header */}
        <header style={{ padding: "32px 0 8px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13.5,
              fontWeight: 600,
              color: "var(--color-primary)",
            }}
          >
            <span
              style={{
                ...maskStyle(ICONS.chevronRight, 16, "var(--color-primary)"),
                transform: "rotate(180deg)",
              }}
            />
            {cfg.brandName}
          </Link>
          <div style={{ marginTop: 22 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              Ürünler
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 38,
                lineHeight: 1.08,
                margin: "6px 0 0",
                color: "var(--text-heading)",
              }}
            >
              Tüm ürünlerimiz
            </h1>
          </div>
        </header>

        {products.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
              marginTop: 24,
            }}
          >
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                priceLabel={formatPrice(p.priceAmount, p.priceCurrency)}
                compareLabel={formatPrice(p.compareAtPrice, p.priceCurrency)}
                imageUrl={p.imageUrl}
                sourceUrl={p.sourceUrl}
                available={p.available}
              />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--text-muted)", marginTop: 24, fontSize: 15 }}>
            Henüz ürün eklenmedi.
          </p>
        )}

        <footer style={{ marginTop: 56, textAlign: "center" }}>
          <Image
            src="/brand/muybieno-wordmark.png"
            alt={cfg.brandName}
            width={132}
            height={44}
            style={{ height: 32, width: "auto", opacity: 0.8, display: "inline-block" }}
          />
        </footer>
      </div>
    </main>
  );
}
