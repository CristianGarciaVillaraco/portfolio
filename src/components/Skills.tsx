"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { SkillGroup } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";

interface SkillsProps {
  data: SkillGroup[];
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const pillVariant: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

const pillContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export default function Skills({ data }: SkillsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr } = useTranslation();

  return (
    <section id="skills" className="py-20 px-6 bg-slate-900 dot-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {tr.sections.skills}
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {data.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariant}
              className="bg-slate-800 rounded-xl p-6"
            >
              <h3 className="text-sky-400 font-semibold text-lg mb-4">
                {group.category}
              </h3>
              <motion.ul
                variants={pillContainer}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={pillVariant}
                    className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
