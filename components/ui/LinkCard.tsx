"use client";

import type { CSSProperties } from "react";
import { maskStyle, ICONS } from "./icons";
import { track } from "@/lib/track-client";

export type LinkCategory = "SALES" | "MARKETPLACE" | "FEEDBACK" | "PRODUCTS" | "SOCIAL" | "CUSTOM";

const CATEGORY_META: Record<
  LinkCategory,
  { icon: string; gradient: string; eyebrow: string }
> = {
  SALES: { icon: "store", gradient: "var(--gradient-primary)", eyebrow: "Mağaza" },
  MARKETPLACE: { icon: "bag", gradient: "var(--gradient-accent)", eyebrow: "Pazaryeri" },
  FEEDBACK: { icon: "messageCircle", gradient: "var(--gradient-accent)", eyebrow: "Geri bildirim" },
  PRODUCTS: { icon: "package", gradient: "var(--gradient-primary)", eyebrow: "Ürünler" },
  SOCIAL: { icon: "instagram", gradient: "var(--gradient-accent)", eyebrow: "Sosyal" },
  CUSTOM: { icon: "externalLink", gradient: "var(--gradient-accent)", eyebrow: "Bağlantı" },
};

/** İçerik emoji mi (basit sezgisel) */
function isEmoji(s: string): boolean {
  return /\p{Extended_Pictographic}/u.test(s);
}

export type LinkCardProps = {
  id: string;
  title: string;
  subtitle?: string | null;
  url: string;
  icon?: string | null;
  category: LinkCategory;
  openInNewTab?: boolean;
};

export function LinkCard({ id, title, subtitle, url, icon, category, openInNewTab = true }: LinkCardProps) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.CUSTOM;
  const external = /^https?:\/\//.test(url);
  const useEmoji = icon && isEmoji(icon);

  const wellStyle: CSSProperties = {
    width: 54,
    height: 54,
    borderRadius: "var(--radius-md)",
    background: meta.gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    boxShadow: "var(--shadow-sm)",
    fontSize: 26,
  };

  return (
    <a
      href={url}
      target={external && openInNewTab ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => track({ type: "LINK_CLICK", linkBlockId: id })}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 22,
        minHeight: 150,
        borderRadius: "var(--radius-xl)",
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={wellStyle}>
          {useEmoji ? (
            <span>{icon}</span>
          ) : (
            <span style={maskStyle(ICONS[icon ?? ""] ?? ICONS[meta.icon], 24, "var(--cream-100)")} />
          )}
        </div>
        <span style={maskStyle(ICONS.arrowRight, 18, "var(--text-placeholder)")} />
      </div>
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          {meta.eyebrow}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-heading)", marginTop: 4 }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, marginTop: 3 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </a>
  );
}
