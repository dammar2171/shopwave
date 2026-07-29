import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { removeFromCart, updateQuantity } from "./cartSlice";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PriceTag } from "@/components/price-tag";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup ,RevealItem} from "@/components/motion/RevealGroup";

function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <Reveal className="text-center py-16 px-4">
        <p className="text-muted-foreground mb-4">Your cart is empty.</p>
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
    <Reveal className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      <RevealGroup className="space-y-4">
        {items.map((item) => (
          <RevealItem key={item.product.id} className="flex gap-4 items-center">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="h-20 w-20 rounded-md object-cover bg-muted"
            />

            <div className="flex-1 min-w-0">
              <Link
                to={`/products/${item.product.id}`}
                className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
              >
                {item.product.title}
              </Link>
              <PriceTag price={item.product.price} className="mt-1" />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: item.product.id,
                      quantity: item.quantity - 1,
                    }),
                  )
                }
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-6 text-center text-sm">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: item.product.id,
                      quantity: item.quantity + 1,
                    }),
                  )
                }
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => dispatch(removeFromCart(item.product.id))}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          </RevealItem>
        ))}
      </RevealGroup>

      <Separator />

      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </Reveal>
  );
}

export default CartPage;
