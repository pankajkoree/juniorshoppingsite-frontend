"use client";

import { Card } from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products-data"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/products`,
        );
        return response.data;
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : "Failed to fetch products");
      }
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });

  type Product = {
    id: string;
    thumbnail?: string;
    title?: string;
    description?: string;
    price?: number;
    rating?: number;
    category?: string;
  };

  const products = useMemo<Product[]>(() => (data?.data as Product[] | undefined) || [], [data]);
  const [sortBy, setSortBy] = useState<"featured" | "price" | "rating">("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  const categories = useMemo<string[]>(() => {
    const counts = products.reduce<Map<string, number>>((acc, product) => {
      const cat = (product.category || "General").trim() || "General";
      acc.set(cat, (acc.get(cat) || 0) + 1);
      return acc;
    }, new Map());
    const topCategories = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 9)
      .map(([cat]) => cat);

    if (!topCategories.includes("General") && products.length > 0) {
      // keep top major categories, optionally include the default general if needed
      return ["All", ...topCategories];
    }

    return ["All", ...topCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return selectedCategory === "All"
      ? products
      : products.filter((p) => (p.category || "General").toLowerCase() === selectedCategory.toLowerCase());
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    const sorted = sortBy === "price"
      ? [...filteredProducts].sort((a, b) => (a.price || 0) - (b.price || 0))
      : sortBy === "rating"
        ? [...filteredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0))
        : filteredProducts;

    return sorted;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const pagedProducts = sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-[#030f16] py-8">
      {/* Category filter + sort */}
      <div className="px-4 mb-6">
        <div className="max-w-[90%] mx-auto flex items-center gap-4 justify-between">
          <div className="w-[80%] flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-300">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "featured" | "price" | "rating");
                setCurrentPage(1);
              }}
              className="text-sm px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <option value="featured">Featured</option>
              <option value="price">Price (low to high)</option>
              <option value="rating">Rating (high to low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading products...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="px-4 max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 p-6 rounded">
            <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-2">Error Loading Products</h3>
            <p className="text-red-700 dark:text-red-300">
              {error instanceof Error ? error.message : "An error occurred while fetching products"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && pagedProducts.length > 0 && (
        <div className="px-4">
          <div className="max-w-[90%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
              {pagedProducts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  images={product.thumbnail || "/placeholder.png"}
                  title={product.title || "Untitled Product"}
                  description={product.description}
                  price={product.price || 0}
                  rating={product.rating || 0}
                  category={product.category || "General"}
                />
              ))}
            </div>

            {/* pagination */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Prev
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="px-4">
          <div className="max-w-md mx-auto text-center bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray-900 p-8">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No products found</p>
            <p className="text-gray-400 dark:text-gray-500">Please check back later for new items</p>
          </div>
        </div>
      )}
    </div>
  );
}
