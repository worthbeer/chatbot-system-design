import { render, screen } from "@testing-library/react";
import { ChatInterface } from "./ChatInterface";

describe("ChatInterface", () => {
  it("renders without crashing", () => {
    render(<ChatInterface />);
  });

  it("applies custom className", () => {
    const { container } = render(<ChatInterface className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renders children", () => {
    render(<ChatInterface><span>content</span></ChatInterface>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
