import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "./productsApi";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";
import { ProductFilters } from "./ProductFilters";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedCategory = searchParams.get("category") ?? "All";

  const {
    data: response,
    isLoading,
    isError,
  } = useGetProductsQuery({
    search: searchQuery || undefined,
    category: selectedCategory !== "All" ? selectedCategory : undefined,
  });

  const products = response?.data ?? [];

  function handleCategoryChange(category: string) {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            Something went wrong while loading products. Please try again later.
          </p>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No products match your search or filter.
          </p>
        </div>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}

export default ProductListPage;
