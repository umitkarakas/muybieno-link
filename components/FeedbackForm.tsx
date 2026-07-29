"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { maskStyle, ICONS } from "./ui/icons";

export function FeedbackForm() {
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 2) {
      setError("Lütfen mesajınızı yazın.");
      return;
    }
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || null,
          contact: contact || null,
          rating: rating || null,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Gönderilemedi");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 50,
    padding: "0 16px",
    borderRadius: "var(--radius-md)",
    background: "var(--surface-latte)",
    border: "1px solid var(--line)",
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--text-heading)",
    outline: "none",
  };

  if (status === "done") {
    return (
      <div
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-md)",
          padding: 28,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            margin: "0 auto 14px",
            borderRadius: "var(--radius-pill)",
            background: "var(--gradient-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={maskStyle(ICONS.check, 28, "var(--cream-100)")} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 24,
            margin: 0,
            color: "var(--text-heading)",
          }}
        >
          Teşekkürler!
        </h2>
        <p style={{ color: "var(--text-body)", fontSize: 14.5, marginTop: 8, fontWeight: 500 }}>
          Geri bildiriminiz bize ulaştı.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-md)",
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* puan */}
      <div>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-muted)" }}>
          Puanınız
        </label>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} yıldız`}
              onClick={() => setRating(n)}
              style={{
                width: 42,
                height: 42,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--line)",
                background: n <= rating ? "var(--gradient-accent)" : "var(--surface-latte)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={maskStyle(
                  ICONS.star,
                  20,
                  n <= rating ? "var(--cream-100)" : "var(--text-placeholder)",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <input
        style={inputStyle}
        placeholder="Adınız (opsiyonel)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={120}
      />
      <input
        style={inputStyle}
        placeholder="E-posta / telefon (opsiyonel)"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        maxLength={160}
      />
      <textarea
        style={{ ...inputStyle, height: 120, padding: "12px 16px", resize: "vertical" }}
        placeholder="Mesajınız…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={2000}
      />

      {error ? (
        <div style={{ color: "#B0341F", fontSize: 13, fontWeight: 600 }}>{error}</div>
      ) : null}

      <Button type="submit" variant="primary" disabled={status === "sending"} iconRight="arrowRight">
        {status === "sending" ? "Gönderiliyor…" : "Gönder"}
      </Button>
    </form>
  );
}
