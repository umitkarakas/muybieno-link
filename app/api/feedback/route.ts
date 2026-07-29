import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().max(120).optional().nullable(),
  contact: z.string().trim().max(160).optional().nullable(),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  message: z.string().trim().min(2, "Mesaj çok kısa").max(2000),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz veri" },
      { status: 400 },
    );
  }

  try {
    await prisma.feedback.create({
      data: {
        name: parsed.data.name || null,
        contact: parsed.data.contact || null,
        rating: parsed.data.rating ?? null,
        message: parsed.data.message,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Kaydedilemedi" }, { status: 500 });
  }
}
