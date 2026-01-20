import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "@/context/ClientWrapper";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "junior shopping site",
  description: "an ecommerce platform for the retailers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-[#03121b] bg-[#f4f4f8]`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
