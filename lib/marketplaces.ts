/**
 * Pazaryeri marka kimlikleri — gerçek logo (imageUrl) yoksa
 * marka renkli monogram kutucuğu için varsayılan.
 * Kullanıcı admin'den imageUrl girerse gerçek logo öne geçer.
 */
export type MarketBrand = {
  label: string;
  gradient: string;
  color: string;
};

const MAP: Record<string, MarketBrand> = {
  trendyol: { label: "ty", gradient: "linear-gradient(135deg,#FB923C 0%,#F27A00 100%)", color: "#F27A00" },
  hepsiburada: { label: "hb", gradient: "linear-gradient(135deg,#FF8A3D 0%,#FF6000 100%)", color: "#FF6000" },
  n11: { label: "n11", gradient: "linear-gradient(135deg,#F5457B 0%,#E11D6B 100%)", color: "#E11D6B" },
  pazarama: { label: "pz", gradient: "linear-gradient(135deg,#8B6CF3 0%,#6C4CF1 100%)", color: "#6C4CF1" },
};

export function marketBrand(title: string): MarketBrand | null {
  const key = title.toLowerCase().replace(/[^a-z0-9]/g, "");
  return MAP[key] ?? null;
}
