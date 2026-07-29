import React from 'react';

export interface CardProps {
  /** Inner padding in px. Default 20. */
  pad?: number;
  /** Enable lift-on-hover (translateY + deeper shadow). */
  hover?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
