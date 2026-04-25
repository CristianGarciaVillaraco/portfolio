import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Intro from "@/components/Intro";
import { PersonalInfo } from "@/types/portfolio";

const mockPersonal: PersonalInfo = {
  name: "Cristian Garcia",
  title: "Full Stack Developer",
  email: "test@example.com",
  github: "https://github.com/test",
  linkedin: "https://linkedin.com/in/test",
  location: "España",
};

describe("Intro", () => {
  it("renders the name", () => {
    render(<Intro data={mockPersonal} />);
    expect(screen.getByText("Cristian Garcia")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Intro data={mockPersonal} />);
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
  });

  it("renders contact link", () => {
    render(<Intro data={mockPersonal} />);
    const link = screen.getByRole("link", { name: /Contactar/i });
    expect(link).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders GitHub link", () => {
    render(<Intro data={mockPersonal} />);
    const link = screen.getByRole("link", { name: /GitHub/i });
    expect(link).toHaveAttribute("href", "https://github.com/test");
  });

  it("renders location", () => {
    render(<Intro data={mockPersonal} />);
    expect(screen.getByText(/España/)).toBeInTheDocument();
  });

  it("renders CV download link", () => {
    render(<Intro data={mockPersonal} />);
    const link = screen.getByRole("link", { name: /Descargar CV/i });
    expect(link).toHaveAttribute("href", "/cv.pdf");
  });

  it("renders availability badge", () => {
    render(<Intro data={mockPersonal} />);
    expect(
      screen.getByText("Disponible para nuevas oportunidades")
    ).toBeInTheDocument();
  });
});
