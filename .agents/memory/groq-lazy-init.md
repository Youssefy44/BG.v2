---
name: Groq Lazy Init
description: The API server Groq client must be lazily initialized or the server crashes at startup when GROQ_API_KEY is absent.
---

## Rule
Never initialize `new Groq(...)` at module level in `artifacts/api-server/src/routes/assistant.ts`. Always use a lazy `getGroqClient()` pattern.

## Correct pattern
```ts
let _groq: Groq | null = null;
function getGroqClient(): Groq {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY environment variable is not set.");
  }
  if (!_groq) {
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _groq;
}
// Inside the route handler:
const groq = getGroqClient();
```

**Why:** `groq-sdk` throws `GroqError` immediately at construction if `apiKey` is empty/missing. Module-level init runs at import time, so the entire server process crashes on startup when `GROQ_API_KEY` is not set — even if no AI requests are being made. Lazy init defers the error to the actual request, allowing the server to boot and serve all other routes normally.

**How to apply:** Any time `assistant.ts` is edited (including by merged tasks), verify the Groq client is NOT instantiated at module scope. If it is, restore the lazy pattern above.
