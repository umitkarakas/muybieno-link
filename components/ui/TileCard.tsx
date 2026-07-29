"use client";

import type { CSSProperties } from "react";
import { maskStyle, ICONS } from "./icons";
import { track } from "@/lib/track-client";

export type TileTone = "espresso" | "almond";

export type TileCardProps = {
  id?: string;
  title: string;
  subtitle?: string | null;
  url: string;
  icon: string;
  tone?: TileTone;
  openInNewTab?: boolean;
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
  onNavigate,
}: TileCardProps) {
  const external = /^https?:\/\//.test(url);
  const gradient = tone === "almond" ? "var(--gradient-accent)" : "var(--gradient-primary)";

  const wellStyle: CSSProperties = {
    width: 56,
    height: 56,
    borderRadius: "var(--radius-md)",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-sm)",
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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "24px 16px",
        minHeight: 132,
        textAlign: "center",
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
      <div style={wellStyle}>
        <span style={maskStyle(ICONS[icon] ?? ICONS.externalLink, 24, "var(--cream-100)")} />
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-heading)" }}>{title}</div>
        {subtitle ? (
          <div style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500, marginTop: 3 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </a>
  );
}
