import { prisma } from "@/lib/prisma";
import { cardStyle } from "@/components/admin/styles";
import { AddProductForm } from "@/components/admin/AddProductForm";
import { formatPrice } from "@/lib/format";
import {
  deleteProductAction,
  toggleProductAction,
  resyncProductAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product
    .findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] })
    .catch(() => []);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, margin: "0 0 16px", color: "var(--text-heading)" }}>
        Ürünler
      </h1>

      <div style={{ ...cardStyle, marginBottom: 18 }}>
        <AddProductForm />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {products.length === 0 ? (
          <div style={{ ...cardStyle, color: "var(--text-muted)", fontSize: 14 }}>Henüz ürün yok.</div>
        ) : (
          products.map((p) => (
            <div key={p.id} style={{ ...cardStyle, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  flex: "none",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  background: "var(--surface-latte)",
                }}
              >
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : null}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-heading)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>
                  {formatPrice(p.priceAmount, p.priceCurrency) ?? "—"}
                  {!p.isActive ? " · pasif" : ""}
                  {p.syncError ? " · ⚠ senkron hatası" : ""}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <PForm action={resyncProductAction} id={p.id} label="Senkron" />
                <PForm action={toggleProductAction} id={p.id} label={p.isActive ? "Gizle" : "Göster"} />
                <PForm action={deleteProductAction} id={p.id} label="Sil" danger />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PForm({
  action,
  id,
  label,
  danger,
}: {
  action: (fd: FormData) => void | Promise<void>;
  id: string;
  label: string;
  danger?: boolean;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
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
