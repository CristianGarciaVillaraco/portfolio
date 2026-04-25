"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { tr, lang, setLang } = useTranslation();

  const links = [
    { href: "#about", label: tr.nav.about },
    { href: "#skills", label: tr.nav.skills },
    { href: "#experience", label: tr.nav.experience },
    { href: "#education", label: tr.nav.education },
    { href: "#projects", label: tr.nav.projects },
    { href: "#contact", label: tr.nav.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sky-400 font-bold text-lg">CG</span>
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-slate-300 hover:text-sky-400 transition-colors text-sm font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang("es")}
              className={`text-sm font-medium transition-colors ${lang === "es" ? "text-sky-400" : "text-slate-400 hover:text-slate-200"}`}
            >
              ES
            </button>
            <span className="text-slate-600 text-xs select-none">|</span>
            <button
              onClick={() => setLang("en")}
              className={`text-sm font-medium transition-colors ${lang === "en" ? "text-sky-400" : "text-slate-400 hover:text-slate-200"}`}
            >
              EN
            </button>
          </div>
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <ul className="md:hidden px-6 pb-4 space-y-3 bg-slate-900">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-slate-300 hover:text-sky-400 transition-colors text-sm font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
