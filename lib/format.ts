import type { Prisma } from "@prisma/client";

type DecimalLike = Prisma.Decimal | number | string | null | undefined;

/** Fiyatı mağaza formatında (₺) döndürür. */
export function formatPrice(
  amount: DecimalLike,
  currency = "TRY",
): string | null {
  if (amount === null || amount === undefined) return null;
  const n = typeof amount === "number" ? amount : Number(amount.toString());
  if (Number.isNaN(n)) return null;
  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      maximumFractionDigits: n % 1 === 0 ? 0 : 2,
    }).format(n);
  } catch {
    return `${n} ${currency}`;
  }
}
