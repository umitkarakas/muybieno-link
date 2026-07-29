"use client";

import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { maskStyle, iconPath } from "./icons";

type Variant = "soft" | "primary" | "plain";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> & {
  icon: string;
  variant?: Variant;
  size?: number;
  label?: string;
  style?: CSSProperties;
};

export function IconButton({ icon, variant = "soft", size = 42, label, onClick, style, ...rest }: Props) {
  const variants: Record<Variant, { background: string; border: string; tone: string }> = {
    soft: { background: "var(--surface-latte)", border: "1px solid rgba(255,255,255,0.7)", tone: "var(--color-primary)" },
    primary: { background: "var(--gradient-primary)", border: "none", tone: "var(--color-on-primary)" },
    plain: { background: "rgba(123,79,39,0.10)", border: "none", tone: "var(--color-primary)" },
  };
  const v = variants[variant];
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        background: v.background,
        border: v.border,
        transition: "filter .18s ease, transform .18s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = "brightness(1.05)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.transform = "none";
      }}
      {...rest}
    >
      <span style={maskStyle(iconPath(icon), Math.round(size * 0.45), v.tone)} />
    </button>
  );
}
