import type { Product } from "../products/types"

// ── Dashboard / Analytics ──────────────────────────────

export interface AdminStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  revenueChangePercent: number   // vs last period, e.g. +12.5 or -4.2
  ordersChangePercent: number
  pendingOrders: number
  lowStockProducts: number       // count of products below stock threshold
}

export interface RevenueDataPoint {
  date: string        // e.g. "2026-07-01"
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

// ── Product Management ─────────────────────────────────

export interface AdminProduct extends Product {
  sku: string
  costPrice: number          // what it costs the business — never shown to customers
  isActive: boolean          // published / hidden from storefront
  lowStockThreshold: number
  createdAt: string
  updatedAt: string
}

export interface ProductFormValues {
  title: string
  description: string
  price: number
  originalPrice?: number
  costPrice: number
  category: string
  sku: string
  stock: number
  lowStockThreshold: number
  image: string
  isActive: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  productCount: number
}

// ── Order Management ───────────────────────────────────

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded"

export interface OrderStatusHistoryEntry {
  status: OrderStatus
  timestamp: string
  note?: string
}

export interface OrderItem {
  productId: string
  title: string
  image: string
  price: number
  quantity: number
}

export interface AdminOrder {
  id: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  status: OrderStatus
  statusHistory: OrderStatusHistoryEntry[]
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
  paymentMethod: string
  createdAt: string
}

// ── User Management ─────────────────────────────────────

export type AccountStatus = "active" | "suspended"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  status: AccountStatus
  totalOrders: number
  totalSpent: number
  joinedDate: string
}