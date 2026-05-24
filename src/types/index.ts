export type WithClassName = {
  className?: string;
};

export type ChatRole = "user" | "assistant";

export type Message = {
  role: ChatRole;
  content: string;
};

export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
