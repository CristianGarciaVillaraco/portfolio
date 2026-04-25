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

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LangSync />
      {children}
    </LanguageProvider>
  );
}
