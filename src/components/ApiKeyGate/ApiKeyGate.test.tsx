import { render, screen } from "@testing-library/react";
import { ApiKeyGate } from "./ApiKeyGate";

describe("ApiKeyGate", () => {
  it("renders without crashing", () => {
    render(<ApiKeyGate />);
  });

  it("applies custom className", () => {
    const { container } = render(<ApiKeyGate className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renders children", () => {
    render(<ApiKeyGate><span>content</span></ApiKeyGate>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
