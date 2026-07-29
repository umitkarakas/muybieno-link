import { getSiteConfig } from "@/lib/site";
import { cardStyle } from "@/components/admin/styles";
import { ConfigForm } from "@/components/admin/ConfigForm";
import { PasswordForm } from "@/components/admin/PasswordForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const cfg = await getSiteConfig();

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, margin: "0 0 16px", color: "var(--text-heading)" }}>
        Ayarlar
      </h1>

      <div style={{ ...cardStyle, marginBottom: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: "var(--text-heading)" }}>Site bilgileri</div>
        <ConfigForm
          values={{
            brandName: cfg.brandName,
            tagline: cfg.tagline,
            avatarUrl: cfg.avatarUrl,
            seoTitle: cfg.seoTitle,
            seoDescription: cfg.seoDescription,
            footerText: cfg.footerText,
          }}
        />
      </div>

      <div style={cardStyle}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: "var(--text-heading)" }}>Parola değiştir</div>
        <PasswordForm />
      </div>
    </div>
  );
}
