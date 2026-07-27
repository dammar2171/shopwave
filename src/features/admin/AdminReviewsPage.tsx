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
import { mockReviews as initialReviews } from "./mockAdminData";
import type { ProductReview, ReviewStatus } from "./types";

const statusVariant: Record<
  ReviewStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "outline",
  approved: "secondary",
  rejected: "destructive",
};

const statusFilters: Array<ReviewStatus | "all"> = [
  "all",
  "pending",
  "approved",
  "rejected",
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
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all");
  const [replyTarget, setReplyTarget] = useState<ProductReview | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = reviews.filter(
    (r) => statusFilter === "all" || r.status === statusFilter,
  );

  function updateStatus(id: string, status: ReviewStatus) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Review ${status}.`);
  }

  function openReplyDialog(review: ProductReview) {
    setReplyTarget(review);
    setReplyText(review.storeReply ?? "");
  }

  function submitReply() {
    if (!replyTarget) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyTarget.id ? { ...r, storeReply: replyText } : r,
      ),
    );
    toast.success("Reply saved.");
    setReplyTarget(null);
    setReplyText("");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reviews</h1>

      {/* Filters */}
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
            {status}
          </button>
        ))}
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {filteredReviews.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No reviews found.
            </CardContent>
          </Card>
        )}

        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <img
                  src={review.productImage}
                  alt={review.productTitle}
                  className="h-14 w-14 rounded-md object-cover bg-muted shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-sm font-medium">
                        {review.productTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {review.customerName} ·{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={statusVariant[review.status]}
                      className="capitalize"
                    >
                      {review.status}
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
                    {review.status !== "approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(review.id, "approved")}
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Approve
                      </Button>
                    )}
                    {review.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => updateStatus(review.id, "rejected")}
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

      {/* Reply Dialog */}
      <Dialog
        open={!!replyTarget}
        onOpenChange={(open) => !open && setReplyTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reply to {replyTarget?.customerName}</DialogTitle>
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
