"use client";

import { useActionState } from "react";
import { saveConfigAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { inputStyle, textareaStyle, labelStyle, errorStyle, okStyle } from "./styles";

type Values = {
  brandName?: string;
  tagline?: string | null;
  avatarUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  footerText?: string | null;
};

export function ConfigForm({ values }: { values: Values }) {
  const [state, formAction, pending] = useActionState(saveConfigAction, {});
  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={labelStyle}>Marka adı</label>
        <input name="brandName" style={inputStyle} defaultValue={values.brandName ?? ""} required />
      </div>
      <div>
        <label style={labelStyle}>Slogan / tagline</label>
        <input name="tagline" style={inputStyle} defaultValue={values.tagline ?? ""} />
      </div>
      <div>
        <label style={labelStyle}>Logo/Avatar URL (boşsa varsayılan)</label>
        <input name="avatarUrl" style={inputStyle} defaultValue={values.avatarUrl ?? ""} placeholder="/brand/muybieno-square.png" />
      </div>
      <div>
        <label style={labelStyle}>SEO başlık</label>
        <input name="seoTitle" style={inputStyle} defaultValue={values.seoTitle ?? ""} />
      </div>
      <div>
        <label style={labelStyle}>SEO açıklama</label>
        <textarea name="seoDescription" style={textareaStyle} defaultValue={values.seoDescription ?? ""} />
      </div>
      <div>
        <label style={labelStyle}>Footer metni</label>
        <input name="footerText" style={inputStyle} defaultValue={values.footerText ?? ""} />
      </div>
      {state?.error ? <div style={errorStyle}>{state.error}</div> : null}
      {state?.ok ? <div style={okStyle}>Kaydedildi.</div> : null}
      <Button type="submit" variant="primary" disabled={pending} style={{ marginTop: 4 }}>
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </Button>
    </form>
  );
}
