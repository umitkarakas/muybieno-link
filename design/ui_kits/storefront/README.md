# Storefront UI Kit

A high-fidelity recreation of the **Muybieno** coffee storefront homepage, composed entirely from the design system's core components (`Button`, `IconButton`, `Badge`, `Input`, `ProductCard`) plus the `icons.js` helper.

## Files
- `Storefront.jsx` — the homepage screen (announcement bar, glass header, hero, trust strip, category grid, featured-products grid, subscription banner, footer).
- `index.html` — interactive mount: pressing any "Sepete ekle" bumps the header cart count and fires a toast.

## Source
Derived from the working storefront prototype `Muybieno Storefront.dc.html` at the project root, which also includes Collection, Product-detail, and Cart screens. Port those to JSX here as the kit grows.

## Notes
- Product imagery is represented by espresso radial photo-wells with a coffee-cup glyph + "ürün fotoğrafı" caption — swap for real `<img>` in production.
- All color, type, spacing, radius, shadow values come from `styles.css` tokens; no hard-coded brand values.
