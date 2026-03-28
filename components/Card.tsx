"use client";

import Image from "next/image";
import ColorThief from "colorthief";
import { useRef, useState } from "react";

interface CardProps {
  id: string;
  images: string;
  title: string;
  price: number;
  rating: number;
  category: string;
}

export const Card = ({ images, title, price, rating, category }: CardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const colorThief = new ColorThief();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgColor, setBgColor] = useState<string>("rgba(248, 250, 252, 1)");

  const handleImageLoad = (img: HTMLImageElement) => {
    setImageLoaded(true);
    if (!containerRef.current) return;

    try {
      const color = colorThief.getColor(img);
      const rgbColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.1)`;
      setBgColor(rgbColor);
    } catch (err) {
      console.log("Color extraction failed:", err);
    }
  };

  const displayRating = Math.min(5, Math.max(0, Number(rating) || 0));
  const formattedPrice = Number(price).toFixed(2);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < Math.floor(rating)
                ? "text-yellow-400"
                : i < rating
                  ? "text-yellow-200"
                  : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full max-w-xs h-80 flex flex-col rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden cursor-pointer transform hover:scale-105"
    >
      {/* Category Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-block px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold rounded-full lowercase transition-colors">
          {category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-48 shrink-0 mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-600 dark:to-gray-700 animate-pulse" />
        )}
        <Image
          src={images}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          crossOrigin="anonymous"
          onLoad={(e) => handleImageLoad(e.currentTarget as HTMLImageElement)}
          className={`object-cover transition-transform duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col grow">
        {/* Title */}
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title || "Product Name"}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          {renderStars(displayRating)}
          <span className="text-xs text-gray-600 dark:text-gray-400">
            ({displayRating.toFixed(1)})
          </span>
        </div>

        {/* Category Display */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 capitalize">
          Category: {category || "N/A"}
        </p>

        {/* Price */}
        <div className="mt-auto">
          <p className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">
            ${formattedPrice}
          </p>

          {/* Add to Cart Button */}
          <button
            className="w-full py-2 px-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
            onClick={() => console.log(`Added ${title} to cart`)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
