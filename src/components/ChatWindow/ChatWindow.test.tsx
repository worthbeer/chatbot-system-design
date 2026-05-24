import { render, screen } from "@testing-library/react";
import { ChatWindow } from "./ChatWindow";

const noMessages = { messages: [], streaming: false };

describe("ChatWindow", () => {
  it("renders the empty state prompt when there are no messages", () => {
    render(<ChatWindow {...noMessages} />);
    expect(screen.getByText(/ask me anything/i)).toBeInTheDocument();
  });

  it("renders user and assistant messages", () => {
    const messages = [
      { role: "user" as const, content: "Hello" },
      { role: "assistant" as const, content: "Hi there" },
    ];
    render(<ChatWindow messages={messages} streaming={false} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("shows a typing indicator when streaming with the last message from user", () => {
    const messages = [{ role: "user" as const, content: "Hello" }];
    const { container } = render(<ChatWindow messages={messages} streaming={true} />);
    expect(container.querySelector(".animate-bounce")).toBeInTheDocument();
  });
});
