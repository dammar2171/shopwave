import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { ProductCard } from "@/features/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedProductsSection() {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link
          to="/products"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}

        {!isLoading &&
          products
            ?.slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}
