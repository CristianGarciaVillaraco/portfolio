"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import portfolioData from "@/data/portfolio.json";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

type OutputLine = { text: string; prompt?: boolean };

function yearsFrom(start: string): number {
  const [year, month] = start.split("-").map(Number);
  const s = new Date(year, month - 1);
  const now = new Date();
  const diff = now.getFullYear() - s.getFullYear();
  return now.getMonth() < s.getMonth() - 1 ? diff - 1 : diff;
}

function runCommand(cmd: string): OutputLine[] | null {
  const trimmed = cmd.trim().toLowerCase();
  const { personal, skills, projects } = portfolioData;

  switch (trimmed) {
    case "help":
      return [
        { text: "Available commands:" },
        { text: "  whoami    – who am I" },
        { text: "  skills    – tech stack" },
        { text: "  projects  – featured projects" },
        { text: "  contact   – get in touch" },
        { text: "  clear     – clear screen" },
        { text: "  exit      – close terminal" },
      ];
    case "whoami": {
      const years = personal.careerStart ? yearsFrom(personal.careerStart) : null;
      return [
        { text: personal.name },
        { text: personal.title },
        { text: personal.location },
        ...(years !== null ? [{ text: `${years}+ years of experience` }] : []),
      ];
    }
    case "skills":
      return skills.flatMap((g) => [
        { text: `[${g.category}]` },
        { text: `  ${g.items.join(", ")}` },
      ]);
    case "projects":
      return projects.flatMap((p) => [
        { text: `● ${p.name}` },
        { text: `  ${p.tech.slice(0, 3).join(", ")}` },
        ...(p.repo ? [{ text: `  ${p.repo}` }] : []),
      ]);
    case "contact":
      return [
        { text: `email:    ${personal.email}` },
        { text: `github:   ${personal.github}` },
        { text: `linkedin: ${personal.linkedin}` },
      ];
    case "clear":
      return null;
    case "exit":
      return null;
    case "":
      return [];
    default:
      return [{ text: `command not found: ${trimmed}. Type 'help' for help.` }];
  }
}

export default function TerminalEgg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
      if (seqRef.current.join() === KONAMI.join()) {
        setOpen(true);
        setLines([{ text: "Type 'help' for available commands." }]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const submit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;

    setCmdHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    if (cmd.toLowerCase() === "exit") {
      setOpen(false);
      setInput("");
      return;
    }

    if (cmd.toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const output = runCommand(cmd) ?? [];
    setLines((prev) => [...prev, { text: `> ${cmd}`, prompt: true }, ...output]);
    setInput("");
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="w-full max-w-2xl mx-4 bg-slate-950 border border-slate-700 rounded-xl shadow-2xl font-mono text-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
          <button
            onClick={() => setOpen(false)}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            aria-label="Close terminal"
          />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-slate-400 text-xs">cristian@portfolio:~</span>
        </div>
        <div
          ref={outputRef}
          className="h-72 overflow-y-auto p-4 space-y-0.5"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={line.prompt ? "text-white" : "text-green-400"}
            >
              {line.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-700">
          <span className="text-green-500 shrink-0 select-none">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-green-400"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
