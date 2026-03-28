import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Experience from "@/components/Experience";
import { Experience as ExperienceType } from "@/types/portfolio";

const mockExperience: ExperienceType[] = [
  {
    company: "Acme Corp",
    role: "Frontend Developer",
    startDate: "2022-01",
    endDate: null,
    description: "Desarrollé aplicaciones con Angular.",
  },
  {
    company: "Beta SL",
    role: "Junior Developer",
    startDate: "2020-06",
    endDate: "2021-12",
    description: "Mantenimiento de código legacy.",
  },
];

describe("Experience", () => {
  it("renders all company names", () => {
    render(<Experience data={mockExperience} />);
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("Beta SL")).toBeInTheDocument();
  });

  it("renders roles", () => {
    render(<Experience data={mockExperience} />);
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
  });

  it("shows Actualidad for current job", () => {
    render(<Experience data={mockExperience} />);
    expect(screen.getByText(/Actualidad/)).toBeInTheDocument();
  });
});
