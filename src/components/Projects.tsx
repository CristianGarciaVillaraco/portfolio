"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Project } from "@/types/portfolio";
import { useTranslation } from "@/hooks/useTranslation";
import { getTechUrl } from "@/lib/techLinks";
import Lightbox from "./Lightbox";

const PROJECTS_LIMIT = 6;
const TAGS_VISIBLE = 5;

interface ProjectsProps {
  data: Project[];
}

function MobileTagFilter({
  tags,
  selected,
  onChange,
  allLabel,
  searchPlaceholder,
  clearLabel,
}: {
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
  allLabel: string;
  searchPlaceholder: string;
  clearLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const visible = tags.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (tag: string) => {
    onChange(
      selected.includes(tag)
        ? selected.filter((t) => t !== tag)
        : [...selected, tag]
    );
  };

  const triggerLabel =
    selected.length === 0
      ? allLabel
      : selected.length === 1
      ? selected[0]
      : `${selected[0]} +${selected.length - 1}`;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-slate-800 border rounded-lg text-sm transition-colors ${
          open ? "border-sky-500/50" : "border-slate-700"
        }`}
      >
        <span className={selected.length > 0 ? "text-sky-300 font-medium" : "text-slate-400"}>
          {triggerLabel}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-20 overflow-hidden">
          <div className="p-2 border-b border-slate-700">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-700 rounded text-slate-300 text-sm placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-52 overflow-y-auto">
            {visible.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">—</p>
            ) : (
              visible.map((tag) => {
                const isSelected = selected.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggle(tag)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                      isSelected ? "bg-sky-500/10" : "hover:bg-slate-700/60"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                        isSelected ? "bg-sky-500 border-sky-500" : "border-slate-500"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none" stroke="currentColor" strokeWidth="3"
                          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className={isSelected ? "text-sky-300" : "text-slate-300"}>{tag}</span>
                  </button>
                );
              })
            )}
          </div>

          {selected.length > 0 && (
            <div className="p-2 border-t border-slate-700">
              <button
                onClick={() => { onChange([]); setOpen(false); }}
                className="w-full text-center text-xs text-slate-400 hover:text-sky-400 transition-colors py-1"
              >
                {clearLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Projects({ data }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { tr, lang } = useTranslation();

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<{ project: Project; idx: number } | null>(null);

  const allTags = Array.from(new Set(data.flatMap((p) => p.tags ?? [])));
  const hiddenTags = allTags.slice(TAGS_VISIBLE);
  const activeTagIsHidden = activeTags.some((t) => hiddenTags.includes(t));
  const showAllTags = tagsExpanded || activeTagIsHidden;
  const visibleTags = showAllTags ? allTags : allTags.slice(0, TAGS_VISIBLE);
  const hiddenCount = allTags.length - TAGS_VISIBLE;

  const filtered =
    activeTags.length === 0
      ? data
      : data.filter((p) => p.tags?.some((t) => activeTags.includes(t)));
  const visibleProjects = projectsExpanded ? filtered : filtered.slice(0, PROJECTS_LIMIT);
  const hasMore = filtered.length > PROJECTS_LIMIT;

  useEffect(() => { setProjectsExpanded(false); }, [activeTags]);

  const searchPlaceholder = lang === "en" ? "Search…" : "Buscar…";
  const clearLabel = lang === "en" ? "Clear filters" : "Limpiar filtros";

  return (
    <>
      <section id="projects" className="py-20 px-6 bg-slate-900 dot-bg">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {tr.sections.projects}
          </motion.h2>

          {/* Filter */}
          {allTags.length > 0 && (
            <motion.div
              ref={ref}
              className="relative mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {/* Mobile: custom multi-select */}
              <div className="sm:hidden">
                <MobileTagFilter
                  tags={allTags}
                  selected={activeTags}
                  onChange={setActiveTags}
                  allLabel={tr.ui.allProjects}
                  searchPlaceholder={searchPlaceholder}
                  clearLabel={clearLabel}
                />
              </div>

              {/* Desktop: pill filters */}
              <div className="hidden sm:flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveTags([])}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeTags.length === 0
                      ? "bg-sky-500 text-white"
                      : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tr.ui.allProjects}
                </button>

                {visibleTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTags(activeTags.includes(tag) ? [] : [tag])}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeTags.includes(tag)
                        ? "bg-sky-500 text-white"
                        : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}

                {hiddenCount > 0 && !showAllTags && (
                  <button
                    onClick={() => setTagsExpanded(true)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    +{hiddenCount}
                  </button>
                )}
                {showAllTags && !activeTagIsHidden && (
                  <button
                    onClick={() => setTagsExpanded(false)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    −
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {data.length === 0 && (
            <p className="text-slate-400 text-center mt-4">{tr.ui.comingSoon}</p>
          )}

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => {
                const proj = tr.projects?.[project.name];
                const hasScreenshots = project.screenshots && project.screenshots.length > 0;
                return (
                  <motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(56, 189, 248, 0.12)" }}
                    className="bg-slate-800 rounded-xl p-6 flex flex-col border border-slate-700 hover:border-sky-500/30 transition-colors"
                  >
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white font-semibold text-lg leading-tight">
                          {project.name}
                        </h3>
                        {project.status === "in-development" && (
                          <span className="shrink-0 text-xs px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-400 bg-amber-500/10">
                            {tr.ui.inDevelopment}
                          </span>
                        )}
                      </div>
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
                          <li key={h} className="text-slate-400 text-xs flex items-start gap-1.5">
                            <span className="text-sky-500 mt-0.5 flex-shrink-0">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      {project.tech.map((t) => {
                        const url = getTechUrl(t);
                        return url ? (
                          <a key={t} href={url} target="_blank" rel="noopener noreferrer"
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-sky-300 rounded text-xs transition-colors">
                            {t}
                          </a>
                        ) : (
                          <span key={t} className="px-2 py-1 bg-slate-700 text-sky-300 rounded text-xs">{t}</span>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      {hasScreenshots && (
                        <button
                          onClick={() => setLightbox({ project, idx: 0 })}
                          aria-label={`Ver ${project.screenshots!.length} capturas`}
                          className="hidden sm:block relative text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-slate-600 text-white text-[10px] font-bold leading-4 text-center">
                            {project.screenshots!.length}
                          </span>
                        </button>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label="Repositorio GitHub"
                          className="text-slate-400 hover:text-slate-200 transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label="Ver demo"
                          className="text-slate-400 hover:text-sky-400 transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Show more / less projects */}
          <AnimatePresence>
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex justify-center mt-10"
              >
                <button
                  onClick={() => setProjectsExpanded((v) => !v)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-sky-500/50 text-sm font-medium transition-colors"
                >
                  {projectsExpanded ? tr.ui.showLess : tr.ui.showMore}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${projectsExpanded ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          project={lightbox.project}
          initialIdx={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
