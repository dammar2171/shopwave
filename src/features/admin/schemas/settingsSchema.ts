import { z } from "zod"

export const storeSettingsSchema = z.object({
  storeName: z.string().min(2, "Store name is required"),
  storeEmail: z.string().email("Enter a valid email"),
  storePhone: z.string().min(6, "Enter a valid phone number"),
  storeAddress: z.string().min(5, "Address is required"),
  currency: z.string().min(1, "Select a currency"),
})

export type StoreSettingsValues = z.infer<typeof storeSettingsSchema>

export const shippingSettingsSchema = z.object({
  flatShippingRate: z.number().min(0, "Cannot be negative"),
  freeShippingThreshold: z.number().min(0, "Cannot be negative"),
  taxRatePercent: z.number().min(0).max(100, "Must be between 0-100"),
})

export type ShippingSettingsValues = z.infer<typeof shippingSettingsSchema>