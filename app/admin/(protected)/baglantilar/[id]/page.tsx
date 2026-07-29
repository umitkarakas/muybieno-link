import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LinkForm } from "@/components/admin/LinkForm";
import { cardStyle } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

export default async function EditLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = await prisma.linkBlock.findUnique({ where: { id } }).catch(() => null);
  if (!link) notFound();

  return (
    <div style={{ maxWidth: 560 }}>
      <Link href="/admin/baglantilar" style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary)" }}>
        ← Bağlantılar
      </Link>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28, margin: "10px 0 18px", color: "var(--text-heading)" }}>
        Bağlantıyı düzenle
      </h1>
      <div style={cardStyle}>
        <LinkForm
          values={{
            id: link.id,
            title: link.title,
            subtitle: link.subtitle,
            url: link.url,
            icon: link.icon,
            imageUrl: link.imageUrl,
            category: link.category,
            sortOrder: link.sortOrder,
            isActive: link.isActive,
            openInNewTab: link.openInNewTab,
          }}
        />
      </div>
    </div>
  );
}
