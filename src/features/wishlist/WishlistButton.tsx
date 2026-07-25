import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { toggleWishlist } from "./wishlistSlice";
import { cn } from "@/lib/utils";
import type { Product } from "../products/types";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id),
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("shrink-0", className)}
      onClick={(e) => {
        e.preventDefault(); // stop parent <Link> navigation when used inside a card
        dispatch(toggleWishlist(product));
      }}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isWishlisted
            ? "fill-destructive text-destructive"
            : "text-muted-foreground",
        )}
      />
      <span className="sr-only">
        {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      </span>
    </Button>
  );
}

export function useIsWishlisted(productId: string) {
  return useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === productId),
  );
}
