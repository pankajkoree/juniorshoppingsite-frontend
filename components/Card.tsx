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
      className="border w-100 h-100 flex flex-col items-center justify-center rounded-sm shadow-sm transition"
    >
      <div className="relative w-40 h-40">
        <Image
          src={images}
          alt={title}
          fill
          crossOrigin="anonymous"
          onLoad={(e) => handleImageLoad(e.target as HTMLImageElement)}
          className="object-cover"
        />
      </div>

      <h1>{title}</h1>
    </div>
  );
};
