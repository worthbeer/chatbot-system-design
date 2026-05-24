import { render, screen } from "@testing-library/react";
import { ChatWindow } from "./ChatWindow";

describe("ChatWindow", () => {
  it("renders without crashing", () => {
    render(<ChatWindow />);
  });

  it("applies custom className", () => {
    const { container } = render(<ChatWindow className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renders children", () => {
    render(<ChatWindow><span>content</span></ChatWindow>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
