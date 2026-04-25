"use client";

import { useEffect, type ReactNode } from "react";
import { LanguageProvider, useLang } from "@/context/LanguageContext";

function LangSync() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

function ScrollRestore() {
  useEffect(() => {
    if (!window.location.hash) {
      const saved = sessionStorage.getItem("scrollY");
      if (saved) window.scrollTo(0, parseInt(saved, 10));
    }

    const handleScroll = () => {
      sessionStorage.setItem("scrollY", String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LangSync />
      <ScrollRestore />
      {children}
    </LanguageProvider>
  );
}
