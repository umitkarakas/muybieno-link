import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSiteConfig, getSocials } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { maskStyle, ICONS } from "@/components/ui/icons";
import { LinkCard, type LinkCategory } from "@/components/ui/LinkCard";
import { ProductCard } from "@/components/ui/ProductCard";
import { PageView } from "@/components/PageView";
import { Button } from "@/components/ui/Button";

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
        take: 6,
      }),
    ]);
    return { links, products };
  } catch {
    return { links: [], products: [] };
  }
}

const eyebrow = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "var(--color-accent)",
};

const serifTitle = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 28,
  lineHeight: 1.1,
  margin: "6px 0 0",
  color: "var(--text-heading)",
};

export default async function Home() {
  const [cfg, { links, products }] = await Promise.all([getSiteConfig(), getData()]);
  const socials = getSocials(cfg);

  return (
    <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
      <PageView />

      {/* announcement */}
      <div
        style={{
          background: "var(--gradient-primary)",
          color: "var(--cream-100)",
          fontSize: 13,
          fontWeight: 600,
          textAlign: "center",
          padding: "9px 16px",
        }}
      >
        Taze kavrum, 48 saatte kapınızda ·{" "}
        <span style={{ color: "var(--cream-200)" }}>tüm kanallarımız tek yerde</span>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 64px" }}>
        {/* hero */}
        <header style={{ textAlign: "center", padding: "48px 0 8px" }}>
          <div
            style={{
              width: 96,
              height: 96,
              margin: "0 auto",
              borderRadius: "var(--radius-2xl)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--line)",
              background: "var(--surface-card)",
            }}
          >
            <Image
              src={cfg.avatarUrl ?? "/brand/muybieno-square.png"}
              alt={cfg.brandName}
              width={96}
              height={96}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 40,
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              margin: "22px 0 0",
              color: "var(--text-heading)",
            }}
          >
            {cfg.brandName}
          </h1>
          {cfg.tagline ? (
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "var(--text-body)",
                margin: "12px auto 0",
                maxWidth: 440,
                fontWeight: 500,
              }}
            >
              {cfg.tagline}
            </p>
          ) : null}

          {socials.length > 0 ? (
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 22 }}>
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  style={{
                    width: 44,
                    height: 44,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--surface-latte)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={maskStyle(
                      ICONS[s.icon ?? s.platform] ?? ICONS.externalLink,
                      20,
                      "var(--color-primary)",
                    )}
                  />
                </a>
              ))}
            </div>
          ) : null}
        </header>

        {/* links — iki sütun büyük kutucuklar */}
        <section style={{ marginTop: 36 }}>
          <div style={eyebrow}>Bağlantılar</div>
          {links.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 16,
                marginTop: 16,
              }}
            >
              {links.map((l) => (
                <LinkCard
                  key={l.id}
                  id={l.id}
                  title={l.title}
                  subtitle={l.subtitle}
                  url={l.url}
                  icon={l.icon}
                  category={l.category as LinkCategory}
                  openInNewTab={l.openInNewTab}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 14 }}>
              Henüz bağlantı eklenmedi.
            </p>
          )}
        </section>

        {/* products preview */}
        {products.length > 0 ? (
          <section style={{ marginTop: 44 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <div style={eyebrow}>Ürünler</div>
                <h2 style={serifTitle}>Öne çıkanlar</h2>
              </div>
              <a href="/urunler">
                <Button variant="ghost" iconRight="arrowRight">
                  Tümünü gör
                </Button>
              </a>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 16,
                marginTop: 18,
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
          </section>
        ) : null}

        {/* footer */}
        <footer style={{ marginTop: 56, textAlign: "center" }}>
          <Image
            src="/brand/muybieno-wordmark.png"
            alt={cfg.brandName}
            width={132}
            height={44}
            style={{ height: 34, width: "auto", opacity: 0.8, display: "inline-block" }}
          />
          <div
            style={{
              fontSize: 12.5,
              color: "var(--text-muted)",
              fontWeight: 500,
              marginTop: 14,
            }}
          >
            {cfg.footerText ?? `© ${new Date().getFullYear()} ${cfg.brandName}`}
          </div>
        </footer>
      </div>
    </main>
  );
}
