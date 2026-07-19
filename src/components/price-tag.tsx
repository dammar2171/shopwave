import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function PriceTag({
  price,
  originalPrice,
  currency = "USD",
  className,
}: PriceTagProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-lg font-semibold text-foreground">
        {formatCurrency(price, currency)}
      </span>

      {hasDiscount && (
        <>
          <span className="text-sm text-muted-foreground line-through">
            {formatCurrency(originalPrice, currency)}
          </span>
          <Badge variant="destructive">-{discountPercent}%</Badge>
        </>
      )}
    </div>
  );
}
