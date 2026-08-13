export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string
  status: ReviewStatus
  storeReply?: string
  createdAt: string
  updatedAt: string
  user?: { name: string }
  product?: { title: string; image: string }
}