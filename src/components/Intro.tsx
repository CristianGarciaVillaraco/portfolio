"use client";

import { motion, type Variants } from "framer-motion";
import { PersonalInfo } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";
import { useTypewriter } from "@/hooks/useTypewriter";

interface IntroProps {
  data: PersonalInfo;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function yearsOfExperience(startDate: string): number {
  const [year, month] = startDate.split("-").map(Number);
  const start = new Date(year, month - 1);
  const now = new Date();
  const diff = now.getFullYear() - start.getFullYear();
  return now.getMonth() < start.getMonth() - 1 ? diff - 1 : diff;
}

export default function Intro({ data }: IntroProps) {
  const { tr } = useTranslation();
  const typedSubtitle = useTypewriter(tr.personal.subtitle, 40);
  const years = data.careerStart ? yearsOfExperience(data.careerStart) : null;

  return (
    <section
      id="intro"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-slate-900 to-slate-800 relative"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.div
          variants={item}
          className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {tr.ui.available}
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          {data.name}
        </motion.h1>
        <motion.h2
          variants={item}
          className="text-xl md:text-2xl text-sky-400 font-semibold mb-3"
        >
          {data.title}
        </motion.h2>
        <motion.p
          variants={item}
          className="text-slate-300 text-base md:text-lg mb-8 max-w-xl min-h-[1.75rem]"
        >
          {typedSubtitle}
          <span className="animate-pulse opacity-60">|</span>
        </motion.p>

        <motion.div
          variants={item}
          className="flex gap-4 flex-wrap justify-center"
        >
          <motion.a
            href={`mailto:${data.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-medium transition-colors"
          >
            Contactar
          </motion.a>
          <motion.a
            href="/cv.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            {tr.ui.downloadCV}
          </motion.a>
          <motion.a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 border border-slate-500 hover:border-sky-400 text-slate-300 hover:text-sky-400 rounded-lg font-medium transition-colors"
          >
            GitHub
          </motion.a>
          <motion.a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 border border-slate-500 hover:border-sky-400 text-slate-300 hover:text-sky-400 rounded-lg font-medium transition-colors"
          >
            LinkedIn
          </motion.a>
        </motion.div>

        <motion.p variants={item} className="mt-6 text-slate-400 text-sm">
          {data.location}
          {years !== null && ` · ${years}+ ${tr.ui.yearsExp}`}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
