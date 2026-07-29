import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cardStyle } from "@/components/admin/styles";
import { deleteLinkAction, toggleLinkAction, moveLinkAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const CAT_LABEL: Record<string, string> = {
  SALES: "Web",
  MARKETPLACE: "Pazar yeri",
  FEEDBACK: "Geri bildirim",
  SOCIAL: "Sosyal",
  CUSTOM: "İletişim",
  PRODUCTS: "Ürünler",
};

export default async function LinksPage() {
  const links = await prisma.linkBlock
    .findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] })
    .catch(() => []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, margin: 0, color: "var(--text-heading)" }}>
          Bağlantılar
        </h1>
        <Link
          href="/admin/baglantilar/yeni"
          style={{
            marginLeft: "auto",
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            background: "var(--gradient-primary)",
            color: "var(--color-on-primary)",
            fontSize: 13.5,
            fontWeight: 700,
            boxShadow: "var(--shadow-cta)",
          }}
        >
          + Yeni bağlantı
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {links.length === 0 ? (
          <div style={{ ...cardStyle, color: "var(--text-muted)", fontSize: 14 }}>Henüz bağlantı yok.</div>
        ) : (
          links.map((l) => (
            <div key={l.id} style={{ ...cardStyle, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 14.5, color: "var(--text-heading)" }}>{l.title}</span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--surface-latte)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {CAT_LABEL[l.category] ?? l.category}
                  </span>
                  {!l.isActive ? (
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-placeholder)" }}>pasif</span>
                  ) : null}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {l.url} · {l.clickCount} tıklama
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <MiniForm action={moveLinkAction} id={l.id} extra={{ dir: "up" }} label="↑" />
                <MiniForm action={moveLinkAction} id={l.id} extra={{ dir: "down" }} label="↓" />
                <MiniForm action={toggleLinkAction} id={l.id} label={l.isActive ? "Gizle" : "Göster"} />
                <Link
                  href={`/admin/baglantilar/${l.id}`}
                  style={{ padding: "7px 11px", borderRadius: "var(--radius-sm)", background: "var(--surface-latte)", border: "1px solid var(--line)", fontSize: 12.5, fontWeight: 700, color: "var(--text-heading)" }}
                >
                  Düzenle
                </Link>
                <MiniForm action={deleteLinkAction} id={l.id} label="Sil" danger />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function MiniForm({
  action,
  id,
  extra,
  label,
  danger,
}: {
  action: (fd: FormData) => void | Promise<void>;
  id: string;
  extra?: Record<string, string>;
  label: string;
  danger?: boolean;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      {extra
        ? Object.entries(extra).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)
        : null}
      <button
        type="submit"
        style={{
          padding: "7px 10px",
          borderRadius: "var(--radius-sm)",
          background: danger ? "rgba(176,52,31,0.10)" : "var(--surface-latte)",
          border: "1px solid var(--line)",
          fontSize: 12.5,
          fontWeight: 700,
          color: danger ? "#B0341F" : "var(--text-body)",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
        }}
      >
        {label}
      </button>
    </form>
  );
}
