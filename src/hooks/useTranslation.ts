"use client";

import { useLang } from "@/context/LanguageContext";
import portfolioData from "@/data/portfolio.json";
import { Translations } from "@/types/portfolio";

export function useTranslation() {
  const { lang, setLang } = useLang();
  const tr = portfolioData.i18n[lang] as unknown as Translations;
  return { tr, lang, setLang };
}
