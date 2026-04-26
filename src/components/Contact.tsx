"use client";

import { useState } from "react";
import { PersonalInfo } from "@/types/portfolio";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "@/hooks/useTranslation";

interface ContactProps {
  data: PersonalInfo;
}

export default function Contact({ data }: ContactProps) {
  const { tr } = useTranslation();
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="py-20 px-6 bg-slate-800 dot-bg">
      <div className="max-w-xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-white mb-4">{tr.sections.contact}</h2>
          <p className="text-slate-300 mb-8">{tr.contact.cta}</p>
          <div className="flex items-center justify-center gap-2">
            <a
              href={`mailto:${data.email}`}
              className="px-4 sm:px-8 py-3 sm:py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-semibold text-sm sm:text-lg transition-colors"
            >
              {data.email}
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copiar email"
              className="p-3 sm:p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              {copied ? (
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
