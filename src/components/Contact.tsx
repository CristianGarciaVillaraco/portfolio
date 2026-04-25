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
            className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            {data.email}
          </a>
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
