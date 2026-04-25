"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "@/hooks/useTranslation";

export default function HowIWork() {
  const { tr } = useTranslation();

  return (
    <section id="how-i-work" className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            {tr.sections.howIWork}
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tr.howIWork.principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-l-2 border-sky-500 pl-5 py-1"
            >
              <h3 className="text-white font-semibold mb-1">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
