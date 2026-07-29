Primary call-to-action button — use for "Sepete ekle", "Kahveleri keşfet", checkout, and any commit action.

```jsx
<Button variant="primary" icon="cart" onClick={addToCart}>Sepete ekle</Button>
<Button variant="secondary">Aboneliği incele</Button>
<Button variant="ghost" iconRight="arrowRight">Tümünü gör</Button>
```

Variants: `primary` (espresso gradient, cream text, lifts on hover) · `secondary` (warm latte fill) · `ghost` (text-only, espresso). Sizes `sm | md | lg`. Icons are keys of `ICONS` from `icons.js`. Primary is the only high-emphasis style — one per view.
