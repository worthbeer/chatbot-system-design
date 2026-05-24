"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { cn } from "@lib/utils";

type ChatInputProps = {
  onSend: (text: string) => void;
  onAbort: () => void;
  disabled?: boolean;
  streaming?: boolean;
  className?: string;
};

export function ChatInput({ onSend, onAbort, disabled, streaming, className }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={cn("flex items-end gap-2 border-t border-gray-200 bg-white px-4 py-3", className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder="Ask me about my architecture…"
        className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:bg-white disabled:opacity-50"
      />
      {streaming ? (
        <button
          onClick={onAbort}
          className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
        >
          Stop
        </button>
      ) : (
        <button
          onClick={submit}
          disabled={!value.trim() || disabled}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-40"
        >
          Send
        </button>
      )}
    </div>
  );
}
