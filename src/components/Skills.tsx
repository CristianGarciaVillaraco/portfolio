import { SkillGroup } from "@/types/portfolio";

interface SkillsProps {
  data: SkillGroup[];
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Tecnologías
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((group) => (
            <div key={group.category} className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-sky-400 font-semibold text-lg mb-4">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
