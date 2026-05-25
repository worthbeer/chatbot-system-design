type SetupInstructionsProps = {
  className?: string;
};

export function SetupInstructions({ className }: SetupInstructionsProps) {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-white px-6 ${className ?? ""}`}>
      <div className="w-full max-w-lg space-y-8">

        <div>
          <h1 className="text-xl font-semibold text-gray-900">Chatbot System Design</h1>
          <p className="mt-2 text-sm text-gray-500">
            A self-documenting chatbot built as a system design exercise. Ask it how it was
            built — the{" "}
            <a href="/design" className="underline hover:text-gray-700">/design</a>{" "}
            route renders the same architectural decisions it reasons about.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            This app is designed to run locally — no key is bundled
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Shipping a server-side API key in a public deployment would expose it to anyone
            who can reach the <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">/api/chat</code> endpoint directly — no UI required. An exposed key
            means exhausted credits, unexpected charges, and potential abuse. The deliberate
            choice here is to accept no key at build time: you provide your own, it stays on
            your machine, and Next.js loads it into the server process at startup.
          </p>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-600">
            <p className="font-medium text-gray-700">Key data flow</p>
            <p className="mt-1 font-mono">
              .env.local → server env → route handler → Anthropic API
            </p>
            <ul className="mt-2 space-y-1 text-gray-500">
              <li>· Key is not included in any HTTP response</li>
              <li>· Key is not reachable from client-side code</li>
              <li>· Key is not logged</li>
              <li>· <code>.env.local</code> is in <code>.gitignore</code> — it will not be committed</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-800">Setup</h2>
          <ol className="mt-4 space-y-5 text-sm">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                1
              </span>
              <div>
                <p className="font-medium text-gray-900">Get a key</p>
                <p className="mt-0.5 text-gray-500">
                  <a
                    href="https://console.anthropic.com/settings/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-700"
                  >
                    console.anthropic.com/settings/keys
                  </a>
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                2
              </span>
              <div>
                <p className="font-medium text-gray-900">
                  Create{" "}
                  <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">.env.local</code>{" "}
                  in the project root
                </p>
                <pre className="mt-2 rounded-lg bg-gray-900 px-4 py-3 text-xs text-gray-100">ANTHROPIC_API_KEY=sk-ant-...</pre>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                3
              </span>
              <div>
                <p className="font-medium text-gray-900">Start (or restart) the dev server</p>
                <pre className="mt-2 rounded-lg bg-gray-900 px-4 py-3 text-xs text-gray-100">npm run dev</pre>
              </div>
            </li>
          </ol>
        </div>

      </div>
    </div>
  );
}
