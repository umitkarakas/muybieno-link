"use client";

import { useActionState } from "react";
import { addProductAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { inputStyle, errorStyle } from "./styles";

export function AddProductForm() {
  const [state, formAction, pending] = useActionState(addProductAction, {});
  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          name="sourceUrl"
          style={{ ...inputStyle, flex: 1, minWidth: 220 }}
          placeholder="https://muybieno.com/products/…"
          required
        />
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Çekiliyor…" : "Ürün ekle"}
        </Button>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>
        Shopify ürün linkini yapıştırın — başlık, görsel ve fiyat otomatik çekilir.
      </div>
      {state?.error ? <div style={errorStyle}>{state.error}</div> : null}
    </form>
  );
}
