import { baseApi } from "@/services/apiClient"
import type { Settings } from "./types"

interface SettingsResponse {
  success: boolean
  data: Settings
}

interface StoreSettingsInput {
  storeName: string
  storeEmail: string
  storePhone: string
  storeAddress: string
  currency: string
}

interface ShippingSettingsInput {
  flatShippingRate: number
  freeShippingThreshold: number
  taxRatePercent: number
}

interface NotificationSettingsInput {
  emailOnNewOrder: boolean
  emailOnLowStock: boolean
  emailOnNewReview: boolean
}

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<SettingsResponse, void>({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),

    updateStoreSettings: builder.mutation<SettingsResponse, StoreSettingsInput>({
      query: (body) => ({
        url: "/settings/store",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    updateShippingSettings: builder.mutation<SettingsResponse, ShippingSettingsInput>({
      query: (body) => ({
        url: "/settings/shipping",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    updateNotificationSettings: builder.mutation<SettingsResponse, NotificationSettingsInput>({
      query: (body) => ({
        url: "/settings/notifications",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
})

export const {
  useGetSettingsQuery,
  useUpdateStoreSettingsMutation,
  useUpdateShippingSettingsMutation,
  useUpdateNotificationSettingsMutation,
} = settingsApi