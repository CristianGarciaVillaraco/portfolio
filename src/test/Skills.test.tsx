import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skills from "@/components/Skills";
import { SkillGroup } from "@/types/portfolio";

const mockSkills: SkillGroup[] = [
  { category: "Frontend", items: ["Angular", "TypeScript"] },
  { category: "Backend", items: ["Node.js", "Express"] },
];

describe("Skills", () => {
  it("renders all categories", () => {
    render(<Skills data={mockSkills} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("renders all skill items", () => {
    render(<Skills data={mockSkills} />);
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
  });
});
