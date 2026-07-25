import { useGetProductsQuery } from "./productsApi";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";

function ProductListPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

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

      {!isLoading && !isError && products && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}

      {!isLoading && !isError && products && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
