export interface Settings {
  id: string
  storeName: string
  storeEmail: string
  storePhone: string
  storeAddress: string
  currency: string
  flatShippingRate: string
  freeShippingThreshold: string
  taxRatePercent: string
  emailOnNewOrder: boolean
  emailOnLowStock: boolean
  emailOnNewReview: boolean
  updatedAt: string
}