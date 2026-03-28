import { Experience as ExperienceType } from "@/types/portfolio";

interface ExperienceProps {
  data: ExperienceType[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Actualidad";
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("es-ES", { year: "numeric", month: "short" });
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 px-6 bg-slate-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Experiencia
        </h2>
        <div className="space-y-8">
          {data.map((job, index) => (
            <div
              key={index}
              className="border-l-2 border-sky-500 pl-6 relative"
            >
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-sky-500 rounded-full" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-white font-semibold text-lg">{job.role}</h3>
                <span className="text-slate-400 text-sm">
                  {formatDate(job.startDate)} — {formatDate(job.endDate)}
                </span>
              </div>
              <p className="text-sky-400 font-medium mb-2">{job.company}</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
