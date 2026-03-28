import { Project } from "@/types/portfolio";

interface ProjectsProps {
  data: Project[];
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Proyectos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((project) => (
            <div
              key={project.name}
              className="bg-slate-800 rounded-xl p-6 flex flex-col"
            >
              <h3 className="text-white font-semibold text-lg mb-2">
                {project.name}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
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
                    Ver demo →
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors"
                  >
                    Código →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
