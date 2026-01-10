"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default ClientWrapper;
