import type {
  StoreSettings, 
  ShippingSettings, 
  NotificationSettings
} from "./types"


export const mockStoreSettings: StoreSettings = {
  storeName: "ShopWave",
  storeEmail: "support@shopwave.com",
  storePhone: "+977 980-0000000",
  storeAddress: "Durbar Marg, Kathmandu, Nepal",
  currency: "USD",
}

export const mockShippingSettings: ShippingSettings = {
  flatShippingRate: 5.0,
  freeShippingThreshold: 50.0,
  taxRatePercent: 13,
}

export const mockNotificationSettings: NotificationSettings = {
  emailOnNewOrder: true,
  emailOnLowStock: true,
  emailOnNewReview: false,
}