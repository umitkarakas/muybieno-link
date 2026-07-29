import Link from "next/link";
import { LinkForm } from "@/components/admin/LinkForm";
import { cardStyle } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

export default function NewLinkPage() {
  return (
    <div style={{ maxWidth: 560 }}>
      <Link href="/admin/baglantilar" style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary)" }}>
        ← Bağlantılar
      </Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, margin: "10px 0 18px", color: "var(--text-heading)" }}>
        Yeni bağlantı
      </h1>
      <div style={cardStyle}>
        <LinkForm />
      </div>
    </div>
  );
}
