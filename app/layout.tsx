import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "junior shopping site",
  description: "an ecommerce platform for the retailers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
