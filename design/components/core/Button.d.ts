import React from 'react';

/**
 * @startingPoint section="Core" subtitle="Espresso gradient / latte / ghost button" viewport="360x80"
 */
export interface ButtonProps {
  /** Visual style. primary = espresso gradient CTA, secondary = latte fill, ghost = text-only. */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon — a key of ICONS (e.g. 'cart') or a raw SVG inner-path string. */
  icon?: string;
  /** Trailing icon — same format as `icon`. */
  iconRight?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
