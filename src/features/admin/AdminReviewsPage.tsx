import { useState } from "react";
import { Star, Check, X, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
  useReplyToReviewMutation,
} from "@/features/reviews/reviewsApi";
import type { Review, ReviewStatus } from "@/features/reviews/types";

const statusVariant: Record<
  ReviewStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "outline",
  APPROVED: "secondary",
  REJECTED: "destructive",
};

const statusFilters: Array<ReviewStatus | "ALL"> = [
  "ALL",
  "PENDING",
  "APPROVED",
  "REJECTED",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}

function AdminReviewsPage() {
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "ALL">("ALL");
  const { data: response, isLoading } = useGetAllReviewsQuery(
    statusFilter !== "ALL" ? statusFilter : undefined,
  );
  const [updateStatus] = useUpdateReviewStatusMutation();
  const [replyToReview] = useReplyToReviewMutation();

  const reviews = response?.data ?? [];

  const [replyTarget, setReplyTarget] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");

  async function handleStatusChange(id: string, status: ReviewStatus) {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Review ${status.toLowerCase()}.`);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update review");
    }
  }

  function openReplyDialog(review: Review) {
    setReplyTarget(review);
    setReplyText(review.storeReply ?? "");
  }

  async function submitReply() {
    if (!replyTarget) return;
    try {
      await replyToReview({
        id: replyTarget.id,
        storeReply: replyText,
      }).unwrap();
      toast.success("Reply saved.");
      setReplyTarget(null);
      setReplyText("");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to save reply");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reviews</h1>

      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors capitalize",
              statusFilter === status
                ? "bg-primary text-primary-foreground border-primary"
                : "border-input hover:bg-accent text-muted-foreground",
            )}
          >
            {status.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Loading...
            </CardContent>
          </Card>
        )}

        {!isLoading && reviews.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No reviews found.
            </CardContent>
          </Card>
        )}

        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <img
                  src={review.product?.image}
                  alt={review.product?.title}
                  className="h-14 w-14 rounded-md object-cover bg-muted shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-sm font-medium">
                        {review.product?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {review.user?.name ?? "Anonymous"} ·{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={statusVariant[review.status]}
                      className="capitalize"
                    >
                      {review.status.toLowerCase()}
                    </Badge>
                  </div>

                  <StarRating rating={review.rating} />

                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>

                  {review.storeReply && (
                    <div className="bg-secondary/50 rounded-md p-3 text-sm">
                      <p className="text-xs font-semibold text-primary mb-1">
                        Store Reply
                      </p>
                      <p className="text-muted-foreground">
                        {review.storeReply}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1 flex-wrap">
                    {review.status !== "APPROVED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusChange(review.id, "APPROVED")
                        }
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Approve
                      </Button>
                    )}
                    {review.status !== "REJECTED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() =>
                          handleStatusChange(review.id, "REJECTED")
                        }
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Reject
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openReplyDialog(review)}
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      {review.storeReply ? "Edit Reply" : "Reply"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!replyTarget}
        onOpenChange={(open) => !open && setReplyTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Reply to {replyTarget?.user?.name ?? "customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <textarea
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a public reply..."
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReplyTarget(null)}>
                Cancel
              </Button>
              <Button onClick={submitReply} disabled={!replyText.trim()}>
                Save Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminReviewsPage;
