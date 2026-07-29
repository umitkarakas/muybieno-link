"use client";

import { useActionState } from "react";
import { saveLinkAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { inputStyle, labelStyle, errorStyle } from "./styles";

type LinkValues = {
  id?: string;
  title?: string;
  subtitle?: string | null;
  url?: string;
  icon?: string | null;
  imageUrl?: string | null;
  category?: string;
  sortOrder?: number;
  isActive?: boolean;
  openInNewTab?: boolean;
};

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: "SALES", label: "Satış / Web sitesi" },
  { value: "MARKETPLACE", label: "Pazar yeri" },
  { value: "FEEDBACK", label: "Geri bildirim" },
  { value: "SOCIAL", label: "Sosyal medya" },
  { value: "CUSTOM", label: "Diğer / İletişim" },
  { value: "PRODUCTS", label: "Ürünler (gizli)" },
];

const ICONS_LIST = [
  "globe",
  "whatsapp",
  "phone",
  "messageCircle",
  "bag",
  "store",
  "package",
  "instagram",
  "mapPin",
  "heart",
  "star",
  "coffee",
  "externalLink",
];

export function LinkForm({ values = {} }: { values?: LinkValues }) {
  const [state, formAction, pending] = useActionState(saveLinkAction, {});

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <div>
        <label style={labelStyle}>Başlık</label>
        <input name="title" style={inputStyle} defaultValue={values.title ?? ""} required />
      </div>

      <div>
        <label style={labelStyle}>Alt başlık (opsiyonel)</label>
        <input name="subtitle" style={inputStyle} defaultValue={values.subtitle ?? ""} />
      </div>

      <div>
        <label style={labelStyle}>URL</label>
        <input
          name="url"
          style={inputStyle}
          defaultValue={values.url ?? ""}
          placeholder="https://… veya /geri-bildirim"
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Logo URL (opsiyonel — pazaryeri logoları için)</label>
        <input
          name="imageUrl"
          style={inputStyle}
          defaultValue={values.imageUrl ?? ""}
          placeholder="https://…/logo.png"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Kategori</label>
          <select name="category" style={{ ...inputStyle, padding: "0 10px" }} defaultValue={values.category ?? "CUSTOM"}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>İkon</label>
          <select name="icon" style={{ ...inputStyle, padding: "0 10px" }} defaultValue={values.icon ?? ""}>
            <option value="">(kategori varsayılanı)</option>
            {ICONS_LIST.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "center" }}>
        <div>
          <label style={labelStyle}>Sıra</label>
          <input name="sortOrder" type="number" style={inputStyle} defaultValue={values.sortOrder ?? 0} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 18 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600 }}>
            <input type="checkbox" name="isActive" defaultChecked={values.isActive ?? true} /> Aktif
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600 }}>
            <input type="checkbox" name="openInNewTab" defaultChecked={values.openInNewTab ?? true} /> Yeni sekmede aç
          </label>
        </div>
      </div>

      {state?.error ? <div style={errorStyle}>{state.error}</div> : null}

      <Button type="submit" variant="primary" disabled={pending} style={{ marginTop: 4 }}>
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </Button>
    </form>
  );
}
