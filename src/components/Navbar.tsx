"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

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

  const sectionIds = links.map((l) => l.href.slice(1));
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sky-400 font-bold text-lg">CG</span>
        <ul className="hidden md:flex gap-6">
          {links.map((l) => {
            const isActive = activeSection === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-sky-400"
                      : "text-slate-300 hover:text-sky-400"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-400 rounded-full"
                    />
                  )}
                </a>
              </li>
            );
          })}
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
            aria-expanded={open}
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
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="md:hidden px-6 pb-4 pt-2 space-y-3 bg-slate-900 border-t border-slate-800"
          >
            {links.map((l) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block text-sm font-medium transition-colors ${
                      isActive ? "text-sky-400" : "text-slate-300 hover:text-sky-400"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
