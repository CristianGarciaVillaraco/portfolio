"use client";

import { useState, useEffect, useCallback } from "react";
import { Project } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";

interface LightboxProps {
  project: Project;
  initialIdx: number;
  onClose: () => void;
}

export default function Lightbox({ project, initialIdx, onClose }: LightboxProps) {
  const { tr } = useTranslation();
  const [idx, setIdx] = useState(initialIdx);
  const screenshots = project.screenshots!;

  const prev = useCallback(() => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length), [screenshots.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % screenshots.length), [screenshots.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6 sm:p-4"
      onClick={onClose}
    >
      <div className="relative w-[85%] sm:w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-white/50 text-sm">
            {idx + 1} / {screenshots.length}
          </span>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
          >
            {tr.ui.close}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={screenshots[idx]}
            src={screenshots[idx]}
            alt={`${project.name} screenshot ${idx + 1}`}
            className="mx-auto block rounded-xl shadow-2xl border border-slate-700"
            style={{ maxHeight: "65vh", maxWidth: "100%", width: "auto", height: "auto" }}
          />
          {screenshots.length > 1 && (
            <>
              <button onClick={prev} aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button onClick={next} aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {screenshots.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-sky-400" : "bg-slate-600 hover:bg-slate-400"}`}
                aria-label={`Screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
