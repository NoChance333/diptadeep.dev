import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

// Top-level caching to prevent re-evaluating the server-entry dynamic bundle import on subsequent edge hits
let serverEntryPromise: Promise<ServerEntry> | undefined;

function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  // Pass-through immediately for valid content routes or normal page queries
  if (response.status !== 500) return response;
  
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) return response;

  // OPTIMIZATION: Read only the exact byte chunk length required to match the h3 JSON structure 
  // instead of buffering megabytes of potentially heavy layout payloads into node memory.
  const targetBodyMatch = '{"unhandled":true,"message":"HTTPError"}';
  const reader = response.clone().body?.getReader();
  
  if (!reader) return response;

  try {
    const { value } = await reader.read();
    if (!value) return response;

    const decoder = new TextDecoder();
    const chunk = decoder.decode(value, { stream: true }).trim();

    // Check if the initial chunk starts with or matches our target signature
    if (!chunk.startsWith(targetBodyMatch)) {
      return response;
    }
  } catch {
    return response;
  } finally {
    reader.releaseLock();
  }

  // Safely drain and consume our global error capture context to expose stack traces in cloud logs
  const trappedError = consumeLastCapturedError();
  console.error(trappedError ?? new Error("h3 swallowed severe SSR runtime failure"));

  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      // Catches failures that completely break the upstream server-entry handler assembly
      console.error("Catastrophic Infrastructure Failure:", error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};