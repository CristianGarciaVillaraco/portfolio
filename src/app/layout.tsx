import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://cristiangarciavillaraco.github.io/portfolio";

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
  description: portfolioData.i18n.es.personal.about,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
    description: portfolioData.i18n.es.personal.about,
    url: baseUrl,
    siteName: portfolioData.personal.name,
    images: [{ url: "/photo.jpg", width: 120, height: 120, alt: portfolioData.personal.name }],
    type: "profile",
    locale: "es_ES",
  },
  twitter: {
    card: "summary",
    title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
    description: portfolioData.i18n.es.personal.about,
    images: ["/photo.jpg"],
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
