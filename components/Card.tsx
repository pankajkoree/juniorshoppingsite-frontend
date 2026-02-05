"use client";

import Image from "next/image";

// <------- interface for card props -------->
interface cardProps {
  id: string;
  images: string;
  title: string;
  price: number;
  rating: number;
  category: string;
}

export const Card = ({
  id,
  images,
  title,
  price,
  rating,
  category,
}: cardProps) => {
  return (
    <div className="border w-100 h-100 flex flex-col items-center justify-center rounded-sm shadow-sm shadow-green-300">
      {/* <------- image of product -------> */}
      <div className="relative w-40 h-40 bg-amber-100">
        <Image
          src={images}
          alt={title}
          fill
          className="object-cover rounded-none"
        />
      </div>

      {/* <-------- product title --------> */}
      <h1>{title}</h1>
    </div>
  );
};
