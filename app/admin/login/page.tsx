import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSiteConfig } from "@/lib/site";
import { LoginForm } from "@/components/admin/LoginForm";
import { cardStyle } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  const cfg = await getSiteConfig();

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto 14px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Image
              src={cfg.avatarUrl ?? "/brand/muybieno-square.png"}
              alt={cfg.brandName}
              width={64}
              height={64}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 26,
              margin: 0,
              color: "var(--text-heading)",
            }}
          >
            {cfg.brandName} Yönetim
          </h1>
          <p style={{ fontSize: 13.5, color: "var(--text-muted)", marginTop: 6, fontWeight: 500 }}>
            Devam etmek için giriş yapın
          </p>
        </div>
        <div style={cardStyle}>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
