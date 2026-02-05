"use client";

import { Card } from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-data"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/products`,
      );

      return response.data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 justify-items-center gap-4 p-2">
          {data.data?.map((product: any) => (
            <Card
              key={product.id}
              id={product.id}
              images={product.thumbnail}
              title={product.title}
              price={product.price}
              rating={product.rating}
              category={product.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}
