import { render, screen } from "@testing-library/react";
import { ChatInput } from "./ChatInput";

describe("ChatInput", () => {
  it("renders without crashing", () => {
    render(<ChatInput />);
  });

  it("applies custom className", () => {
    const { container } = render(<ChatInput className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renders children", () => {
    render(<ChatInput><span>content</span></ChatInput>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
