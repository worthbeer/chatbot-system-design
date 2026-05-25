import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApiKeyGate } from "./ApiKeyGate";

describe("ApiKeyGate", () => {
  it("renders the heading and input", () => {
    render(<ApiKeyGate onKeySubmit={jest.fn()} />);
    expect(screen.getByText(/anthropic api/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/sk-ant/i)).toBeInTheDocument();
  });

  it("calls onKeySubmit with a valid key", async () => {
    const onKeySubmit = jest.fn();
    render(<ApiKeyGate onKeySubmit={onKeySubmit} />);
    await userEvent.type(screen.getByPlaceholderText(/sk-ant/i), "sk-ant-valid-key");
    await userEvent.click(screen.getByRole("button", { name: /start chatting/i }));
    expect(onKeySubmit).toHaveBeenCalledWith("sk-ant-valid-key");
  });

  it("shows an error for a key that does not start with sk-ant-", async () => {
    render(<ApiKeyGate onKeySubmit={jest.fn()} />);
    await userEvent.type(screen.getByPlaceholderText(/sk-ant/i), "invalid-key");
    await userEvent.click(screen.getByRole("button", { name: /start chatting/i }));
    expect(screen.getByText(/doesn't look like an Anthropic/i)).toBeInTheDocument();
  });

  it("shows an error for an empty submission", async () => {
    render(<ApiKeyGate onKeySubmit={jest.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: /start chatting/i }));
    expect(screen.getByText(/please enter/i)).toBeInTheDocument();
  });
});
