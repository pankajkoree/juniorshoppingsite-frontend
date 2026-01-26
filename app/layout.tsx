import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "@/context/ClientWrapper";
import { ReactNode } from "react";
import "./globals.css";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";

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
      <body className={`${inter.className} dark:bg-[#030f16] bg-[#f4f4f8]`}>
        <ClientWrapper>
          {/* <------- Navigation Bar -------> */}
          <div className="sticky top-0 z-50 backdrop-blur-xl">
            <NavigationBar />
          </div>

          {children}

          {/* <------- Footer -------> */}
          <div>
            <Footer />
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}
