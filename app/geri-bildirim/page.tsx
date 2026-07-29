import Link from "next/link";
import { getSiteConfig } from "@/lib/site";
import { maskStyle, ICONS } from "@/components/ui/icons";
import { FeedbackForm } from "@/components/FeedbackForm";
import { PageView } from "@/components/PageView";

export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const cfg = await getSiteConfig();

  return (
    <main style={{ minHeight: "100dvh", background: "var(--surface)" }}>
      <PageView path="/geri-bildirim" />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 18px 48px" }}>
        <header style={{ padding: "24px 4px 8px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13.5,
              fontWeight: 600,
              color: "var(--color-primary)",
            }}
          >
            <span
              style={{
                ...maskStyle(ICONS.chevronRight, 16, "var(--color-primary)"),
                transform: "rotate(180deg)",
              }}
            />
            {cfg.brandName}
          </Link>

          <div style={{ marginTop: 20 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              Geri Bildirim
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 32,
                lineHeight: 1.08,
                margin: "6px 0 0",
                color: "var(--text-heading)",
              }}
            >
              Görüşlerinizi paylaşın
            </h1>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--text-body)",
                margin: "10px 0 0",
                fontWeight: 500,
              }}
            >
              Öneri, istek ve şikayetleriniz bizim için değerli.
            </p>
          </div>
        </header>

        <div style={{ marginTop: 18 }}>
          <FeedbackForm />
        </div>
      </div>
    </main>
  );
}
