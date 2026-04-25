import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import TerminalEgg from "@/components/TerminalEgg";

const triggerKonami = () => {
  const KONAMI = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];
  KONAMI.forEach((key) => fireEvent.keyDown(window, { key }));
};

describe("TerminalEgg", () => {
  it("does not render terminal by default", () => {
    render(<TerminalEgg />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("shows terminal after Konami code", () => {
    render(<TerminalEgg />);
    triggerKonami();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows help output when help is typed", async () => {
    const user = userEvent.setup();
    render(<TerminalEgg />);
    triggerKonami();
    const input = screen.getByRole("textbox");
    await user.type(input, "help{Enter}");
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });

  it("closes terminal on exit command", async () => {
    const user = userEvent.setup();
    render(<TerminalEgg />);
    triggerKonami();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    await user.type(input, "exit{Enter}");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
