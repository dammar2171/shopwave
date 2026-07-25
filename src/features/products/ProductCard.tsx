import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { PriceTag } from "@/components/price-tag";
import { cn } from "@/lib/utils";
import type { Product } from "./types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <CardContent className="p-4 space-y-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.category}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <PriceTag price={product.price} originalPrice={product.originalPrice} />
        <Link
          to={`/products/${product.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
