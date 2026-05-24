"use client";

import { useEffect, useRef } from "react";
import { cn } from "@lib/utils";
import { ChatMessage } from "@components/ChatMessage";
import type { Message } from "@t/index";

type ChatWindowProps = {
  messages: Message[];
  streaming: boolean;
  className?: string;
};

export function ChatWindow({ messages, streaming, className }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cn("flex flex-col gap-4 overflow-y-auto px-4 py-6", className)}>
      {messages.length === 0 && (
        <div className="m-auto text-center text-sm text-gray-400">
          <p className="font-medium">Ask me anything about how I was built.</p>
          <p className="mt-2 text-xs">
            Try: &ldquo;Why did you use a server-side route handler?&rdquo; or &ldquo;What would you change at scale?&rdquo;
          </p>
        </div>
      )}
      {messages.map((msg, i) => (
        <ChatMessage key={i} role={msg.role} content={msg.content} />
      ))}
      {streaming && messages.at(-1)?.role === "user" && (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
