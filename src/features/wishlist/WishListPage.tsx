import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { removeFromWishlist } from "./wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { Button, buttonVariants } from "@/components/ui/button";
import { PriceTag } from "@/components/price-tag";
import { Trash2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

function WishlistPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.wishlist.items);

  if (items.length === 0) {
    return (
      <Reveal className="text-center py-16 px-4">
        <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
        <Link
          to="/products"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Browse Products
        </Link>
      </Reveal>
    );
  }

  return (
    <Reveal className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      <RevealGroup className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <RevealItem
            key={product.id}
            className="border rounded-lg overflow-hidden"
          >
            <Link to={`/products/${product.id}`}>
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="p-4 space-y-2">
              <Link
                to={`/products/${product.id}`}
                className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors"
              >
                {product.title}
              </Link>

              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
              />

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => dispatch(addToCart(product))}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Reveal>
  );
}

export default WishlistPage;
