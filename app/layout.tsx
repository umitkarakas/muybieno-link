import type { Metadata } from "next";
import { Libre_Caslon_Text, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/site";

const display = Libre_Caslon_Text({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const cfg = await getSiteConfig();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://link.muybieno.com";
  return {
    metadataBase: new URL(base),
    title: cfg.seoTitle ?? cfg.brandName,
    description: cfg.seoDescription ?? cfg.tagline ?? undefined,
    openGraph: {
      title: cfg.seoTitle ?? cfg.brandName,
      description: cfg.seoDescription ?? cfg.tagline ?? undefined,
      type: "website",
      url: base,
      images: ["/brand/muybieno-square.png"],
    },
    icons: { icon: "/brand/muybieno-square.png" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
