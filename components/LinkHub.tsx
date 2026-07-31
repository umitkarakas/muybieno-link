"use client";

import { useState } from "react";
import Image from "next/image";
import { TileCard, type TileTone } from "./ui/TileCard";
import { ProductCard } from "./ui/ProductCard";
import { PageView } from "./PageView";
import { maskStyle, ICONS } from "./ui/icons";
import type { MarketBrand } from "@/lib/marketplaces";

export type HubLink = {
  id: string;
  title: string;
  subtitle?: string | null;
  url: string;
  icon: string;
  tone: TileTone;
  openInNewTab: boolean;
  imageUrl?: string | null;
  brand?: MarketBrand | null;
};

export type HubProduct = {
  id: string;
  title: string;
  priceLabel: string | null;
  compareLabel: string | null;
  imageUrl: string | null;
  sourceUrl: string;
  available: boolean;
};

type Props = {
  brandName: string;
  tagline?: string | null;
  avatarUrl?: string | null;
  contact: HubLink[];
  marketplace: HubLink[];
  products: HubProduct[];
  initialTab?: "iletisim" | "urunler";
};

const MAXW = 580;

const eyebrow = {
  fontSize: 12,
  fontWeight: 700 as const,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "var(--color-accent)",
};

export function LinkHub({
  brandName,
  tagline,
  avatarUrl,
  contact,
  marketplace,
  products,
  initialTab = "iletisim",
}: Props) {
  const [tab, setTab] = useState<"iletisim" | "urunler">(initialTab);

  return (
    <main
      style={{
        minHeight: "100dvh",
        paddingBottom: 108,
        background:
          "radial-gradient(1100px 520px at 50% -8%, rgba(176,137,90,0.16), transparent 62%)," +
          "radial-gradient(760px 420px at 108% 8%, rgba(123,79,39,0.08), transparent 60%)," +
          "radial-gradient(680px 380px at -8% 22%, rgba(176,137,90,0.08), transparent 58%)," +
          "var(--surface)",
      }}
    >
      <PageView />

      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 18px" }}>
        {/* kompakt header */}
        <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "24px 4px 20px" }}>
          <div
            style={{
              width: 58,
              height: 58,
              flex: "none",
              borderRadius: 18,
              overflow: "hidden",
              background: "var(--surface-card)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Image
              src={avatarUrl ?? "/brand/muybieno-square.png"}
              alt={brandName}
              width={58}
              height={58}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 27,
                lineHeight: 1.05,
                margin: 0,
                color: "var(--text-heading)",
                letterSpacing: "-0.01em",
              }}
            >
              {brandName}
            </h1>
            {tagline ? (
              <p style={{ fontSize: 13, lineHeight: 1.4, color: "var(--text-muted)", margin: "4px 0 0", fontWeight: 500 }}>
                {tagline}
              </p>
            ) : null}
          </div>
        </header>

        {tab === "iletisim" ? (
          <div>
            {/* İletişim — 2 sütun grid */}
            <section>
              <div style={{ ...eyebrow, marginBottom: 12 }}>İletişim</div>
              {contact.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
                  {contact.map((l) => (
                    <TileCard key={l.id} {...l} />
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Henüz bağlantı eklenmedi.</p>
              )}
            </section>

            {/* Pazar Yerleri — marka kutucukları */}
            {marketplace.length > 0 ? (
              <section style={{ marginTop: 30 }}>
                <div style={{ ...eyebrow, marginBottom: 12 }}>Pazar Yerleri</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
                  {marketplace.map((l) => (
                    <TileCard key={l.id} {...l} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : (
          <section>
            <div style={{ ...eyebrow, marginBottom: 12 }}>Ürünler</div>
            {products.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
                {products.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Henüz ürün eklenmedi.</p>
            )}
          </section>
        )}
      </div>

      {/* floating bottom nav */}
      <nav
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "calc(16px + env(safe-area-inset-bottom))",
          zIndex: 50,
          display: "flex",
          gap: 4,
          padding: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 18px 40px rgba(39,19,16,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <NavPill label="İletişim" icon="home" active={tab === "iletisim"} onClick={() => setTab("iletisim")} />
        <NavPill label="Ürünler" icon="package" active={tab === "urunler"} onClick={() => setTab("urunler")} />
      </nav>
    </main>
  );
}

function NavPill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "11px 20px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 700,
        color: active ? "var(--color-on-primary)" : "var(--text-body)",
        background: active ? "var(--gradient-primary)" : "transparent",
        boxShadow: active ? "var(--shadow-cta)" : "none",
        transition: "background .2s ease, color .2s ease",
      }}
    >
      <span style={maskStyle(ICONS[icon], 19, active ? "var(--cream-100)" : "var(--text-muted)")} />
      {label}
    </button>
  );
}
