"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Project } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";

interface ProjectsProps {
  data: Project[];
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects({ data }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useTranslation();

  return (
    <section id="projects" className="py-20 px-6 bg-slate-900 dot-bg">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {tr.sections.projects}
        </motion.h2>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {data.map((project) => {
            const proj = tr.projects[project.name];
            return (
              <motion.div
                key={project.name}
                variants={cardVariant}
                whileHover={{
                  y: -6,
                  boxShadow: "0 12px 40px rgba(56, 189, 248, 0.12)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-slate-800 rounded-xl p-6 flex flex-col border border-slate-700 hover:border-sky-500/30 transition-colors"
              >
                <div className="mb-3">
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {project.name}
                  </h3>
                  {proj?.tagline && (
                    <p className="text-sky-400 text-sm mt-0.5">{proj.tagline}</p>
                  )}
                </div>

                {proj?.description && (
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {proj.description}
                  </p>
                )}

                {proj?.highlights && proj.highlights.length > 0 && (
                  <ul className="mb-4 space-y-1">
                    {proj.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-slate-400 text-xs flex items-start gap-1.5"
                      >
                        <span className="text-sky-500 mt-0.5 flex-shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-slate-700 text-sky-300 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
                    >
                      {tr.ui.demo} →
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors"
                    >
                      {tr.ui.code} →
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
