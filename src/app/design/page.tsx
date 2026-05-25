import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design — Chatbot System Design",
  description: "Architectural decisions behind the chatbot implementation.",
};

const decisions = [
  {
    id: "ADR-001",
    title: "Server-Side Route Handler",
    decision: "All API calls go through a Next.js server-side route handler at /api/chat. The Anthropic API key lives in server environment variables and never reaches the browser.",
    why: "A client-side API call would expose the key in network requests visible to anyone with DevTools open. Route handlers run on the server — the key is only ever read in a Node.js process, never serialized into a response.",
    tradeoff: "Adds one network hop (browser → Next.js server → Anthropic) instead of two parties (browser → Anthropic). Negligible latency difference; the security boundary is worth it unconditionally.",
  },
  {
    id: "ADR-002",
    title: "Streaming via ReadableStream",
    decision: "The route handler returns a streaming response — not JSON. The client reads chunks with a ReadableStream reader and appends them to the current assistant message as they arrive.",
    why: "A non-streaming response means the UI shows nothing for 2–5 seconds while the full response generates, then updates all at once. That feels broken. Token-by-token streaming gives the appearance of the bot typing in real time, which matches user expectation from every major chat interface.",
    tradeoff: "Streaming is meaningfully harder to implement correctly. You have to handle partial UTF-8 decoding, AbortController signals, and incremental React state updates. The added complexity is worthwhile for the UX difference.",
  },
  {
    id: "ADR-003",
    title: "Client-Side Conversation State",
    decision: "The full message history lives in React state (useState) on the client. Every request sends the entire history to the server. The server is stateless between requests.",
    why: "No database, no session management, no auth — the simplest possible mental model for a demo. The conversation exists as long as the tab is open, which is exactly the right scope for a take-home submission.",
    tradeoff: "Memory grows with conversation length. A long enough conversation will hit the API's context window limit and start returning errors. In production: store threads in a database keyed to a user session, implement pagination or summarization for long threads, add a session TTL.",
  },
  {
    id: "ADR-004",
    title: "AbortController on Every Request",
    decision: "Every fetch is created with an AbortController signal. The controller's abort() method is called when the user clicks Stop or the component unmounts.",
    why: "Without abort, a fetch continues running in the background after the component is gone — consuming API credits and attempting React state updates on an unmounted component. The second issue causes a React warning that can mask real bugs.",
    tradeoff: "The AbortController reference lives in a useRef, not useState, because changing it should not trigger a re-render. This is a subtle correctness requirement — using useState here would cause extra renders on every message send.",
  },
  {
    id: "ADR-005",
    title: "Context Window: Truncation",
    decision: "The full message history is passed to the API on every request. No explicit truncation is applied at the application layer.",
    why: "For a demo with bounded conversation length this is correct — the API will return a clear error if the context limit is exceeded, and a reviewer is unlikely to hit it. Implementing truncation adds complexity that isn't load-bearing at demo scope.",
    tradeoff: "In production, truncation is required. The right approach is not simple truncation (which loses context abruptly) but summarization: periodically replace the oldest N turns with a compressed summary, then continue. This preserves semantic context without hitting token limits.",
  },
  {
    id: "ADR-006",
    title: "Self-Documenting via System Prompt",
    decision: "The bot's system prompt contains a plain-English description of every architectural decision above. This page and the system prompt are kept in sync manually.",
    why: "A system design interview asks you to reason about choices under constraints. This project answers that question through the artifact — a reviewer can ask the bot 'why did you use streaming?' and get a real, specific answer rather than a canned one.",
    tradeoff: "The system prompt and this page can drift if one is updated without the other. A more robust approach would read this page's content at request time and include it in the prompt dynamically. That's the natural next evolution of this pattern.",
  },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-12">

        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-gray-600"
          >
            ← Back to chat
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">System Design</h1>
          <p className="mt-2 text-sm text-gray-500">
            The architectural decisions behind this chatbot — and the reasoning the bot draws from when you ask it about itself.
          </p>
        </div>

        <div className="space-y-10">
          {decisions.map((d) => (
            <section key={d.id} className="border-l-2 border-gray-100 pl-5">
              <div className="mb-1 text-xs font-mono text-gray-400">{d.id}</div>
              <h2 className="text-base font-semibold text-gray-900">{d.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                <span className="font-medium text-gray-900">Decision: </span>
                {d.decision}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                <span className="font-medium text-gray-900">Why: </span>
                {d.why}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                <span className="font-medium text-gray-700">Tradeoff: </span>
                {d.tradeoff}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-gray-50 px-5 py-4 text-xs text-gray-500">
          This page and the bot&rsquo;s system prompt are kept in sync. Ask the bot any of these questions directly — it reasons from the same source.
        </div>

      </div>
    </div>
  );
}
