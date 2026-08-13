import { baseApi } from "@/services/apiClient"
import type { Order, OrderStatus } from "./types"

interface OrdersResponse {
  success: boolean
  data: Order[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface OrderResponse {
  success: boolean
  data: Order
}

interface CreateOrderInput {
  items: { productId: string; quantity: number }[]
  shippingFullName: string
  shippingAddress: string
  shippingCity: string
  shippingPostalCode: string
  shippingPhone: string
  paymentMethod: string
}

interface OrderQueryParams {
  page?: number
  limit?: number
  status?: OrderStatus
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, CreateOrderInput>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }, { type: "Product", id: "LIST" }],
    }),

    getMyOrders: builder.query<OrdersResponse, OrderQueryParams | void>({
      query: (params) => ({
        url: "/orders/my-orders",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order" as const, id: "LIST" },
            ]
          : [{ type: "Order" as const, id: "LIST" }],
    }),

    getAllOrders: builder.query<OrdersResponse, OrderQueryParams | void>({
      query: (params) => ({
        url: "/orders",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order" as const, id: "LIST" },
            ]
          : [{ type: "Order" as const, id: "LIST" }],
    }),

    getOrderById: builder.query<OrderResponse, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    updateOrderStatus: builder.mutation <
      OrderResponse,
      { id: string; status: OrderStatus; note?: string }>
    ({
      query: ({ id, ...body }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = ordersApi