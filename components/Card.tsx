"use client";

import Image from "next/image";
import ColorThief from "colorthief";
import { useRef } from "react";

interface cardProps {
  id: string;
  images: string;
  title: string;
  price: number;
  rating: number;
  category: string;
}

export const Card = ({ images, title, price, rating, category }: cardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const colorThief = new ColorThief();

  const handleImageLoad = (img: HTMLImageElement) => {
    if (!containerRef.current) return;

    try {
      const color = colorThief.getColor(img);
      containerRef.current.style.backgroundColor = `rgb(${color.join(",")})`;
    } catch (err) {
      console.log("Color extraction failed", err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="border w-100 h-120 flex flex-col items-center justify-center rounded-sm shadow-sm transition"
    >
      <div className="relative w-[90%] h-[60%]">
        <Image
          src={images}
          alt={title}
          fill
          crossOrigin="anonymous"
          onLoad={(e) => handleImageLoad(e.target as HTMLImageElement)}
          className="object-fit bg-amber-600"
        />
      </div>

      <h1 className="text-2xl">{title}</h1>
      <p>${price}</p>
      <p>{rating}</p>
    </div>
  );
};
