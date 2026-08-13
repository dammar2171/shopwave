import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
} from "./reviewsApi";
import { StarRatingInput } from "./StarRatingInput";
import { cn } from "@/lib/utils";
import type { Product } from "../products/types";

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: response, isLoading } = useGetProductReviewsQuery(product.id);
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  const reviews = response?.data.reviews ?? [];
  const averageRating = response?.data.averageRating ?? 0;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit() {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    try {
      await createReview({
        productId: product.id,
        rating,
        comment: comment.trim(),
      }).unwrap();
      toast.success("Review submitted! It will appear after approval.");
      setRating(0);
      setComment("");
      setShowForm(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to submit review");
    }
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading reviews...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({reviews.length} review
                {reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>

        {isAuthenticated && !showForm && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Your Rating</p>
              <StarRatingInput value={rating} onChange={setRating} />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Your Review</p>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!isAuthenticated && (
        <p className="text-sm text-muted-foreground">
          Please log in to write a review.
        </p>
      )}

      <Separator />

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {review.user?.name ?? "Anonymous"}
                </p>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>

              {review.storeReply && (
                <div className="bg-secondary/50 rounded-md p-3 text-sm ml-4">
                  <p className="text-xs font-semibold text-primary mb-1">
                    Store Reply
                  </p>
                  <p className="text-muted-foreground">{review.storeReply}</p>
                </div>
              )}
              <Separator className="mt-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
