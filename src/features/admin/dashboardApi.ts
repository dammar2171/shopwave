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

export interface CategoryBreakdown {
  category: string
  revenue: number
  unitsSold: number
}

export interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  avgOrderValue: number
  revenueData: RevenueDataPoint[]
  categoryBreakdown: CategoryBreakdown[]
  newCustomers: number
  returningCustomers: number
}

interface AnalyticsResponse {
  success: boolean
  data: AnalyticsData
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => "/dashboard/stats",
    }),
    getAnalytics: builder.query<AnalyticsResponse, "7d" | "30d">({
    query: (range) => ({ url: "/dashboard/analytics", params: { range },
  }),
}),
  }),
})

export const { useGetDashboardStatsQuery, useGetAnalyticsQuery } = dashboardApi