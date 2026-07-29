import React from 'react';

/**
 * @startingPoint section="Commerce" subtitle="Coffee product card with photo well, notes, price" viewport="320x420"
 */
export interface ProductCardProps {
  name: string;
  /** Roast eyebrow, e.g. "Açık Kavrum". */
  roast?: string;
  /** Tasting notes line, e.g. "Yasemin · Bergamot · Şeftali". */
  notes?: string;
  /** Formatted price, e.g. "₺285". */
  priceLabel: string;
  /** Optional flag shown over the photo (e.g. "Yeni", "Çok satan"). */
  badge?: string;
  /** Photo-well base color (espresso tone) behind the placeholder. */
  tone?: string;
  onView?: () => void;
  onAdd?: () => void;
  style?: React.CSSProperties;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
