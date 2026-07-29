import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { recordEvent } from "@/lib/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  type: z.enum(["PAGE_VIEW", "LINK_CLICK", "PRODUCT_CLICK"]),
  linkBlockId: z.string().optional().nullable(),
  productId: z.string().optional().nullable(),
  path: z.string().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const { type, linkBlockId, productId, path } = parsed.data;

  const url = new URL(req.url);

  try {
    await recordEvent({
      type,
      linkBlockId,
      productId,
      path: path ?? "/",
      headers: req.headers,
      searchParams: url.searchParams,
    });

    // Hızlı sayaçları güncelle (best-effort)
    if (type === "LINK_CLICK" && linkBlockId) {
      await prisma.linkBlock.update({
        where: { id: linkBlockId },
        data: { clickCount: { increment: 1 } },
      }).catch(() => {});
    } else if (type === "PRODUCT_CLICK" && productId) {
      await prisma.product.update({
        where: { id: productId },
        data: { clickCount: { increment: 1 } },
      }).catch(() => {});
    }
  } catch {
    // analytics asla kullanıcı akışını bozmamalı
    return NextResponse.json({ ok: true, recorded: false });
  }

  return NextResponse.json({ ok: true });
}
