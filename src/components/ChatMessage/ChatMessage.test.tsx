import { render, screen } from "@testing-library/react";
import { ChatMessage } from "./ChatMessage";

describe("ChatMessage", () => {
  it("renders the message content", () => {
    render(<ChatMessage role="user" content="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("aligns user messages to the right", () => {
    const { container } = render(<ChatMessage role="user" content="Hi" />);
    expect(container.firstChild).toHaveClass("justify-end");
  });

  it("aligns assistant messages to the left", () => {
    const { container } = render(<ChatMessage role="assistant" content="Hi" />);
    expect(container.firstChild).toHaveClass("justify-start");
  });

  it("applies user bubble styles", () => {
    render(<ChatMessage role="user" content="Hi" />);
    expect(screen.getByText("Hi")).toHaveClass("bg-blue-600");
  });

  it("applies assistant bubble styles", () => {
    render(<ChatMessage role="assistant" content="Hi" />);
    expect(screen.getByText("Hi")).toHaveClass("bg-gray-100");
  });
});
