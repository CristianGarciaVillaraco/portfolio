export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  about: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string | null;
  repo: string | null;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: Language[];
}
