"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession, createSession, destroySession, verifyPassword, hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/guard";
import { upsertProductFromUrl, resyncProduct } from "@/lib/shopify";
import type { LinkCategory } from "@prisma/client";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

// ---------------- Auth ----------------
export async function loginAction(_prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "E-posta ve parola gerekli" };

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !user.isActive || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "E-posta veya parola hatalı" };
  }
  await prisma.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await createSession({ sub: user.id, email: user.email, role: user.role });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

// ---------------- Links ----------------
const linkSchema = z.object({
  title: z.string().trim().min(1, "Başlık gerekli").max(120),
  subtitle: z.string().trim().max(160).optional(),
  url: z.string().trim().min(1, "URL gerekli").max(500),
  icon: z.string().trim().max(60).optional(),
  imageUrl: z.string().trim().max(500).optional(),
  category: z.enum(["SALES", "MARKETPLACE", "FEEDBACK", "PRODUCTS", "SOCIAL", "CUSTOM"]),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
  openInNewTab: z.boolean().default(true),
});

export async function saveLinkAction(_prev: unknown, formData: FormData): Promise<{ error?: string; ok?: boolean }> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = linkSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle") || undefined,
    url: formData.get("url"),
    icon: formData.get("icon") || undefined,
    imageUrl: formData.get("imageUrl") || undefined,
    category: formData.get("category"),
    sortOrder: formData.get("sortOrder") || 0,
    isActive: formData.get("isActive") === "on",
    openInNewTab: formData.get("openInNewTab") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Geçersiz veri" };

  const data = {
    ...parsed.data,
    subtitle: parsed.data.subtitle ?? null,
    icon: parsed.data.icon ?? null,
    imageUrl: parsed.data.imageUrl ?? null,
    category: parsed.data.category as LinkCategory,
  };

  if (id) {
    await prisma.linkBlock.update({ where: { id }, data });
  } else {
    await prisma.linkBlock.create({ data });
  }
  revalidatePublic();
  redirect("/admin/baglantilar");
}

export async function deleteLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await prisma.linkBlock.delete({ where: { id } });
  revalidatePublic();
  revalidatePath("/admin/baglantilar");
}

export async function toggleLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const link = await prisma.linkBlock.findUnique({ where: { id } });
  if (link) await prisma.linkBlock.update({ where: { id }, data: { isActive: !link.isActive } });
  revalidatePublic();
  revalidatePath("/admin/baglantilar");
}

export async function moveLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  const current = await prisma.linkBlock.findUnique({ where: { id } });
  if (!current) return;
  const neighbor = await prisma.linkBlock.findFirst({
    where:
      dir === "up"
        ? { sortOrder: { lt: current.sortOrder } }
        : { sortOrder: { gt: current.sortOrder } },
    orderBy: { sortOrder: dir === "up" ? "desc" : "asc" },
  });
  if (neighbor) {
    await prisma.$transaction([
      prisma.linkBlock.update({ where: { id: current.id }, data: { sortOrder: neighbor.sortOrder } }),
      prisma.linkBlock.update({ where: { id: neighbor.id }, data: { sortOrder: current.sortOrder } }),
    ]);
  }
  revalidatePublic();
  revalidatePath("/admin/baglantilar");
}

// ---------------- Products ----------------
export async function addProductAction(_prev: unknown, formData: FormData): Promise<{ error?: string; ok?: boolean }> {
  await requireAdmin();
  const url = String(formData.get("sourceUrl") ?? "").trim();
  if (!url) return { error: "Shopify ürün linki gerekli" };
  try {
    const last = await prisma.product.findFirst({ orderBy: { sortOrder: "desc" } });
    const product = await upsertProductFromUrl(url);
    await prisma.product.update({
      where: { id: product.id },
      data: { sortOrder: (last?.sortOrder ?? 0) + 1 },
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Ürün eklenemedi" };
  }
  revalidatePublic();
  redirect("/admin/urunler");
}

export async function resyncProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  try {
    if (id) await resyncProduct(id);
  } catch {
    // hata product.syncError'a yazıldı
  }
  revalidatePublic();
  revalidatePath("/admin/urunler");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await prisma.product.delete({ where: { id } });
  revalidatePublic();
  revalidatePath("/admin/urunler");
}

export async function toggleProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const p = await prisma.product.findUnique({ where: { id } });
  if (p) await prisma.product.update({ where: { id }, data: { isActive: !p.isActive } });
  revalidatePublic();
  revalidatePath("/admin/urunler");
}

// ---------------- Feedback ----------------
export async function toggleFeedbackHandledAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const f = await prisma.feedback.findUnique({ where: { id } });
  if (f) await prisma.feedback.update({ where: { id }, data: { handled: !f.handled } });
  revalidatePath("/admin/geri-bildirimler");
}

export async function deleteFeedbackAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await prisma.feedback.delete({ where: { id } });
  revalidatePath("/admin/geri-bildirimler");
}

// ---------------- Site config ----------------
export async function saveConfigAction(_prev: unknown, formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  await requireAdmin();
  const brandName = String(formData.get("brandName") ?? "").trim();
  if (!brandName) return { error: "Marka adı gerekli" };
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      brandName,
      tagline: String(formData.get("tagline") ?? "").trim() || null,
      avatarUrl: String(formData.get("avatarUrl") ?? "").trim() || null,
      seoTitle: String(formData.get("seoTitle") ?? "").trim() || null,
      seoDescription: String(formData.get("seoDescription") ?? "").trim() || null,
      footerText: String(formData.get("footerText") ?? "").trim() || null,
    },
    create: { id: 1, brandName },
  });
  revalidatePublic();
  return { ok: true };
}

export async function changePasswordAction(_prev: unknown, formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  const session = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  if (next.length < 8) return { error: "Yeni parola en az 8 karakter olmalı" };
  const user = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  if (!user || !(await verifyPassword(current, user.passwordHash))) {
    return { error: "Mevcut parola hatalı" };
  }
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(next) },
  });
  return { ok: true };
}

export async function noop() {
  await getSession();
}
