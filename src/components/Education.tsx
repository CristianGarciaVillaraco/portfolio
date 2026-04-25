"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const levelBar: Record<string, number> = {
  Nativo: 100, Native: 100,
  C2: 90,
  C1: 78,
  B2: 62,
  Avanzado: 78, Advanced: 78,
  Intermedio: 55, Intermediate: 55,
  Básico: 35, Basic: 35,
  A2: 22,
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const rowVariant: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useTranslation();

  return (
    <section id="education" className="py-20 px-6 bg-slate-900 dot-bg">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2
          className="text-4xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {tr.sections.education}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2 space-y-4"
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {tr.educationItems.map((item, i) => (
              <motion.div
                key={i}
                variants={rowVariant}
                className="bg-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 border border-slate-700"
              >
                <span className="flex-shrink-0 px-3 py-1 bg-sky-500/10 text-sky-400 text-sm font-medium rounded-lg border border-sky-500/20 self-start sm:self-auto">
                  {item.year}
                </span>
                <div>
                  <p className="text-white font-semibold text-sm leading-snug">
                    {item.degree}
                  </p>
                  <p className="text-slate-400 text-sm mt-0.5">
                    {item.institution}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-fit"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sky-400 font-semibold text-lg mb-5">
              {tr.sections.languages}
            </h3>
            <div className="space-y-5">
              {tr.languageItems.map((lang) => {
                const pct = levelBar[lang.level] ?? 40;
                return (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{lang.name}</span>
                      <span className="text-slate-400">{lang.level}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-sky-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${pct}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
