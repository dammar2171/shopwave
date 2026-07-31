import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "./productsApi";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";
import { ProductFilters } from "./ProductFilters";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

function ProductListPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const selectedCategory = searchParams.get("category") ?? "All";

  function handleCategoryChange(category: string) {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  }

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 md:text-center">All Products</h1>

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

      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No products match your search or filter.
          </p>
        </div>
      )}

      {!isLoading && !isError && filteredProducts.length > 0 && (
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
