import React from 'react';
import { maskStyle, ICONS } from './icons.js';
import { Badge } from './Badge.jsx';

/**
 * Product card — espresso photo well, roast eyebrow, name, tasting notes, price + add.
 */
export function ProductCard({ name, roast, notes, priceLabel, badge, tone = '#6F4A2A', onView, onAdd, style }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
        background: 'var(--surface-card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)',
        transition: 'transform .2s ease, box-shadow .2s ease', ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    >
      <button onClick={onView} style={{
        position: 'relative', border: 'none', cursor: 'pointer', padding: 0, aspectRatio: '1 / 1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.22), ' + tone + ')',
      }}>
        <span style={maskStyle(ICONS.coffee, 58, 'rgba(251,243,231,0.34)')} />
        <span style={{ position: 'absolute', bottom: 10, fontSize: 10, color: 'rgba(251,243,231,0.66)', fontFamily: 'var(--font-mono)' }}>ürün fotoğrafı</span>
        {badge ? <span style={{ position: 'absolute', top: 12, left: 12 }}><Badge variant="onImage">{badge}</Badge></span> : null}
      </button>
      <div style={{ padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>{roast}</div>
        <button onClick={onView} style={{ textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, color: 'var(--text-heading)', marginTop: 5 }}>{name}</button>
        {notes ? <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500, marginTop: 5, lineHeight: 1.4 }}>{notes}</div> : null}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 14 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--color-accent)' }}>{priceLabel}</div>
          <button onClick={onAdd} style={{
            display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 15px', borderRadius: 'var(--radius-sm)',
            background: 'var(--gradient-primary)', border: 'none', cursor: 'pointer', color: 'var(--color-on-primary)',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, boxShadow: 'var(--shadow-cta)',
          }}>
            <span style={maskStyle(ICONS.plus, 16, 'var(--color-on-primary)')} /> Sepete ekle
          </button>
        </div>
      </div>
    </div>
  );
}
