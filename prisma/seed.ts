import { PrismaClient, LinkCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1) Site konfigürasyonu (tekil)
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      brandName: "MuyBieno",
      tagline: "Tüm dijital bağlantılarımız tek çatı altında",
      themeColor: "#111111",
      accentColor: "#F59E0B",
      seoTitle: "MuyBieno — Bağlantılar",
      seoDescription:
        "MuyBieno satış sitesi, pazaryerleri, ürünler ve geri bildirim — hepsi tek yerde.",
      socials: [
        { platform: "instagram", url: "https://instagram.com/muybieno", icon: "instagram" },
      ],
      footerText: `© ${new Date().getFullYear()} MuyBieno`,
    },
  });

  // 2) İlk admin kullanıcısı
  const email = process.env.ADMIN_EMAIL ?? "umit.rk@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin1234";
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Admin", role: "admin" },
  });

  // 3) Başlangıç link kutucukları
  const starter: Array<{
    title: string;
    subtitle?: string;
    url: string;
    icon: string;
    category: LinkCategory;
    sortOrder: number;
  }> = [
    { title: "Satış Sitesi", subtitle: "muybieno.com", url: "https://muybieno.com", icon: "🛍️", category: "SALES", sortOrder: 1 },
    { title: "Ürünler", subtitle: "Tüm ürünlerimiz", url: "/urunler", icon: "📦", category: "PRODUCTS", sortOrder: 2 },
    { title: "Trendyol", subtitle: "Pazaryeri", url: "https://www.trendyol.com", icon: "🟠", category: "MARKETPLACE", sortOrder: 3 },
    { title: "Hepsiburada", subtitle: "Pazaryeri", url: "https://www.hepsiburada.com", icon: "🛒", category: "MARKETPLACE", sortOrder: 4 },
    { title: "Geri Bildirim", subtitle: "Görüşlerinizi paylaşın", url: "#feedback", icon: "💬", category: "FEEDBACK", sortOrder: 5 },
    { title: "Instagram", subtitle: "@muybieno", url: "https://instagram.com/muybieno", icon: "📸", category: "SOCIAL", sortOrder: 6 },
  ];

  for (const s of starter) {
    const existing = await prisma.linkBlock.findFirst({ where: { title: s.title } });
    if (!existing) {
      await prisma.linkBlock.create({ data: s });
    }
  }

  console.log("Seed tamamlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
