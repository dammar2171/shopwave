import { PriceTag } from "@/components/price-tag";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";
import { HeroSection } from "./sections/HeroSection";
import { ValuePropsSection } from "./sections/ValuePropsSection";
import { CategorySection } from "./sections/CategorySection";
import { FeaturedProductsSection } from "./sections/FeaturedProductsSection";
import { NewsletterSection } from "./sections/NewsletterSection";
function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropsSection />
      <CategorySection />
      <FeaturedProductsSection />
      <NewsletterSection />
    </>
  );
}

export default HomePage;
