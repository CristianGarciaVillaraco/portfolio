"use client";

import { motion } from "framer-motion";
import { PersonalInfo, SkillGroup, Experience } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";

interface StatsStripProps {
  personal: PersonalInfo;
  experience: Experience[];
  skills: SkillGroup[];
}

function yearsOfExperience(startDate: string): number {
  const [year, month] = startDate.split("-").map(Number);
  const start = new Date(year, month - 1);
  const now = new Date();
  const diff = now.getFullYear() - start.getFullYear();
  return now.getMonth() < start.getMonth() - 1 ? diff - 1 : diff;
}

export default function StatsStrip({
  personal,
  experience,
  skills,
}: StatsStripProps) {
  const { tr } = useTranslation();
  const years = personal.careerStart
    ? yearsOfExperience(personal.careerStart)
    : 0;
  const techCount = skills.reduce((acc, g) => acc + g.items.length, 0);

  const stats = [
    { value: `${years}+`, label: tr.stats.years },
    { value: `${experience.length}`, label: tr.stats.companies },
    { value: `${techCount}+`, label: tr.stats.technologies },
  ];

  return (
    <section className="bg-slate-800/40 border-y border-slate-700/40 py-10 dot-bg">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="text-3xl md:text-4xl font-bold text-sky-400">
              {value}
            </p>
            <p className="text-slate-400 text-sm mt-1">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
