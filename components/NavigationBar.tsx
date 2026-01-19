import { Lobster } from "next/font/google";
import { Input } from "./ui/input";
import Image from "next/image";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
});

export const NavigationBar = () => {
  return (
    <div className="grid grid-cols-3 bg-blue-200 items-center">
      {/* <------- JSS logo -------> */}
      <div>
        <p className={`${lobster.className} text-xl px-4`}>JSS</p>
      </div>

      {/* <------- search bar --------> */}
      <div className="flex bg-white">
        <Image src="./search.svg" width={40} height={40} alt="search icon" />
        <Input type="text" placeholder="search for products, brands or more" />
      </div>

      {/* <------- login and carts */}
      <div className="flex">
        <div>login</div>
        <div>cart</div>
      </div>
    </div>
  );
};
