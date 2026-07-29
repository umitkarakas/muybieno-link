The core commerce unit — a coffee product tile. Composes `Badge` and the icon helper.

```jsx
<ProductCard
  name="Etiyopya Yirgacheffe" roast="Açık Kavrum"
  notes="Yasemin · Bergamot · Şeftali" priceLabel="₺285"
  badge="Yeni" tone="#8A5A2E" onView={openPdp} onAdd={add} />
```

Espresso radial photo-well with a centered coffee-cup placeholder + "ürün fotoğrafı" caption (swap for a real `<img>` in production). Roast eyebrow in almond, serif price in almond-600, espresso "Sepete ekle" button. Lifts on hover. Use in 3-up grids (2-up tablet, 1-up phone).
