# Chatbot System Design

> A chatbot that can answer questions about how it was built.

Most take-home submissions demonstrate that a feature works. This one also demonstrates *why it was built the way it was* — through the feature itself.

---

## What you're looking at

A streaming AI chatbot built on Next.js 14 App Router. The interesting part: the bot's system prompt includes the full architectural reasoning behind its own implementation. Ask it anything about how it works.

**Try these:**
- *"Why did you use a server-side route handler instead of calling the API from the client?"*
- *"How do you handle a request that's cancelled mid-stream?"*
- *"What would you change to support 10,000 concurrent users?"*
- *"Where does conversation history live, and what are the tradeoffs?"*

The answers aren't canned. The bot reasons from its own architecture.

---

## Quick Start

```bash
cp .env.example .env.local
# add your ANTHROPIC_API_KEY to .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The `/design` route walks through every architectural decision as an interactive document — the same reasoning the bot draws from, rendered as a readable page.

---

## Architecture at a Glance

| Concern | Decision | Why |
|---|---|---|
| API calls | Server-side route handler | Keeps the API key out of the browser |
| Response delivery | Streaming via `ReadableStream` | Token-by-token rendering; a blank 3s wait feels broken |
| Conversation state | Client-side only | No database needed at demo scope — explicit tradeoff |
| In-flight cancellation | `AbortController` | Without it, navigating away leaks the fetch |
| Context window | Last N messages | Simple truncation; summarization is the production path |
| Self-documentation | System prompt + `/design` route | Makes the architecture interactive and reviewable |

Full decision log with alternatives considered: [DECISIONS.md](./DECISIONS.md)

---

## Project Structure

```
src/
  app/
    api/chat/route.ts     ← streaming route handler, API key never leaves server
    design/page.tsx       ← interactive architecture document
    page.tsx              ← the chatbot
  components/
    ChatWindow/           ← scrollable message list
    ChatMessage/          ← user vs. assistant turns, handles streaming partials
    ChatInput/            ← textarea + send, disabled during stream
  hooks/
    useChat.ts            ← conversation state, streaming, abort
```

---

## Stack

Next.js 14 App Router · TypeScript · Tailwind CSS · React 18 · Jest + RTL · ESLint (next/core-web-vitals)

---

## What I'd Do Differently at Scale

This is a demo. The tradeoffs I accepted knowingly:

- **No persistence** — conversation resets on refresh. Production: store threads in a database associated with a user session.
- **No rate limiting** — any request hits the API. Production: token bucket per IP at the edge.
- **No auth** — anyone with the URL can use it. Production: session-based auth before the route handler runs.
- **Truncation over summarization** — dropping old messages loses context. Production: summarize the tail before truncating.

These aren't oversights. They're the right calls for a time-boxed demo. The `/design` page explains each one in full.

---

## CI

GitHub Actions runs lint, type-check, and test in parallel on every push and PR to `main`.

---

## The Meta Point

A system design interview asks you to reason about choices under constraints. This project answers that question through the artifact — you don't have to imagine what I'd say in the room, you can ask the bot directly.
