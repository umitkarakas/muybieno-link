import React from 'react';

/**
 * @startingPoint section="Storefront" subtitle="Muybieno homepage — hero, categories, featured coffees" viewport="1280x900"
 */
export interface StorefrontProps {
  /** Cart item count shown in the header pill. */
  cartCount?: number;
  /** Called with the product when "Sepete ekle" is pressed. */
  onAdd?: (product: any) => void;
}

export function Storefront(props: StorefrontProps): JSX.Element;
