"use client";

type TrackPayload = {
  type: "PAGE_VIEW" | "LINK_CLICK" | "PRODUCT_CLICK";
  linkBlockId?: string;
  productId?: string;
  path?: string;
};

/** Analytics olayını gönderir; navigasyonu bloklamaz (sendBeacon). */
export function track(payload: TrackPayload): void {
  try {
    const body = JSON.stringify({ ...payload, path: payload.path ?? window.location.pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
    }
  } catch {
    // yut
  }
}
