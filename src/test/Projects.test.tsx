import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Projects from "@/components/Projects";
import { Project } from "@/types/portfolio";

const mockProjects: Project[] = [
  {
    name: "Mi App",
    description: "Una aplicación genial.",
    tech: ["Angular", "Node.js"],
    url: "https://miapp.com",
    repo: "https://github.com/test/mi-app",
  },
  {
    name: "Proyecto Interno",
    description: "Proyecto sin links.",
    tech: ["TypeScript"],
    url: null,
    repo: null,
  },
];

describe("Projects", () => {
  it("renders project names", () => {
    render(<Projects data={mockProjects} />);
    expect(screen.getByText("Mi App")).toBeInTheDocument();
    expect(screen.getByText("Proyecto Interno")).toBeInTheDocument();
  });

  it("renders tech tags", () => {
    render(<Projects data={mockProjects} />);
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders demo link when url is present", () => {
    render(<Projects data={mockProjects} />);
    const demoLink = screen.getByText("Ver demo →");
    expect(demoLink).toHaveAttribute("href", "https://miapp.com");
  });

  it("does not render demo link when url is null", () => {
    render(<Projects data={mockProjects} />);
    const demoLinks = screen.getAllByText("Ver demo →");
    expect(demoLinks).toHaveLength(1);
  });
});
