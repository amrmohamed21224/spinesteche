import { QueryClientConfig } from "@tanstack/react-query";

/**
 * Standard configuration options for TanStack Query.
 * Optimizes network load for corporate sites (long-lived state cache).
 */
export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes cache validity
      gcTime: 1000 * 60 * 60 * 24, // 24 hours garbage collection time
      retry: (failureCount, error: unknown) => {
        // Do not retry on 404 or client errors
        const status = (error as Record<string, number> | null)?.status;
        if (status && status >= 400 && status < 500) {
          return false;
        }
        return failureCount < 3; // retry 3 times for other failures
      },
      refetchOnWindowFocus: false, // Avoid refetching when user toggles browser tab
      refetchOnReconnect: "always",
    },
  },
};
