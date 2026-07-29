import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "@/lib/auth";

/** Admin sayfaları/aksiyonları için oturum zorunluluğu. Yoksa login'e yönlendirir. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
