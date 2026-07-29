"use client";

import { useState } from "react";
import Image from "next/image";
import { TileCard, type TileTone } from "./ui/TileCard";
import { ProductCard } from "./ui/ProductCard";
import { PageView } from "./PageView";
import { maskStyle, ICONS } from "./ui/icons";

export type HubLink = {
  id: string;
  title: string;
  subtitle?: string | null;
  url: string;
  icon: string;
  tone: TileTone;
  openInNewTab: boolean;
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

const MAXW = 560;

const eyebrow = {
  fontSize: 12,
  fontWeight: 700 as const,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "var(--color-accent)",
};

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 14,
        marginTop: 14,
      }}
    >
      {children}
    </div>
  );
}

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
    <main style={{ minHeight: "100dvh", background: "var(--surface)", paddingBottom: 96 }}>
      <PageView />

      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 18px" }}>
        {/* kompakt header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "22px 4px 18px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              flex: "none",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "var(--surface-card)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Image
              src={avatarUrl ?? "/brand/muybieno-square.png"}
              alt={brandName}
              width={56}
              height={56}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 26,
                lineHeight: 1.05,
                margin: 0,
                color: "var(--text-heading)",
              }}
            >
              {brandName}
            </h1>
            {tagline ? (
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.4,
                  color: "var(--text-muted)",
                  margin: "4px 0 0",
                  fontWeight: 500,
                }}
              >
                {tagline}
              </p>
            ) : null}
          </div>
        </header>

        {/* içerik */}
        {tab === "iletisim" ? (
          <div>
            <section>
              <div style={eyebrow}>İletişim</div>
              {contact.length > 0 ? (
                <Grid>
                  {contact.map((l) => (
                    <TileCard key={l.id} {...l} />
                  ))}
                </Grid>
              ) : (
                <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 14 }}>
                  Henüz bağlantı eklenmedi.
                </p>
              )}
            </section>

            {marketplace.length > 0 ? (
              <section style={{ marginTop: 30 }}>
                <div style={eyebrow}>Pazar Yerleri</div>
                <Grid>
                  {marketplace.map((l) => (
                    <TileCard key={l.id} {...l} />
                  ))}
                </Grid>
              </section>
            ) : null}
          </div>
        ) : (
          <section>
            <div style={eyebrow}>Ürünler</div>
            {products.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 14,
                  marginTop: 14,
                }}
              >
                {products.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 14 }}>
                Henüz ürün eklenmedi.
              </p>
            )}
          </section>
        )}
      </div>

      {/* sabit bottom nav */}
      <nav
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.86)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderTop: "1px solid var(--line)",
          boxShadow: "0 -8px 24px rgba(39,19,16,0.06)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            padding: "8px 18px",
          }}
        >
          <NavButton
            label="İletişim"
            icon="home"
            active={tab === "iletisim"}
            onClick={() => setTab("iletisim")}
          />
          <NavButton
            label="Ürünler"
            icon="package"
            active={tab === "urunler"}
            onClick={() => setTab("urunler")}
          />
        </div>
      </nav>
    </main>
  );
}

function NavButton({
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
      aria-label={label}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        padding: "8px 0",
        borderRadius: "var(--radius-md)",
        border: "none",
        background: active ? "rgba(123,79,39,0.10)" : "transparent",
        cursor: "pointer",
        transition: "background .18s ease",
      }}
    >
      <span
        style={maskStyle(
          ICONS[icon],
          22,
          active ? "var(--color-primary)" : "var(--text-placeholder)",
        )}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: active ? "var(--color-primary)" : "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
