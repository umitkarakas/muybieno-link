"use client";

import { useEffect } from "react";
import { track } from "@/lib/track-client";

/** Mount'ta bir kez PAGE_VIEW olayı gönderir. */
export function PageView({ path }: { path?: string }) {
  useEffect(() => {
    track({ type: "PAGE_VIEW", path });
    // sadece bir kez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
