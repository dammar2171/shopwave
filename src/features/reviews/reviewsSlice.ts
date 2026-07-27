import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ProductReview } from "./types"

interface ReviewsState {
  items: ProductReview[]
}

// Same mock data admin currently uses — now the single source of truth
const initialState: ReviewsState = {
  items: [
    {
      id: "REV-001",
      productId: "1",
      productTitle: "Wireless Bluetooth Headphones",
      productImage: "https://placehold.co/100x100?text=Headphones",
      customerName: "Sita Rai",
      rating: 5,
      comment: "Amazing sound quality and the noise cancellation actually works great during my commute.",
      status: "approved",
      storeReply: "Thank you so much for the kind words, Sita!",
      createdAt: "2026-07-15T10:00:00Z",
    },
    {
      id: "REV-002",
      productId: "1",
      productTitle: "Wireless Bluetooth Headphones",
      productImage: "https://placehold.co/100x100?text=Headphones",
      customerName: "Hari Thapa",
      rating: 2,
      comment: "Battery drains faster than advertised. Disappointed after just 2 weeks of use.",
      status: "pending",
      createdAt: "2026-07-24T14:00:00Z",
    },
    {
      id: "REV-003",
      productId: "2",
      productTitle: "Running Shoes",
      productImage: "https://placehold.co/100x100?text=Shoes",
      customerName: "Gita Shrestha",
      rating: 4,
      comment: "Comfortable for daily runs, true to size. Would buy again in a different color.",
      status: "approved",
      createdAt: "2026-07-20T09:00:00Z",
    },
  ],
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (
      state,
      action: PayloadAction<{
        productId: string
        productTitle: string
        productImage: string
        customerName: string
        rating: number
        comment: string
      }>
    ) => {
      state.items.unshift({
        id: `REV-${crypto.randomUUID().slice(0, 8)}`,
        ...action.payload,
        status: "pending", // new reviews always start pending, need admin approval
        createdAt: new Date().toISOString(),
      })
    },
    updateReviewStatus: (
      state,
      action: PayloadAction<{ id: string; status: ProductReview["status"] }>
    ) => {
      const review = state.items.find((r) => r.id === action.payload.id)
      if (review) review.status = action.payload.status
    },
    setStoreReply: (
      state,
      action: PayloadAction<{ id: string; reply: string }>
    ) => {
      const review = state.items.find((r) => r.id === action.payload.id)
      if (review) review.storeReply = action.payload.reply
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((r) => r.id !== action.payload)
    },
  },
})

export const { addReview, updateReviewStatus, setStoreReply, deleteReview } =
  reviewsSlice.actions
export default reviewsSlice.reducer