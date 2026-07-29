import type { CSSProperties } from "react";

export const cardStyle: CSSProperties = {
  background: "var(--surface-card)",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-xl)",
  boxShadow: "var(--shadow-sm)",
  padding: 20,
};

export const inputStyle: CSSProperties = {
  width: "100%",
  height: 46,
  padding: "0 14px",
  borderRadius: "var(--radius-md)",
  background: "var(--surface-latte)",
  border: "1px solid var(--line)",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 500,
  color: "var(--text-heading)",
  outline: "none",
};

export const textareaStyle: CSSProperties = {
  ...inputStyle,
  height: 96,
  padding: "12px 14px",
  resize: "vertical",
};

export const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 12.5,
  fontWeight: 700,
  color: "var(--text-muted)",
  marginBottom: 6,
};

export const errorStyle: CSSProperties = {
  color: "#B0341F",
  fontSize: 13,
  fontWeight: 600,
};

export const okStyle: CSSProperties = {
  color: "var(--color-success)",
  fontSize: 13,
  fontWeight: 600,
};
