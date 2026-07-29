import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Ürünler artık ana sayfadaki sekmede — deep-link uyumluluğu için yönlendir
export default function ProductsRedirect() {
  redirect("/?tab=urunler");
}
