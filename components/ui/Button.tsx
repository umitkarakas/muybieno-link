"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { maskStyle, iconPath } from "./icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> & {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  children,
  disabled,
  onClick,
  style,
  ...rest
}: Props) {
  const sizes: Record<Size, { height: number; padding: string; font: number }> = {
    sm: { height: 40, padding: "0 15px", font: 13 },
    md: { height: 52, padding: "0 26px", font: 15 },
    lg: { height: 54, padding: "0 28px", font: 15.5 },
  };
  const s = sizes[size];

  const variants: Record<Variant, CSSProperties> = {
    primary: {
      background: "var(--gradient-primary)",
      color: "var(--color-on-primary)",
      border: "none",
      boxShadow: "var(--shadow-cta)",
    },
    secondary: {
      background: "var(--surface-latte)",
      color: "var(--text-heading)",
      border: "1px solid rgba(255,255,255,0.8)",
      boxShadow: "var(--shadow-sm)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "none",
      boxShadow: "none",
    },
  };
  const v = variants[variant];
  const tone = variant === "primary" ? "var(--color-on-primary)" : "var(--color-primary)";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        height: s.height,
        padding: s.padding,
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform .18s ease, filter .18s ease",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant !== "ghost") {
          e.currentTarget.style.filter = "brightness(1.06)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.transform = "none";
      }}
      {...rest}
    >
      {icon ? <span style={maskStyle(iconPath(icon), s.font + 3, tone)} /> : null}
      {children}
      {iconRight ? <span style={maskStyle(iconPath(iconRight), s.font + 3, tone)} /> : null}
    </button>
  );
}
