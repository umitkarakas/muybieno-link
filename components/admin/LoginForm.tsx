"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { inputStyle, labelStyle, errorStyle } from "./styles";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={labelStyle} htmlFor="email">
          E-posta
        </label>
        <input id="email" name="email" type="email" autoComplete="username" style={inputStyle} required />
      </div>
      <div>
        <label style={labelStyle} htmlFor="password">
          Parola
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          style={inputStyle}
          required
        />
      </div>
      {state?.error ? <div style={errorStyle}>{state.error}</div> : null}
      <Button type="submit" variant="primary" disabled={pending} style={{ marginTop: 4 }}>
        {pending ? "Giriş yapılıyor…" : "Giriş yap"}
      </Button>
    </form>
  );
}
