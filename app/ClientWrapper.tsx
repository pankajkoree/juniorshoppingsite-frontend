import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
    </>
  );
};

export default ClientWrapper;
