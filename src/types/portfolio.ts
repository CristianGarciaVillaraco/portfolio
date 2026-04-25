export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  location: string;
  careerStart?: string;
  photo?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  companyUrl?: string | null;
  description: string;
  tech?: string[];
}

export interface Project {
  name: string;
  tech: string[];
  url: string | null;
  repo: string | null;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface ProjectTranslation {
  tagline: string;
  description: string;
  highlights: string[];
}

export interface Translations {
  nav: {
    about: string;
    skills: string;
    experience: string;
    education: string;
    projects: string;
    contact: string;
  };
  sections: {
    about: string;
    skills: string;
    experience: string;
    education: string;
    languages: string;
    projects: string;
    contact: string;
    howIWork: string;
  };
  about: {
    cards: { icon: string; title: string; body: string }[];
  };
  howIWork: {
    principles: { title: string; body: string }[];
  };
  personal: {
    subtitle: string;
    about: string;
  };
  contact: {
    cta: string;
  };
  ui: {
    demo: string;
    code: string;
    current: string;
    downloadCV: string;
    available: string;
    yearsExp: string;
    contactBtn: string;
  };
  stats: {
    years: string;
    companies: string;
    technologies: string;
  };
  educationItems: { institution: string; degree: string; year: string }[];
  languageItems: { name: string; level: string }[];
  projects: Record<string, ProjectTranslation>;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: Language[];
  i18n: { es: Translations; en: Translations };
}
