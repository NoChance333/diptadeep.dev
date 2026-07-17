import { createStart, createMiddleware } from "@tanstack/react-start";
import { isRedirect, isNotFound } from "@tanstack/react-router";
import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    // FIX: Explicitly bypass internal framework navigation mechanisms.
    // If the thrown exception is an expected framework redirect or a 404 NotFound throw,
    // we must bubble it up immediately so TanStack Start can process it.
    if (isRedirect(error) || isNotFound(error)) {
      throw error;
    }

    // Bypass custom objects that explicitly define their own statusCode parameters
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    // This is now officially a catastrophic unhandled server error
    console.error("Catastrophic Server Exception Captured:", error);
    
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));