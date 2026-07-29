import { prisma } from "@/lib/prisma";
import { cardStyle } from "@/components/admin/styles";
import { toggleFeedbackHandledAction, deleteFeedbackAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function formatDate(d: Date): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(d);
  } catch {
    return d.toISOString();
  }
}

export default async function FeedbackAdminPage() {
  const items = await prisma.feedback
    .findMany({ orderBy: [{ handled: "asc" }, { createdAt: "desc" }] })
    .catch(() => []);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, margin: "0 0 16px", color: "var(--text-heading)" }}>
        Geri Bildirimler
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.length === 0 ? (
          <div style={{ ...cardStyle, color: "var(--text-muted)", fontSize: 14 }}>Henüz geri bildirim yok.</div>
        ) : (
          items.map((f) => (
            <div key={f.id} style={{ ...cardStyle, opacity: f.handled ? 0.65 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                {f.rating ? (
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-accent)" }}>
                    {"★".repeat(f.rating)}
                    <span style={{ color: "var(--text-disabled)" }}>{"★".repeat(5 - f.rating)}</span>
                  </span>
                ) : null}
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-heading)" }}>
                  {f.name || "Anonim"}
                </span>
                {f.contact ? (
                  <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>· {f.contact}</span>
                ) : null}
                <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>
                  {formatDate(f.createdAt)}
                </span>
              </div>
              <div style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                {f.message}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <FForm action={toggleFeedbackHandledAction} id={f.id} label={f.handled ? "Yeniden aç" : "İşlendi"} />
                <FForm action={deleteFeedbackAction} id={f.id} label="Sil" danger />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FForm({
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
          padding: "7px 12px",
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
