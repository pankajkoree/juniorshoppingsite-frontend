"use client";

import { Eagle_Lake } from "next/font/google";
import { Input } from "./ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";

const eagle_Lake = Eagle_Lake({
  subsets: ["latin"],
  weight: "400",
});

export const NavigationBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const dark = storedTheme === "dark";
    document.documentElement.classList.toggle("dark", dark);
    setIsDarkMode(dark);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, isMounted]);

  const themeSwitch = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className="w-full flex items-center justify-center border-b">
      <div className="grid grid-cols-[10%_60%_30%] w-[80%] items-center py-2 gap-12">
        {/* <------- JSS logo -------> */}
        <div className="flex flex-col items-center justify-center">
          <p className={`${eagle_Lake.className} font-extrabold text-xl`}>
            JUNIOR
          </p>
          <p className="text-sm -py-8">
            <span>Shopping</span> <span>Site✨</span>
          </p>
        </div>

        {/* <------- search bar --------> */}
        <div className="flex inset-shadow-sm inset-shadow-gray-500 dark:inset-shadow-black rounded-sm">
          <Input
            type="text"
            placeholder="search for products, brands or more"
            className="rounded-tl-sm rounded-bl-sm rounded-tr-none rounded-br-none border-none"
          />
          <div className="flex w-12 justify-center items-center">
            <Image
              src="./search.svg"
              width={32}
              height={32}
              alt="search icon"
              className=""
            />
          </div>
        </div>

        {/* <------- login and carts */}
        <div className="flex gap-8">
          {/* <------- login -------> */}
          <div className="flex items-center gap-2">
            <Image
              src="./user-circle.svg"
              width={32}
              height={32}
              alt="user icon for login"
            />
            <p>login</p>
          </div>

          {/* <------- cart --------> */}
          <div className="flex items-center gap-2">
            <Image
              src="./garden-cart.svg"
              width={32}
              height={32}
              alt="user icon for login"
            />
            <p>cart</p>
          </div>

          {/* theme switch */}
          <div onClick={themeSwitch}>
            {isDarkMode ? (
              <div className="flex inset-shadow-sm inset-shadow-black rounded-sm p-2">
                <Image
                  src="./sun.svg"
                  width={32}
                  height={32}
                  alt="light mode"
                />
              </div>
            ) : (
              <div className="flex inset-shadow-sm inset-shadow-gray-500 rounded-sm p-2">
                <Image
                  src="./moon.svg"
                  width={32}
                  height={32}
                  alt="dark mode"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
