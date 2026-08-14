import { baseApi } from "@/services/apiClient"

export interface RevenueDataPoint {
  date: string
  revenue: number
  orders: number
}

export interface TopSellingProduct {
  productId: string
  title: string
  image: string
  unitsSold: number
  revenue: number
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  revenueChangePercent: number
  ordersChangePercent: number
  pendingOrders: number
  lowStockProducts: number
  revenueData: RevenueDataPoint[]
  topSelling: TopSellingProduct[]
}

interface DashboardStatsResponse {
  success: boolean
  data: DashboardStats
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => "/dashboard/stats",
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardApi