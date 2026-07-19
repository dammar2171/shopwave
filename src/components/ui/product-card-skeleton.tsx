import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="aspect-square w-full rounded-none" />

      <CardContent className="p-4 space-y-2">
        {/* Title placeholder - two lines */}
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price placeholder */}
        <Skeleton className="h-6 w-16" />
        {/* Button placeholder */}
        <Skeleton className="h-9 w-9 rounded-md" />
      </CardFooter>
    </Card>
  );
}
