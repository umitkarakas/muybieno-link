import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { IconButton } from '../../components/core/IconButton.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Input } from '../../components/core/Input.jsx';
import { ProductCard } from '../../components/core/ProductCard.jsx';
import { maskStyle, ICONS } from '../../components/core/icons.js';

const PRODUCTS = [
  { name: 'Etiyopya Yirgacheffe', roast: 'Açık Kavrum', notes: 'Yasemin · Bergamot · Şeftali', priceLabel: '₺285', badge: 'Yeni', tone: '#8A5A2E' },
  { name: 'Kolombiya Supremo', roast: 'Orta Kavrum', notes: 'Çikolata · Karamel · Fındık', priceLabel: '₺245', tone: '#6F4A2A' },
  { name: 'Kenya AA', roast: 'Açık Kavrum', notes: 'Frenk üzümü · Limon', priceLabel: '₺310', badge: 'Sınırlı', tone: '#9A6A38' },
  { name: 'Brezilya Santos', roast: 'Koyu Kavrum', notes: 'Fındık · Sütlü çikolata', priceLabel: '₺225', badge: 'Çok satan', tone: '#4A2C17' },
  { name: 'Guatemala Antigua', roast: 'Orta Kavrum', notes: 'Kakao · Portakal · Bal', priceLabel: '₺260', tone: '#7A4E28' },
  { name: 'Sumatra Mandheling', roast: 'Koyu Kavrum', notes: 'Kakao · Baharat · Tütün', priceLabel: '₺295', badge: 'Çok satan', tone: '#43291A' },
];

const TRUST = [
  { icon: 'flame', title: 'Taze kavrum', sub: 'Siparişe özel, haftalık' },
  { icon: 'truck', title: 'Hızlı kargo', sub: '250 ₺ üzeri ücretsiz' },
  { icon: 'leaf', title: 'Tek origin', sub: 'Doğrudan üreticiden' },
  { icon: 'shieldCheck', title: 'Güvenli ödeme', sub: 'iyzico altyapısı' },
];

const CATS = [
  { name: 'Çekirdek Kahveler', icon: 'coffee', count: 24 },
  { name: 'Öğütülmüş Filtre', icon: 'leaf', count: 18 },
  { name: 'Türk Kahvesi', icon: 'flame', count: 9 },
  { name: 'French Press', icon: 'coffee', count: 11 },
  { name: 'Demleme Ekipmanları', icon: 'coffee', count: 14 },
  { name: 'Hediye Setleri', icon: 'heart', count: 6 },
];

const eyebrow = { fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-accent)' };
const serifTitle = { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 38, lineHeight: 1.1, margin: '6px 0 0', color: 'var(--text-heading)' };

export function Storefront({ cartCount = 0, onAdd = () => {} }) {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-heading)', background: 'var(--surface)', minHeight: '100vh', fontWeight: 500 }}>

      {/* announcement */}
      <div style={{ background: 'var(--gradient-primary)', color: 'var(--cream-100)', fontSize: 13, fontWeight: 600, textAlign: 'center', padding: '9px 16px' }}>
        Taze kavrum, 48 saatte kapınızda · 250&nbsp;₺ üzeri siparişlerde <span style={{ color: 'var(--cream-200)' }}>ücretsiz kargo</span>
      </div>

      {/* header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 80, background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(22px)', borderBottom: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px', height: 76, display: 'flex', alignItems: 'center', gap: 22 }}>
          <img src="../../assets/muybieno-wordmark.png" alt="Muybieno" style={{ height: 40, width: 'auto', flex: 'none' }} />
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
            {['Kahveler', 'Ekipmanlar', 'Abonelik', 'Hediye', 'Hikayemiz'].map((l) => (
              <span key={l} style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-heading)', padding: '9px 13px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>{l}</span>
            ))}
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Input icon="search" placeholder="Kahve, ekipman ara…" style={{ width: 220, height: 42 }} />
            <IconButton icon="user" variant="soft" label="Hesap" />
            <Button variant="primary" size="sm" icon="cart">{String(cartCount)}</Button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '56px 24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center' }}>
          <div>
            <Badge variant="soft"><span style={maskStyle(ICONS.flame, 13, 'var(--color-accent-deep)')} /> Haftalık taze kavrum</Badge>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 60, lineHeight: 1.04, letterSpacing: '-0.01em', margin: '20px 0 0', color: 'var(--text-heading)' }}>
              Her fincanda<br /><span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>muy bien</span> bir lezzet
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-body)', margin: '20px 0 0', maxWidth: 460, fontWeight: 500 }}>
              Dünyanın seçkin bölgelerinden, ustalıkla kavrulmuş tek origin çekirdekler ve demleme ekipmanları. Siparişinizden hemen önce kavururuz.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
              <Button variant="primary" iconRight="arrowRight">Kahveleri keşfet</Button>
              <Button variant="secondary">Aboneliği incele</Button>
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 36, flexWrap: 'wrap' }}>
              {[['12+', 'Tek origin bölge'], ['48 sa', 'Kavrumdan teslime'], ['9.8K', 'Mutlu kahve sever']].map(([n, l], i) => (
                <div key={i}><div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--color-primary)' }}>{n}</div><div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600 }}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', background: 'radial-gradient(circle at 32% 26%, #B07A45 0%, #6F4A2A 48%, #3A220F 100%)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={maskStyle(ICONS.coffee, 120, 'rgba(251,243,231,0.30)')} />
            <div style={{ position: 'absolute', left: 22, bottom: 20, color: 'var(--cream-100)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600 }}>Etiyopya Yirgacheffe</div>
              <div style={{ fontSize: 12.5, color: 'var(--cream-300)', fontWeight: 600, letterSpacing: '0.04em' }}>AÇIK KAVRUM · TEK ORIGIN</div>
            </div>
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '22px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {TRUST.map((t) => (
            <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '16px 18px', borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <span style={maskStyle(ICONS[t.icon], 20, 'var(--cream-100)')} />
              </div>
              <div><div style={{ fontSize: 14, fontWeight: 700 }}>{t.title}</div><div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500 }}>{t.sub}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* categories */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '44px 24px 20px' }}>
        <div style={{ ...eyebrow }}>Kahveler</div>
        <h2 style={serifTitle}>Damak zevkinize göre seçin</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 22 }}>
          {CATS.map((c) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}>
              <div style={{ width: 54, height: 54, borderRadius: 'var(--radius-md)', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', boxShadow: 'var(--shadow-sm)' }}>
                <span style={maskStyle(ICONS[c.icon], 24, 'var(--cream-100)')} />
              </div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</div><div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500 }}>{c.count} ürün</div></div>
              <span style={maskStyle(ICONS.chevronRight, 18, 'var(--text-placeholder)')} />
            </div>
          ))}
        </div>
      </section>

      {/* featured products */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '44px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 22 }}>
          <div>
            <div style={eyebrow}>Bu hafta tezgâhta</div>
            <h2 style={serifTitle}>Öne çıkan kahveler</h2>
          </div>
          <Button variant="ghost" iconRight="arrowRight">Tümünü gör</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} {...p} onAdd={() => onAdd(p)} />
          ))}
        </div>
      </section>

      {/* subscription banner */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-2xl)', background: 'linear-gradient(125deg,#1B0D0A 0%,#271310 50%,#3E2723 100%)', boxShadow: 'var(--shadow-lg)', padding: '48px 44px' }}>
          <div style={{ maxWidth: 560 }}>
            <Badge variant="soft" style={{ background: 'rgba(251,243,231,0.14)', color: 'var(--cream-200)', border: 'none' }}>Kahve Aboneliği</Badge>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 40, lineHeight: 1.08, color: 'var(--cream-100)', margin: '16px 0 0' }}>Kahveniz hiç bitmesin</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--cream-300)', margin: '14px 0 0', fontWeight: 500 }}>
              Her ay taze kavrulmuş çekirdekler kapınızda. Abonelere özel <strong style={{ color: 'var(--cream-100)' }}>%10 indirim</strong> ve ücretsiz kargo.
            </p>
            <div style={{ marginTop: 26 }}>
              <Button variant="secondary" style={{ background: 'var(--cream-100)', color: 'var(--color-primary)' }}>Aboneliği başlat</Button>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer style={{ marginTop: 20, borderTop: '1px solid var(--line)', background: 'rgba(251,247,241,0.5)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '40px 24px 28px', display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 280 }}>
            <img src="../../assets/muybieno-wordmark.png" alt="Muybieno" style={{ height: 38, width: 'auto' }} />
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: '16px 0 0', fontWeight: 500 }}>Taze kavrulmuş tek origin kahveler ve demleme ekipmanları. Her fincanda muy bien bir lezzet.</p>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500, alignSelf: 'flex-end' }}>© 2026 Muybieno Kahve Grubu</div>
        </div>
      </footer>
    </div>
  );
}
