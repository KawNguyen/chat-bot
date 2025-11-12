import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} position="left" />} */}
    </QueryClientProvider>
  );
}
