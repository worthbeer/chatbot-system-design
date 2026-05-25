"use client";

import Link from "next/link";
import { cn } from "@lib/utils";
import { useChat } from "@hooks/useChat";
import { useApiKey } from "@hooks/useApiKey";
import { ApiKeyGate } from "@components/ApiKeyGate";
import { ChatWindow } from "@components/ChatWindow";
import { ChatInput } from "@components/ChatInput";

type ChatInterfaceProps = {
  className?: string;
};

export function ChatInterface({ className }: ChatInterfaceProps) {
  const { apiKey, loading, saveKey, clearKey } = useApiKey();
  const { messages, streaming, error, send, abort } = useChat(apiKey);

  if (loading) return null;

  if (!apiKey) {
    return <ApiKeyGate onKeySubmit={saveKey} />;
  }

  return (
    <div className={cn("flex h-screen flex-col", className)}>
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Chatbot System Design</h1>
          <p className="text-xs text-gray-500">Ask me how I was built</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/design"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            System Design →
          </Link>
          <button
            onClick={clearKey}
            className="rounded-lg px-3 py-1.5 text-xs text-gray-400 transition hover:text-gray-600"
            title="Clear API key"
          >
            Clear key
          </button>
        </div>
      </header>

      <ChatWindow
        messages={messages}
        streaming={streaming}
        className="flex-1"
      />

      {error && (
        <div className="mx-4 mb-2 rounded-lg bg-red-50 px-4 py-2 text-xs text-red-600">
          {error}
          {error.toLowerCase().includes("api key") && (
            <button onClick={clearKey} className="ml-2 underline">
              Re-enter key
            </button>
          )}
        </div>
      )}

      <ChatInput
        onSend={send}
        onAbort={abort}
        disabled={false}
        streaming={streaming}
      />
    </div>
  );
}
