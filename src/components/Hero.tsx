import { PersonalInfo } from "@/types/portfolio";

interface HeroProps {
  data: PersonalInfo;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-slate-900 to-slate-800"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        {data.name}
      </h1>
      <h2 className="text-xl md:text-2xl text-sky-400 font-semibold mb-3">
        {data.title}
      </h2>
      <p className="text-slate-300 text-base md:text-lg mb-8 max-w-xl">
        {data.subtitle}
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href={`mailto:${data.email}`}
          className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-medium transition-colors"
        >
          Contactar
        </a>
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-slate-500 hover:border-sky-400 text-slate-300 hover:text-sky-400 rounded-lg font-medium transition-colors"
        >
          GitHub
        </a>
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-slate-500 hover:border-sky-400 text-slate-300 hover:text-sky-400 rounded-lg font-medium transition-colors"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-6 text-slate-400 text-sm">{data.location}</p>
    </section>
  );
}
