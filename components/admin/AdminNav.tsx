"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS: Array<{ href: string; label: string }> = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/baglantilar", label: "Bağlantılar" },
  { href: "/admin/urunler", label: "Ürünler" },
  { href: "/admin/geri-bildirimler", label: "Geri Bildirim" },
  { href: "/admin/ayarlar", label: "Ayarlar" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav
      style={{
        display: "flex",
        gap: 4,
        overflowX: "auto",
        padding: "2px 0",
      }}
    >
      {ITEMS.map((it) => {
        const active = it.href === "/admin" ? pathname === "/admin" : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            style={{
              flex: "none",
              padding: "9px 15px",
              borderRadius: "var(--radius-pill)",
              fontSize: 13.5,
              fontWeight: 700,
              whiteSpace: "nowrap",
              color: active ? "var(--color-on-primary)" : "var(--text-body)",
              background: active ? "var(--gradient-primary)" : "var(--surface-latte)",
              border: "1px solid var(--line)",
            }}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
