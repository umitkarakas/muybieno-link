import React from 'react';

export interface IconButtonProps {
  /** Icon key from ICONS (e.g. 'search', 'heart') or raw SVG inner-path string. */
  icon: string;
  variant?: 'soft' | 'primary' | 'plain';
  /** Square edge length in px. Default 42. */
  size?: number;
  /** Accessible label. */
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
