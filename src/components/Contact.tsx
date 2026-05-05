"use client";

import { PersonalInfo } from "@/types/portfolio";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "@/hooks/useTranslation";

interface ContactProps {
  data: PersonalInfo;
}

export default function Contact({ data }: ContactProps) {
  const { tr } = useTranslation();

  return (
    <section id="contact" className="py-20 px-6 bg-slate-800 dot-bg">
      <div className="max-w-xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-white mb-4">{tr.sections.contact}</h2>
          <p className="text-slate-300 mb-8">{tr.contact.cta}</p>
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar email
          </a>
          <p className="mt-6 text-slate-500 text-sm">
            O contáctame por{" "}
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors underline underline-offset-2"
            >
              LinkedIn
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
