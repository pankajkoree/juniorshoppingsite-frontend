"use client";

import { Card } from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

  const products = data?.data || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-[#030f16] py-8">
      {/* Header */}
      <div className="px-4 mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Our Products</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover our amazing collection</p>
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
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <div className="px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {products.map((product: any) => (
                <Card
                  key={product.id}
                  id={product.id}
                  images={product.thumbnail || "/placeholder.png"}
                  title={product.title || "Untitled Product"}
                  price={product.price || 0}
                  rating={product.rating || 0}
                  category={product.category || "General"}
                />
              ))}
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
