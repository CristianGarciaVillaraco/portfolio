"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectPhase, ProjectPhaseTranslation, PhaseStatus } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  projectName: string;
  phases: ProjectPhase[];
  translations?: ProjectPhaseTranslation[];
  onClose: () => void;
}

const phaseColor: Record<PhaseStatus, { dot: string; ring: string; text: string; chip: string }> = {
  done: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    text: "text-emerald-300",
    chip: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  "in-progress": {
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    text: "text-amber-300",
    chip: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
  pending: {
    dot: "bg-slate-500",
    ring: "ring-slate-500/30",
    text: "text-slate-400",
    chip: "border-slate-500/40 bg-slate-500/10 text-slate-400",
  },
  cancelled: {
    dot: "bg-red-500",
    ring: "ring-red-500/30",
    text: "text-red-300",
    chip: "border-red-500/40 bg-red-500/10 text-red-300",
  },
};

export default function ProjectPhasesModal({ projectName, phases, translations, onClose }: Props) {
  const { tr } = useTranslation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const statusLabel = (status: PhaseStatus): string => {
    switch (status) {
      case "done":
        return tr.ui.phaseDone;
      case "in-progress":
        return tr.ui.phaseInProgress;
      case "pending":
        return tr.ui.phasePending;
      case "cancelled":
        return tr.ui.phaseCancelled;
    }
  };

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
        <div className="border-b border-slate-700 shrink-0 flex items-start justify-between px-6 pt-4 pb-3">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">
              {tr.ui.phasesTitle}
            </p>
            <h3 className="text-white font-semibold">{projectName}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label={tr.ui.close}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-scroll overflow-y-auto flex-1 px-6 py-6">
          {(() => {
            const hasUpcoming = phases.some((p) => p.status === "pending");
            return (
              <ol className="relative space-y-6 ml-3">
                <span
                  className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-700"
                  aria-hidden="true"
                />
                {phases.map((phase, i) => {
                  if (phase.status === "pending") return null;
                  const c = phaseColor[phase.status];
                  const isLive = phase.status === "in-progress";
                  const t = translations?.[i];
                  return (
                    <li key={i} className="relative pl-7">
                      <span className="absolute left-0 top-1.5 w-3 h-3" aria-hidden="true">
                        {isLive && (
                          <span
                            className={`absolute inset-0 rounded-full ${c.dot} opacity-60 animate-ping`}
                          />
                        )}
                        <span
                          className={`relative block w-3 h-3 rounded-full ring-4 ${c.dot} ${c.ring}`}
                        />
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{t?.name}</h4>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${c.chip}`}
                        >
                          {statusLabel(phase.status)}
                        </span>
                      </div>
                      {t?.description && (
                        <p className="text-slate-400 text-sm leading-relaxed">{t.description}</p>
                      )}
                    </li>
                  );
                })}
                {hasUpcoming && (
                  <li className="relative pl-7">
                    <span
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full ring-4 bg-slate-600 ring-slate-600/30"
                      aria-hidden="true"
                    />
                    <p className="text-slate-500 text-sm italic">{tr.ui.phasesUpcoming}</p>
                  </li>
                )}
              </ol>
            );
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
}
