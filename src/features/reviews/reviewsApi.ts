import { baseApi } from "@/services/apiClient"
import type { Review, ReviewStatus } from "./types"

interface ProductReviewsResponse {
  success: boolean
  data: {
    reviews: Review[]
    averageRating: number
    totalReviews: number
  }
}

interface ReviewsResponse {
  success: boolean
  data: Review[]
}

interface ReviewResponse {
  success: boolean
  data: Review
}

interface CreateReviewInput {
  productId: string
  rating: number
  comment: string
}

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<ProductReviewsResponse, string>({
      query: (productId) => `/reviews/product/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Review", id: `PRODUCT_${productId}` },
      ],
    }),

    createReview: builder.mutation<ReviewResponse, CreateReviewInput>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Review", id: `PRODUCT_${productId}` },
        { type: "Review", id: "LIST" },
      ],
    }),

    getAllReviews: builder.query<ReviewsResponse, ReviewStatus | void>({
      query: (status) => ({
        url: "/reviews",
        params: status ? { status } : undefined,
      }),
      providesTags: [{ type: "Review", id: "LIST" }],
    }),

    updateReviewStatus: builder.mutation<
      ReviewResponse,
      { id: string; status: ReviewStatus }
    >({
      query: ({ id, status }) => ({
        url: `/reviews/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }, { type: "Product", id: "LIST" }],
    }),

    replyToReview: builder.mutation<ReviewResponse, { id: string; storeReply: string }>({
      query: ({ id, storeReply }) => ({
        url: `/reviews/${id}/reply`,
        method: "PATCH",
        body: { storeReply },
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
  }),
})

export const {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
  useReplyToReviewMutation,
} = reviewsApi