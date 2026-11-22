import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import TopButton from "@/components/TopButton";

// Self-hosted Latin subsets (Bricolage Grotesque + DM Sans, both variable).
const display = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});

const body = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Aling Tinay Peanut Store — Sulit. Crunchy. Pang-masa.",
  description:
    "Pritong mani, cornick, at lahat ng meryenda ng kanto. Bagong luto, saktong alat, presyong pang-masa. Bisitahin ang Aling Tinay Peanut Store.",
  keywords: ["Aling Tinay", "peanut store", "mani", "cornick", "Filipino snacks", "meryenda"],
  openGraph: {
    title: "Aling Tinay Peanut Store",
    description: "Lahat ng meryenda, nasa Aling Tinay. Sulit. Crunchy. Pang-masa.",
    type: "website",
    locale: "en_PH",
    images: [{ url: "/images/mani-hero-16x9.webp", width: 1392, height: 752, alt: "Salted peanuts on a wooden tray" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F6EBD9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" className={`${display.variable} ${body.variable}`}>
      <body>
        <Loader />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <TopButton />
      </body>
    </html>
  );
}
