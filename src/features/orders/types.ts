export interface OrderItem {
  id: string
  productId: string
  title: string
  image: string
  price: string
  quantity: number
}

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED"

export interface OrderStatusHistoryEntry {
  id: string
  status: OrderStatus
  note?: string
  timestamp: string
}

export interface Order {
  id: string
  userId: string
  subtotal: string
  shippingCost: string
  total: string
  status: OrderStatus
  paymentMethod: string
  shippingFullName: string
  shippingAddress: string
  shippingCity: string
  shippingPostalCode: string
  shippingPhone: string
  items: OrderItem[]
  statusHistory: OrderStatusHistoryEntry[]
  user?: { name: string; email: string }
  createdAt: string
  updatedAt: string
}