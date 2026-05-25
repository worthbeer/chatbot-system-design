"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@lib/utils";

type ApiKeyGateProps = {
  onKeySubmit: (key: string) => void;
  className?: string;
};

export function ApiKeyGate({ onKeySubmit, className }: ApiKeyGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter your API key.");
      return;
    }
    if (!trimmed.startsWith("sk-ant-")) {
      setError("That doesn't look like an Anthropic API key. It should start with sk-ant-");
      return;
    }
    setError("");
    onKeySubmit(trimmed);
  };

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-white px-6", className)}>
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900">This app uses the Anthropic API</h1>
        <p className="mt-2 text-sm text-gray-500">
          You&rsquo;ll need an API key to start chatting. Your key is stored only in your browser and sent directly to Anthropic&rsquo;s API — it never touches a database.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(""); }}
            placeholder="sk-ant-..."
            autoFocus
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono outline-none transition focus:border-blue-400 focus:bg-white"
          />
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Start chatting →
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400">
          Don&rsquo;t have a key?{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            Get one at console.anthropic.com
          </a>
        </p>
      </div>
    </div>
  );
}
