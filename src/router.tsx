import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Single stable instances declared outside the call scope to prevent cache culling
let clientInstance: QueryClient | null = null;
let routerInstance: ReturnType<typeof createRouter> | null = null;

export const getRouter = () => {
  // Ensure QueryClient is instantiated exactly once across the client session lifetime
  if (!clientInstance) {
    clientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          // Prevent aggressive component focus refetching on mobile viewports
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60 * 5, // 5 minutes standard baseline stale threshold
        },
      },
    });
  }

  // Ensure Router is initialized as a singleton instance
  if (!routerInstance) {
    routerInstance = createRouter({
      routeTree,
      context: { queryClient: clientInstance },
      scrollRestoration: true,
      defaultPreload: "intent", // Only preload routes when intent is explicitly clear (hover/touch)
      defaultPreloadStaleTime: 30000, // 30s cache validity window for preloaded layout segments
    });
  }

  return routerInstance;
};

// Typesafe expansion for TanStack Router context validation parameters
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}