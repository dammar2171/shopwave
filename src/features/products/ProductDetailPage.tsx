import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "./productsApi";
import { PriceTag } from "@/components/price-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { addToCart } from "@/features/cart/cartSlice";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-muted-foreground mb-4">
          We couldn't find that product.
        </p>
        <Link to="/products" className="text-primary hover:underline">
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div>
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Rating: {product.rating} / 5
          </p>
        </div>

        <PriceTag
          price={product.price}
          originalPrice={product.originalPrice}
          className="text-xl"
        />

        <Separator />

        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <p className="text-sm">
          {product.stock > 0 ? (
            <span className="text-green-600">
              In stock ({product.stock} available)
            </span>
          ) : (
            <span className="text-destructive">Out of stock</span>
          )}
        </p>

        <Button
          size="lg"
          className="w-full md:w-auto"
          disabled={product.stock === 0}
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
