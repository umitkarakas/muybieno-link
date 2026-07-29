import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import type { EventType } from "@prisma/client";

export function parseUserAgent(ua: string | null | undefined): {
  device: string;
  browser: string;
} {
  const s = (ua ?? "").toLowerCase();
  let device = "desktop";
  if (/ipad|tablet|playbook|silk/.test(s)) device = "tablet";
  else if (/mobi|iphone|android.*mobile|phone/.test(s)) device = "mobile";

  let browser = "other";
  if (/edg\//.test(s)) browser = "edge";
  else if (/chrome|crios/.test(s)) browser = "chrome";
  else if (/firefox|fxios/.test(s)) browser = "firefox";
  else if (/safari/.test(s)) browser = "safari";

  return { device, browser };
}

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "mb-default-salt";
  return createHash("sha256").update(salt + ip).digest("hex").slice(0, 32);
}

/** Cloudflare/proxy başlıklarından gerçek istemci IP'sini çıkarır */
export function clientIpFromHeaders(headers: Headers): string | null {
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export type RecordEventInput = {
  type: EventType;
  linkBlockId?: string | null;
  productId?: string | null;
  path?: string;
  headers: Headers;
  searchParams?: URLSearchParams;
};

export async function recordEvent(input: RecordEventInput): Promise<void> {
  const { headers, searchParams } = input;
  const ua = headers.get("user-agent");
  const { device, browser } = parseUserAgent(ua);

  await prisma.analyticsEvent.create({
    data: {
      type: input.type,
      linkBlockId: input.linkBlockId ?? null,
      productId: input.productId ?? null,
      path: input.path ?? "/",
      referrer: headers.get("referer") ?? null,
      utmSource: searchParams?.get("utm_source") ?? null,
      utmMedium: searchParams?.get("utm_medium") ?? null,
      utmCampaign: searchParams?.get("utm_campaign") ?? null,
      country: headers.get("cf-ipcountry") ?? null,
      device,
      browser,
      ipHash: hashIp(clientIpFromHeaders(headers)),
      userAgent: ua?.slice(0, 500) ?? null,
    },
  });
}
