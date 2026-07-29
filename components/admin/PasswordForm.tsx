"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { inputStyle, labelStyle, errorStyle, okStyle } from "./styles";

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, {});
  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={labelStyle}>Mevcut parola</label>
        <input name="current" type="password" autoComplete="current-password" style={inputStyle} required />
      </div>
      <div>
        <label style={labelStyle}>Yeni parola (en az 8 karakter)</label>
        <input name="next" type="password" autoComplete="new-password" style={inputStyle} required minLength={8} />
      </div>
      {state?.error ? <div style={errorStyle}>{state.error}</div> : null}
      {state?.ok ? <div style={okStyle}>Parola güncellendi.</div> : null}
      <Button type="submit" variant="secondary" disabled={pending} style={{ marginTop: 4 }}>
        {pending ? "Güncelleniyor…" : "Parolayı değiştir"}
      </Button>
    </form>
  );
}
