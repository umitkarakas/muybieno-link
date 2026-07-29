import Link from "next/link";
import { requireAdmin } from "@/lib/guard";
import { getSiteConfig } from "@/lib/site";
import { AdminNav } from "@/components/admin/AdminNav";
import { logoutAction } from "@/app/admin/actions";
import { maskStyle, ICONS } from "@/components/ui/icons";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const cfg = await getSiteConfig();

  return (
    <div style={{ minHeight: "100dvh", background: "var(--surface)" }}>
      <header
        style={{
          background: "var(--surface-card)",
          borderBottom: "1px solid var(--line)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "14px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "var(--text-heading)",
                  lineHeight: 1,
                }}
              >
                {cfg.brandName}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-muted)", fontWeight: 600, marginTop: 3 }}>
                Yönetim Paneli
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
              <Link
                href="/"
                target="_blank"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-primary)",
                }}
              >
                <span style={maskStyle(ICONS.externalLink, 15, "var(--color-primary)")} />
                Siteyi gör
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--line)",
                    background: "var(--surface-latte)",
                    color: "var(--text-body)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Çıkış
                </button>
              </form>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <AdminNav />
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 20px 64px" }}>
        {children}
      </main>

      <div style={{ display: "none" }}>{session.email}</div>
    </div>
  );
}
