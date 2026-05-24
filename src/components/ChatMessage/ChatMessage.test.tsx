import { render, screen } from "@testing-library/react";
import { ChatMessage } from "./ChatMessage";

describe("ChatMessage", () => {
  it("renders without crashing", () => {
    render(<ChatMessage />);
  });

  it("applies custom className", () => {
    const { container } = render(<ChatMessage className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renders children", () => {
    render(<ChatMessage><span>content</span></ChatMessage>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
