"use client";

import type { CSSProperties } from "react";
import { maskStyle, ICONS } from "./icons";
import { track } from "@/lib/track-client";

export type ProductCardProps = {
  id: string;
  title: string;
  priceLabel?: string | null;
  compareLabel?: string | null;
  imageUrl?: string | null;
  sourceUrl: string;
  badge?: string | null;
  available?: boolean;
};

export function ProductCard({
  id,
  title,
  priceLabel,
  compareLabel,
  imageUrl,
  sourceUrl,
  badge,
  available = true,
}: ProductCardProps) {
  const wellStyle: CSSProperties = {
    position: "relative",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.22), #6F4A2A)",
  };

  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track({ type: "PRODUCT_CLICK", productId: id })}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--surface-card)",
        border: "1px solid var(--line)",
        boxShadow: "var(--shadow-md)",
        transition: "transform .2s ease, box-shadow .2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
    >
      <div style={wellStyle}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        ) : (
          <span style={maskStyle(ICONS.coffee, 58, "rgba(251,243,231,0.34)")} />
        )}
        {badge ? (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "rgba(251,243,231,0.92)",
              color: "var(--color-primary)",
              fontSize: 11,
              fontWeight: 800,
              padding: "5px 11px",
              borderRadius: "var(--radius-pill)",
            }}
          >
            {badge}
          </span>
        ) : null}
        {!available ? (
          <span
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(27,28,26,0.82)",
              color: "var(--cream-100)",
              fontSize: 10.5,
              fontWeight: 700,
              padding: "5px 10px",
              borderRadius: "var(--radius-pill)",
            }}
          >
            Tükendi
          </span>
        ) : null}
      </div>
      <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-heading)", lineHeight: 1.3 }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginTop: 12,
          }}
        >
          {priceLabel ? (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                color: "var(--color-accent)",
              }}
            >
              {priceLabel}
            </span>
          ) : null}
          {compareLabel ? (
            <span
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                textDecoration: "line-through",
                fontWeight: 600,
              }}
            >
              {compareLabel}
            </span>
          ) : null}
        </div>
      </div>
    </a>
  );
}
