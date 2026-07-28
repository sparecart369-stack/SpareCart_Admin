import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpareKart | Mobile Marketplace for Vehicle Spare Parts",
  description: "SpareKart is a premium mobile marketplace for buying and selling vehicle spare parts with trusted listings, smart discovery, and a seamless mobile experience.",
  keywords: ["spare parts", "vehicle marketplace", "car spare parts", "motorcycle parts", "automotive marketplace"],
  metadataBase: new URL("https://sparekart.com"),
  openGraph: {
    title: "SpareKart | Mobile Marketplace for Vehicle Spare Parts",
    description: "Buy and sell vehicle spare parts easily with SpareKart.",
    url: "https://sparekart.com",
    type: "website",
    images: [{ url: "/favicon.svg", width: 1200, height: 630, alt: "SpareKart logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpareKart | Mobile Marketplace for Vehicle Spare Parts",
    description: "Buy and sell vehicle spare parts easily with SpareKart.",
    images: ["/favicon.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day" data-scroll-behavior="smooth" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
