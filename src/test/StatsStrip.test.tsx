import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsStrip from "@/components/StatsStrip";
import { PersonalInfo, Experience, SkillGroup } from "@/types/portfolio";

const mockPersonal: PersonalInfo = {
  name: "Test",
  title: "Dev",
  email: "test@example.com",
  github: "https://github.com/test",
  linkedin: "https://linkedin.com/in/test",
  location: "España",
  careerStart: "2018-04",
};

const mockExperience: Experience[] = [
  {
    company: "A",
    role: "Dev",
    startDate: "2018-04",
    endDate: null,
    description: "",
  },
  {
    company: "B",
    role: "Dev",
    startDate: "2020-01",
    endDate: "2022-01",
    description: "",
  },
];

const mockSkills: SkillGroup[] = [
  { category: "Frontend", items: ["Angular", "TypeScript", "JavaScript"] },
  { category: "Backend", items: ["Node.js", "Express"] },
];

describe("StatsStrip", () => {
  it("renders company count", () => {
    render(
      <StatsStrip
        personal={mockPersonal}
        experience={mockExperience}
        skills={mockSkills}
      />
    );
    expect(screen.getByText("empresas")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders technology count with plus suffix", () => {
    render(
      <StatsStrip
        personal={mockPersonal}
        experience={mockExperience}
        skills={mockSkills}
      />
    );
    expect(screen.getByText("tecnologías")).toBeInTheDocument();
    expect(screen.getByText("5+")).toBeInTheDocument();
  });

  it("renders years with plus suffix", () => {
    render(
      <StatsStrip
        personal={mockPersonal}
        experience={mockExperience}
        skills={mockSkills}
      />
    );
    expect(screen.getByText("años de experiencia")).toBeInTheDocument();
  });
});
