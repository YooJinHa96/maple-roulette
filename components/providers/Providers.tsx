"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
const queryClient = new QueryClient();

function InnerProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerProvider>{children}</InnerProvider>
    </QueryClientProvider>
  );
}
