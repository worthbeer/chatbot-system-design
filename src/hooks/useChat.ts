import { useState, useCallback, useRef } from "react";
import type { Message } from "@t/index";

type UseChatReturn = {
  messages: Message[];
  streaming: boolean;
  error: string | null;
  send: (text: string) => Promise<void>;
  abort: () => void;
};

export function useChat(apiKey?: string | null): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setError(null);

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setStreaming(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, ...(apiKey && { apiKey }) }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `Request failed with status ${res.status}`);
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: "assistant", content: assistant },
        ]);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [messages, streaming]);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
  }, []);

  return { messages, streaming, error, send, abort };
}
