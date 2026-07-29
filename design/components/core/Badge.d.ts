import React from 'react';

export interface BadgeProps {
  /** soft = almond pill (default) · solid = filled almond · onImage = cream pill over photos · eyebrow = uppercase overline label. */
  variant?: 'soft' | 'solid' | 'onImage' | 'eyebrow';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
