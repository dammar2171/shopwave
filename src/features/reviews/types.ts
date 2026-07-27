export type ReviewStatus = "pending" | "approved" | "rejected"

export interface ProductReview {
  id: string
  productId: string
  productTitle: string
  productImage: string
  customerName: string
  rating: number
  comment: string
  status: ReviewStatus
  storeReply?: string
  createdAt: string
}