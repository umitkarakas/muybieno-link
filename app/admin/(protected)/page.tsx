import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cardStyle } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

async function getStats() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  try {
    const [links, products, feedbackNew, viewsToday, clicksToday] = await Promise.all([
      prisma.linkBlock.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.feedback.count({ where: { handled: false } }),
      prisma.analyticsEvent.count({ where: { type: "PAGE_VIEW", createdAt: { gte: startOfDay } } }),
      prisma.analyticsEvent.count({ where: { type: "LINK_CLICK", createdAt: { gte: startOfDay } } }),
    ]);
    return { links, products, feedbackNew, viewsToday, clicksToday };
  } catch {
    return { links: 0, products: 0, feedbackNew: 0, viewsToday: 0, clicksToday: 0 };
  }
}

function Stat({ label, value, href }: { label: string; value: number; href?: string }) {
  const inner = (
    <div style={{ ...cardStyle, padding: 18 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, color: "var(--color-primary)" }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600, marginTop: 2 }}>{label}</div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export default async function AdminDashboard() {
  const s = await getStats();
  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 28,
          margin: "0 0 4px",
          color: "var(--text-heading)",
        }}
      >
        Panel
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: 14, fontWeight: 500, margin: "0 0 20px" }}>
        Genel durum ve hızlı erişim.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 14,
        }}
      >
        <Stat label="Aktif bağlantı" value={s.links} href="/admin/baglantilar" />
        <Stat label="Aktif ürün" value={s.products} href="/admin/urunler" />
        <Stat label="Yeni geri bildirim" value={s.feedbackNew} href="/admin/geri-bildirimler" />
        <Stat label="Bugün ziyaret" value={s.viewsToday} />
        <Stat label="Bugün tıklama" value={s.clicksToday} />
      </div>

      <div style={{ ...cardStyle, marginTop: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: "var(--text-heading)" }}>
          Hızlı işlemler
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <QuickLink href="/admin/baglantilar/yeni" label="+ Bağlantı ekle" />
          <QuickLink href="/admin/urunler" label="+ Ürün ekle" />
          <QuickLink href="/admin/ayarlar" label="Ayarlar" />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: "10px 16px",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-latte)",
        border: "1px solid var(--line)",
        fontSize: 13.5,
        fontWeight: 700,
        color: "var(--text-heading)",
      }}
    >
      {label}
    </Link>
  );
}
