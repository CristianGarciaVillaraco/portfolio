"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Experience as ExperienceType } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";

interface ExperienceProps {
  data: ExperienceType[];
}

function formatDate(dateStr: string | null, locale: string, currentLabel: string): string {
  if (!dateStr) return currentLabel;
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString(locale, { year: "numeric", month: "short" });
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Experience({ data }: ExperienceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr, lang } = useTranslation();
  const locale = lang === "en" ? "en-US" : "es-ES";

  return (
    <section id="experience" className="py-20 px-6 bg-slate-800 dot-bg">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {tr.sections.experience}
        </motion.h2>

        <div ref={ref} className="relative">
          <motion.div
            className="absolute left-0 top-1 bottom-1 w-0.5 bg-sky-500 origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-8"
          >
            {data.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariant}
                className="pl-6 relative"
              >
                <motion.div
                  className="absolute -left-[9px] top-1 w-4 h-4 bg-sky-500 rounded-full ring-2 ring-slate-800"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.5 + index * 0.2,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                  }}
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-white font-semibold text-lg">{job.role}</h3>
                  <span className="text-slate-400 text-sm">
                    {formatDate(job.startDate, locale, tr.ui.current)} — {formatDate(job.endDate, locale, tr.ui.current)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sky-400 font-medium hover:text-sky-300 transition-colors"
                    >
                      {job.company}
                      <svg
                        className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <p className="text-sky-400 font-medium">{job.company}</p>
                  )}
                  {job.location && (
                    <span className="text-slate-500 text-sm">· {job.location}</span>
                  )}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {job.description}
                </p>
                {job.tech && job.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-slate-700 text-sky-300 rounded text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
