"use client";

import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const { tr } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 bg-slate-800 dot-bg">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8">{tr.sections.about}</h2>
          <p className="text-slate-300 text-lg leading-relaxed">{tr.personal.about}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
