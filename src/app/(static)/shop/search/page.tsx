"use client";
import ProductCard from "@/components/ShopComponents/productCard";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

const fetchSearchPrducts = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts...");
  }

  return response.json();
};

export default function ProductsSearchPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (encodedSearchQuery) {
      setLoading(true);
      setError(null);

      fetchSearchPrducts(
        `http://localhost:8080/user/shop/product?search=${encodedSearchQuery}&skip=0&take=10`
      )
        .then((data) => {
          setProducts(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [encodedSearchQuery]);

  if (loading) return <div className="m-auto text-center"><Spinner className="h-8 w-8" /></div>;
  if (error) return <div className="m-auto text-center bg-red-800 border border-red-300 text-red-100 p-4 rounded text-xl">Error: {error}</div>;

  return (
    <div className="m-auto text-center">
      <h1>Search Results for "{searchQuery}"</h1>
      {products.length > 0 ? (
        <div>
          {products.map((product: any) => (
            <ProductCard singleProduct={product} />
          ))}
        </div>
      ) : (
        <div className="border border-gray-300 bg-gray-800 p-8 rounded mt-4">
          No products found
        </div>
      )}
    </div>
  );
}