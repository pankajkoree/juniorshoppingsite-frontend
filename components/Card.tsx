"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ColorThief from "colorthief";
import { useRef, useState, useEffect } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "@/context/CartContext";

interface CardProps {
  id: string;
  images: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  description?: string;
}

export const Card = ({ images, title, price, rating, category, description, id }: CardProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const colorThief = new ColorThief();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(images || "/placeholder.png");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (img: HTMLImageElement) => {
    setImageLoaded(true);
    if (!containerRef.current) return;

    try {
      const color = colorThief.getColor(img);

      // Create different shades of the dominant color for gradient
      const baseR = color[0];
      const baseG = color[1];
      const baseB = color[2];

      // Create lighter and darker variations
      const lightR = Math.min(255, Math.floor(baseR + 40));
      const lightG = Math.min(255, Math.floor(baseG + 40));
      const lightB = Math.min(255, Math.floor(baseB + 40));

      const darkR = Math.max(0, Math.floor(baseR - 40));
      const darkG = Math.max(0, Math.floor(baseG - 40));
      const darkB = Math.max(0, Math.floor(baseB - 40));

      // Create gradient with very low opacity
      const gradientStart = `rgba(${lightR}, ${lightG}, ${lightB}, 0.08)`;
      const gradientEnd = `rgba(${darkR}, ${darkG}, ${darkB}, 0.12)`;

      // Apply gradient as CSS custom properties
      if (containerRef.current) {
        containerRef.current.style.setProperty('--gradient-start', gradientStart);
        containerRef.current.style.setProperty('--gradient-end', gradientEnd);
      }
    } catch (err) {
      // Fallback gradient
      if (containerRef.current) {
        containerRef.current.style.setProperty('--gradient-start', 'rgba(220, 252, 231, 0.08)');
        containerRef.current.style.setProperty('--gradient-end', 'rgba(187, 247, 208, 0.12)');
      }
    }
  };

  const displayRating = Math.min(5, Math.max(0, Number(rating) || 0));
  const formattedPrice = Number(price).toFixed(2);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Don't navigate if clicking on buttons or their children
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    router.push(`/product/${id}`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : i < rating
                  ? "text-yellow-300 fill-yellow-300"
                  : "text-gray-300"
            } transition-colors duration-200`}
          />
        ))}
        <span className="text-xs text-gray-600 dark:text-gray-300 ml-1 font-medium">
          ({displayRating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative w-full max-w-sm min-h-120 flex flex-col rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-red-500/40 backdrop-blur-sm overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/40 dark:hover:shadow-red-500/40"
      style={{
        background: isDarkMode
          ? `linear-gradient(135deg, var(--gradient-start, rgba(31, 41, 55, 0.3)) 0%, var(--gradient-end, rgba(17, 24, 39, 0.4)) 100%), linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.85) 100%)`
          : `linear-gradient(135deg, var(--gradient-start, rgba(248, 250, 252, 0.3)) 0%, var(--gradient-end, rgba(241, 245, 249, 0.3)) 100%), linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)`
      }}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-5 left-5 z-20 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group/fav border border-white/20 dark:border-gray-700/20 cursor-pointer"
      >
        <Heart
          size={20}
          className={`${
            isFavorite
              ? "text-red-500 fill-red-500 scale-110"
              : "text-gray-400 group-hover/fav:text-red-400 group-hover/fav:scale-105"
          } transition-all duration-300`}
        />
      </button>

      {/* Category Badge */}
      <div className="absolute top-5 right-5 z-20">
        <span className="inline-flex items-center px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 border border-white/20">
          {category}
        </span>
      </div>

      {/* Image Container with Gradient Overlay */}
      <div className="relative block w-full h-64 shrink-0 mb-5 rounded-2xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-inner border border-gray-200/30 dark:border-gray-700/30">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 animate-pulse" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          crossOrigin="anonymous"
          onError={() => setImgSrc("/placeholder.png")}
          onLoad={(e) => handleImageLoad(e.currentTarget as HTMLImageElement)}
          className={`object-cover transition-all duration-500 ${
            isHovered ? "scale-110 brightness-110" : "scale-100 brightness-100"
          }`}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.3)_1px,transparent_0)] bg-size-[20px_20px]" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col grow space-y-4 transform transition-transform duration-300 group-hover:translate-y-0.5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight tracking-tight">
          {title || "Product Name"}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          {description || "High-quality item with premium features, available now."}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between">
          {renderStars(displayRating)}
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
            <span className="font-medium">★</span>
            <span>{displayRating.toFixed(1)}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-green-600 dark:text-green-400 tracking-tight">
                ${formattedPrice}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-300 line-through opacity-75">
                ${(Number(price) * 1.2).toFixed(2)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-lg">
                Save 17%
              </span>
            </div>
          </div>

          {/* Enhanced Add to Cart Button */}
          <button
            className="w-full relative overflow-hidden bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:via-blue-800 dark:hover:to-blue-900 text-white font-bold py-4 px-5 rounded-2xl transition-all duration-300 transform hover:scale-102 hover:shadow-xl group/btn border border-blue-400/20 shadow-lg cursor-pointer"
            onClick={() => {
              addToCart({
                id: id || title.replace(/\s+/g, "-").toLowerCase(),
                title: title || "Product",
                price: price || 0,
                image: images || "/placeholder.png",
                category: category || "General"
              });
              toast.success("Item added to cart", {
                duration: 1500,
                style: {
                  borderRadius: "10px",
                  background: "#1d4ed8",
                  color: "white",
                },
              });
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <ShoppingCart size={20} className="transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
              <span className="text-base font-semibold">Add to Cart</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
