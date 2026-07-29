import type { CSSProperties, InputHTMLAttributes } from "react";
import { maskStyle, iconPath } from "./icons";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "style"> & {
  icon?: string;
  wrapperStyle?: CSSProperties;
  style?: CSSProperties;
};

export function Input({ icon, style, wrapperStyle, ...rest }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 50,
        padding: "0 16px",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-latte)",
        border: "1px solid var(--line)",
        ...wrapperStyle,
      }}
    >
      {icon ? <span style={maskStyle(iconPath(icon), 18, "var(--text-placeholder)")} /> : null}
      <input
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-heading)",
          width: "100%",
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}
