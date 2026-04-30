import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cristiangarciavillaraco.github.io/portfolio";

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
  description: portfolioData.i18n.es.personal.about,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
    description: portfolioData.i18n.es.personal.about,
    url: baseUrl,
    siteName: portfolioData.personal.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: portfolioData.personal.name }],
    type: "profile",
    locale: "es_ES",
  },
  twitter: {
    card: "summary",
    title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
    description: portfolioData.i18n.es.personal.about,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
