import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInput } from "./ChatInput";

describe("ChatInput", () => {
  it("renders the textarea and send button", () => {
    render(<ChatInput onSend={jest.fn()} onAbort={jest.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("calls onSend with the trimmed input on button click", async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} onAbort={jest.fn()} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(onSend).toHaveBeenCalledWith("hello");
  });

  it("calls onSend on Enter and clears the input", async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} onAbort={jest.fn()} />);
    await userEvent.type(screen.getByRole("textbox"), "hello{Enter}");
    expect(onSend).toHaveBeenCalledWith("hello");
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("does not call onSend on Shift+Enter", async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} onAbort={jest.fn()} />);
    await userEvent.type(screen.getByRole("textbox"), "hello{Shift>}{Enter}{/Shift}");
    expect(onSend).not.toHaveBeenCalled();
  });

  it("shows Stop button while streaming and calls onAbort", async () => {
    const onAbort = jest.fn();
    render(<ChatInput onSend={jest.fn()} onAbort={onAbort} streaming />);
    await userEvent.click(screen.getByRole("button", { name: /stop/i }));
    expect(onAbort).toHaveBeenCalled();
  });

  it("disables the textarea when disabled", () => {
    render(<ChatInput onSend={jest.fn()} onAbort={jest.fn()} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
