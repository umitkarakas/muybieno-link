"use client";

import { useState, type CSSProperties } from "react";
import { maskStyle, maskStyleSolid, ICONS, SOLID_ICONS } from "./icons";
import { track } from "@/lib/track-client";
import type { MarketBrand } from "@/lib/marketplaces";

export type TileTone = "espresso" | "almond";

export type TileCardProps = {
  id?: string;
  title: string;
  subtitle?: string | null;
  url: string;
  icon: string;
  tone?: TileTone;
  openInNewTab?: boolean;
  imageUrl?: string | null;
  brand?: MarketBrand | null;
  onNavigate?: () => void;
};

export function TileCard({
  id,
  title,
  subtitle,
  url,
  icon,
  tone = "espresso",
  openInNewTab = true,
  imageUrl,
  brand,
  onNavigate,
}: TileCardProps) {
  const [hover, setHover] = useState(false);
  const external = /^https?:\/\//.test(url);
  const gradient = tone === "almond" ? "var(--gradient-accent)" : "var(--gradient-primary)";

  const well = (
    <div
      style={{
        width: 58,
        height: 58,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        overflow: "hidden",
        transition: "transform .25s ease",
        transform: hover ? "translateY(-2px) scale(1.03)" : "none",
        ...(imageUrl
          ? {
              background: "#fff",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              padding: 8,
            }
          : brand
            ? { background: brand.gradient, boxShadow: `0 8px 18px ${brand.color}44` }
            : { background: gradient, boxShadow: "var(--shadow-sm)" }),
      }}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : brand ? (
        <span
          style={{
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: brand.label.length > 2 ? 17 : 21,
            letterSpacing: "-0.02em",
          }}
        >
          {brand.label}
        </span>
      ) : SOLID_ICONS[icon] ? (
        <span style={maskStyleSolid(SOLID_ICONS[icon], 26, "var(--cream-100)")} />
      ) : (
        <span style={maskStyle(ICONS[icon] ?? ICONS.externalLink, 24, "var(--cream-100)")} />
      )}
    </div>
  );

  const cardStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
    padding: "24px 16px",
    minHeight: 150,
    textAlign: "center",
    borderRadius: 22,
    background: "linear-gradient(180deg,#FFFFFF 0%,#FDFBF7 100%)",
    border: "1px solid var(--line)",
    boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-md)",
    transform: hover ? "translateY(-4px)" : "none",
    transition: "transform .25s ease, box-shadow .25s ease",
    cursor: "pointer",
    overflow: "hidden",
  };

  return (
    <a
      href={url}
      target={external && openInNewTab ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => {
        if (id) track({ type: "LINK_CLICK", linkBlockId: id });
        onNavigate?.();
      }}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* üst ince ışık */}
      <span
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)",
        }}
      />
      {well}
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-heading)", letterSpacing: "-0.01em" }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500, marginTop: 3 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </a>
  );
}
