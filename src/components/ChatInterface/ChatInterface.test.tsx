import { render, screen } from "@testing-library/react";
import { ChatInterface } from "./ChatInterface";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));


describe("ChatInterface", () => {
  it("renders the header title", () => {
    render(<ChatInterface />);
    expect(screen.getByText("Chatbot System Design")).toBeInTheDocument();
  });

  it("renders a link to the design page", () => {
    render(<ChatInterface />);
    expect(screen.getByRole("link", { name: /system design/i })).toHaveAttribute("href", "/design");
  });

  it("renders the chat input", () => {
    render(<ChatInterface />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
