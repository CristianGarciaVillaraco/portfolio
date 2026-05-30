"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExperienceLogbook } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";

function parseRichText(text: string): { intro: string; bullets: string[] } {
  const lines = text.split("\n");
  const bullets: string[] = [];
  const introLines: string[] = [];
  for (const line of lines) {
    if (line.startsWith("- ")) bullets.push(line.slice(2));
    else if (line.trim()) introLines.push(line.trim());
  }
  return { intro: introLines.join(" "), bullets };
}

const COLLAPSED_H = 130;

function EntryContent({ text }: { text: string }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (el) setOverflows(el.offsetHeight > COLLAPSED_H);
    setExpanded(false);
  }, [text]);

  const { intro, bullets } = parseRichText(text);

  return (
    <div>
      <div className="relative overflow-hidden" style={{ maxHeight: expanded ? undefined : COLLAPSED_H }}>
        <div ref={innerRef}>
          {intro && <p className="text-slate-400 text-sm leading-relaxed">{intro}</p>}
          {bullets.length > 0 && (
            <ul className={`space-y-1.5 ${intro ? "mt-2" : ""}`}>
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sky-500/50 text-xs mt-[3px] shrink-0">▸</span>
                  <span className="text-slate-400 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {overflows && !expanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-10"
            style={{ background: "linear-gradient(to bottom, transparent, #1e293b)" }}
          />
        )}
      </div>
      {overflows && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 flex items-center justify-center w-full text-slate-600 hover:text-sky-400 transition-colors"
          aria-label={expanded ? "Colapsar" : "Expandir"}
        >
          <svg
            width="16" height="16" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface Props {
  company: string;
  logbook: ExperienceLogbook;
  onClose: () => void;
}

export default function ExperienceLogbookModal({ company, logbook, onClose }: Props) {
  const { tr } = useTranslation();
  const [mode, setMode] = useState<"general" | "technical">("general");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-700 shrink-0">
          <div className="flex items-start justify-between px-6 pt-4 pb-3">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">{tr.ui.logbook}</p>
              <h3 className="text-white font-semibold">{company}</h3>
              {logbook.note && <p className="text-xs text-slate-500 italic mt-0.5">{logbook.note}</p>}
            </div>
            <div className="flex items-center gap-3">
              {/* Desktop pill toggle */}
              <div className="hidden sm:flex rounded-lg overflow-hidden border border-slate-600 text-xs">
                <button
                  onClick={() => setMode("general")}
                  className={`px-3 py-1.5 transition-colors ${mode === "general" ? "bg-sky-500/20 text-sky-300" : "text-slate-400 hover:text-slate-300"}`}
                >
                  {tr.ui.general}
                </button>
                <button
                  onClick={() => setMode("technical")}
                  className={`px-3 py-1.5 transition-colors border-l border-slate-600 ${mode === "technical" ? "bg-sky-500/20 text-sky-300" : "text-slate-400 hover:text-slate-300"}`}
                >
                  {tr.ui.technical}
                </button>
              </div>
              <button onClick={onClose} aria-label={tr.ui.close} className="text-slate-400 hover:text-white transition-colors p-1">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile full-width tabs */}
          <div className="sm:hidden flex border-t border-slate-700/60">
            <button
              onClick={() => setMode("general")}
              className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors ${mode === "general" ? "border-sky-500 text-sky-300" : "border-transparent text-slate-400"}`}
            >
              {tr.ui.general}
            </button>
            <button
              onClick={() => setMode("technical")}
              className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors ${mode === "technical" ? "border-sky-500 text-sky-300" : "border-transparent text-slate-400"}`}
            >
              {tr.ui.technical}
            </button>
          </div>
        </div>

        <div className="modal-scroll overflow-y-auto flex-1 px-6 py-3 space-y-3">
          {logbook.entries?.map((entry, i) => (
            <div key={i} className="border-l-2 border-sky-500/40 pl-4 py-1">
              <h4 className="text-white font-medium text-sm mb-2">{entry.title}</h4>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.12 }}
                >
                  <EntryContent text={mode === "general" ? entry.general : entry.technical} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
