import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "@/components/Hero";
import { PersonalInfo } from "@/types/portfolio";

const mockPersonal: PersonalInfo = {
  name: "Cristian Garcia",
  title: "Full Stack Developer",
  subtitle: "JS · TS · Angular · Node.js",
  email: "test@example.com",
  github: "https://github.com/test",
  linkedin: "https://linkedin.com/in/test",
  location: "España",
  about: "About text",
};

describe("Hero", () => {
  it("renders the name", () => {
    render(<Hero data={mockPersonal} />);
    expect(screen.getByText("Cristian Garcia")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Hero data={mockPersonal} />);
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
  });

  it("renders contact link", () => {
    render(<Hero data={mockPersonal} />);
    const link = screen.getByText("Contactar");
    expect(link).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders GitHub link", () => {
    render(<Hero data={mockPersonal} />);
    const link = screen.getByText("GitHub");
    expect(link).toHaveAttribute("href", "https://github.com/test");
  });

  it("renders location", () => {
    render(<Hero data={mockPersonal} />);
    expect(screen.getByText("España")).toBeInTheDocument();
  });
});
