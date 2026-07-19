import { PriceTag } from "@/components/price-tag";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";
function HomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold p-8">Home Page</h1>
      <PriceTag price={100} originalPrice={120} currency="NPL" />
      <div className="flex justify-center items-center gap-4 ">
        {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
      </div>
    </>
  );
}

export default HomePage;
