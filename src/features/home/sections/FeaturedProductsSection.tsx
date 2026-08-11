import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { ProductCard } from "@/features/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RevealItem, RevealGroup } from "@/components/motion/RevealGroup";

export function FeaturedProductsSection() {
  const { data: response, isLoading } = useGetProductsQuery();
  const products = response?.data ?? [];

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

      <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <RevealItem key={i}>
              <ProductCardSkeleton />
            </RevealItem>
          ))}

        {!isLoading &&
          products.slice(0, 4).map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
      </RevealGroup>
    </section>
  );
}
