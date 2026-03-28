import { PersonalInfo } from "@/types/portfolio";

interface AboutProps {
  data: PersonalInfo;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-20 px-6 bg-slate-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Sobre mí
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed text-center">
          {data.about}
        </p>
      </div>
    </section>
  );
}
