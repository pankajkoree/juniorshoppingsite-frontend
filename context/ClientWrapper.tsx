"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <main>{children}</main>
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default ClientWrapper;
