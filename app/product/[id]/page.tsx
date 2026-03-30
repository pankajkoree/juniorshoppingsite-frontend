"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string;
  images?: string[];
  rating?: number;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/products/${id}`);
        setProduct(response.data?.data || response.data || null);
      } catch (err) {
        console.error(err);
        setError("Could not load product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-600 dark:text-gray-300">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <p className="text-red-600 dark:text-red-400 mb-4">{error || "Product not found."}</p>
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <ArrowLeft size={14} /> Back to catalog
        </Link>
      </div>
    );
  }

  const galleryImage = product.images && product.images.length > 0 ? product.images[0] : product.thumbnail || "/placeholder.png";
  const ratingValue = product.rating ? Number(product.rating) : 0;

  const addProduct = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: galleryImage,
      category: product.category,
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6 text-gray-600 dark:text-gray-300">
          <Link href="/" className="inline-flex items-center gap-2 hover:text-blue-500">
            <ArrowLeft size={16} /> Back
          </Link>
          <span className="text-sm">/</span>
          <Link href="/carts" className="inline-flex items-center gap-2 hover:text-blue-500">
            <ShoppingCart size={16} /> Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="rounded-2xl overflow-hidden h-80 md:h-105 bg-gray-100 dark:bg-gray-700">
            <Image src={galleryImage} alt={product.title} fill className="object-cover" />
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Category: {product.category}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(ratingValue) ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{ratingValue.toFixed(1)}</span>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-5">{product.description}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={addProduct} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
              <Link href="/ordered" className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
