import { useGetProductsQuery } from "./productsApi";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";
import { RevealItem, RevealGroup } from "@/components/motion/RevealGroup";

function ProductListPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {isLoading && (
        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <RevealItem key={i}>
              <ProductCardSkeleton />
            </RevealItem>
          ))}
        </RevealGroup>
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
