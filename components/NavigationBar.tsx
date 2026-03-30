"use client";

import { Eagle_Lake } from "next/font/google";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const eagle_Lake = Eagle_Lake({
  subsets: ["latin"],
  weight: "400",
});

export const NavigationBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    return false;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const themeSwitch = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className="w-full flex items-center justify-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="grid grid-cols-[10%_55%_35%] w-[70%] items-center py-2 gap-8">
        {/* <------- JSS logo -------> */}
        <Link href="/" className="flex items-center justify-center hover:opacity-80 transition-opacity">
          <span className="font-black text-2xl bg-linear-to-r from-blue-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent tracking-wider">
            JSS
          </span>
        </Link>

        {/* <------- search bar --------> */}
        <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <span className="absolute left-3 text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <Input
            type="text"
            placeholder="Search products, brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (searchTerm.trim()) {
                  router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
                }
              }
            }}
            className={`bg-transparent border-none outline-none flex-1 pl-10 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all ${
              isSearchFocused ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
            }`}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-11 h-8 w-8 inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <span className="text-xs font-bold">×</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (searchTerm.trim()) {
                router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
              }
            }}
            className="absolute right-2 h-8 w-8 inline-flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            aria-label="Submit search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 21l-6-6" />
              <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
            </svg>
          </button>
        </div>

        {/* <------- login and carts */}


        {/* <------- login and carts */}
        <div className="flex gap-6 items-center justify-end">
          {/* <------- login -------> */}
          <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600 dark:text-blue-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
            <span className="text-sm">Sign In</span>
          </Link>

          {/* <------- cart --------> */}
          <Link href="/carts" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-600 dark:text-emerald-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
              <path d="M6 8v11a1 1 0 0 0 1.806 .591l3.694 -5.091v.055" />
              <path d="M6 8h15l-3.5 7l-7.1 -.747a4 4 0 0 1 -3.296 -2.493l-2.853 -7.13a1 1 0 0 0 -.928 -.63h-1.323" />
            </svg>
            <span className="text-sm">Cart</span>
          </Link>

          {/* theme switch */}
          <button
            onClick={themeSwitch}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors hover:cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
                <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
                <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-700"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
