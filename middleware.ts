import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Çift proxy (Cloudflare + OpenLiteSpeed) bazı forwarded header'ları
 * virgülle çoğaltıyor ("host, host"). Next.js Server Action origin
 * doğrulaması bunu `new URL()` ile parse edip "Invalid URL" fırlatıyor.
 * Burada bu header'ları ilk değere indirger, sonra devam ederiz.
 */
const DEDUPE = ["origin", "x-forwarded-host", "x-forwarded-proto", "host", "referer"];

export function middleware(req: NextRequest) {
  let changed = false;
  const headers = new Headers(req.headers);
  for (const key of DEDUPE) {
    const val = headers.get(key);
    if (val && val.includes(",")) {
      headers.set(key, val.split(",")[0].trim());
      changed = true;
    }
  }
  if (!changed) return NextResponse.next();
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
