import type {
  AdminStats,
  RevenueDataPoint,
  TopSellingProduct,
  AdminProduct,
  Category,
  AdminOrder,
  AdminUser,
  CategoryBreakdown,
  CustomerMetric,
  ProductReview,
  ContactMessage,
  StoreSettings, 
  ShippingSettings, 
  NotificationSettings
} from "./types"

// ── Dashboard ───────────────────────────────────────────

export const mockStats: AdminStats = {
  totalRevenue: 12480.5,
  totalOrders: 342,
  totalProducts: 4,
  totalUsers: 128,
  revenueChangePercent: 12.5,
  ordersChangePercent: -3.2,
  pendingOrders: 8,
  lowStockProducts: 2,
}

export const mockRevenueData: RevenueDataPoint[] = [
  { date: "2026-07-20", revenue: 420.5, orders: 12 },
  { date: "2026-07-21", revenue: 610.0, orders: 18 },
  { date: "2026-07-22", revenue: 380.25, orders: 9 },
  { date: "2026-07-23", revenue: 750.0, orders: 21 },
  { date: "2026-07-24", revenue: 540.75, orders: 15 },
  { date: "2026-07-25", revenue: 890.0, orders: 27 },
  { date: "2026-07-26", revenue: 660.5, orders: 19 },
]

export const mockTopSelling: TopSellingProduct[] = [
  {
    productId: "1",
    title: "Wireless Bluetooth Headphones",
    image: "https://placehold.co/100x100?text=Headphones",
    unitsSold: 156,
    revenue: 9358.44,
  },
  {
    productId: "3",
    title: "Stainless Steel Water Bottle",
    image: "https://placehold.co/100x100?text=Bottle",
    unitsSold: 98,
    revenue: 1959.02,
  },
  {
    productId: "2",
    title: "Running Shoes",
    image: "https://placehold.co/100x100?text=Shoes",
    unitsSold: 64,
    revenue: 2880.0,
  },
]

// ── Products ────────────────────────────────────────────

export const mockCategories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", productCount: 1 },
  { id: "2", name: "Footwear", slug: "footwear", productCount: 1 },
  { id: "3", name: "Home", slug: "home", productCount: 1 },
  { id: "4", name: "Clothing", slug: "clothing", productCount: 1 },
]

export const mockAdminProducts: AdminProduct[] = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones",
    description:
      "Over-ear headphones with active noise cancellation and 30-hour battery life.",
    price: 59.99,
    originalPrice: 89.99,
    costPrice: 32.0,
    category: "Electronics",
    sku: "ELEC-HP-001",
    image: "https://placehold.co/400x400?text=Headphones",
    rating: 4.5,
    stock: 25,
    lowStockThreshold: 10,
    isActive: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-07-01T09:30:00Z",
  },
  {
    id: "2",
    title: "Running Shoes",
    description: "Lightweight breathable running shoes for daily training.",
    price: 45.0,
    costPrice: 22.5,
    category: "Footwear",
    sku: "FOOT-RS-002",
    image: "https://placehold.co/400x400?text=Shoes",
    rating: 4.2,
    stock: 40,
    lowStockThreshold: 15,
    isActive: true,
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-06-20T14:00:00Z",
  },
  {
    id: "3",
    title: "Stainless Steel Water Bottle",
    description: "Insulated bottle keeps drinks cold for 24 hours or hot for 12.",
    price: 19.99,
    originalPrice: 24.99,
    costPrice: 8.0,
    category: "Home",
    sku: "HOME-WB-003",
    image: "https://placehold.co/400x400?text=Bottle",
    rating: 4.8,
    stock: 8,
    lowStockThreshold: 10,
    isActive: true,
    createdAt: "2026-03-05T10:00:00Z",
    updatedAt: "2026-07-15T11:00:00Z",
  },
  {
    id: "4",
    title: "Cotton Crew Neck T-Shirt",
    description: "Soft, breathable everyday t-shirt, available in multiple colors.",
    price: 14.99,
    costPrice: 5.5,
    category: "Clothing",
    sku: "CLOT-TS-004",
    image: "https://placehold.co/400x400?text=T-Shirt",
    rating: 4.0,
    stock: 60,
    lowStockThreshold: 20,
    isActive: false,
    createdAt: "2026-04-20T10:00:00Z",
    updatedAt: "2026-05-30T16:00:00Z",
  },
]

// ── Orders ──────────────────────────────────────────────

export const mockAdminOrders: AdminOrder[] = [
  {
    id: "ORD-1001",
    customerName: "Dammar Bhatt",
    customerEmail: "dammar@example.com",
    items: [
      {
        productId: "1",
        title: "Wireless Bluetooth Headphones",
        image: "https://placehold.co/100x100?text=Headphones",
        price: 59.99,
        quantity: 1,
      },
    ],
    subtotal: 59.99,
    shippingCost: 5.0,
    total: 64.99,
    status: "Delivered",
    statusHistory: [
      { status: "Pending", timestamp: "2026-07-10T09:00:00Z" },
      { status: "Processing", timestamp: "2026-07-10T14:00:00Z" },
      { status: "Shipped", timestamp: "2026-07-12T08:00:00Z" },
      { status: "Delivered", timestamp: "2026-07-14T16:00:00Z" },
    ],
    shippingAddress: {
      fullName: "Dammar Bhatt",
      address: "123 Durbar Marg",
      city: "Kathmandu",
      postalCode: "44600",
      phone: "9800000000",
    },
    paymentMethod: "Cash on Delivery",
    createdAt: "2026-07-10T09:00:00Z",
  },
  {
    id: "ORD-1002",
    customerName: "Sita Rai",
    customerEmail: "sita@example.com",
    items: [
      {
        productId: "2",
        title: "Running Shoes",
        image: "https://placehold.co/100x100?text=Shoes",
        price: 45.0,
        quantity: 1,
      },
    ],
    subtotal: 45.0,
    shippingCost: 5.0,
    total: 50.0,
    status: "Shipped",
    statusHistory: [
      { status: "Pending", timestamp: "2026-07-18T10:00:00Z" },
      { status: "Processing", timestamp: "2026-07-18T15:00:00Z" },
      { status: "Shipped", timestamp: "2026-07-20T09:00:00Z" },
    ],
    shippingAddress: {
      fullName: "Sita Rai",
      address: "45 Baneshwor",
      city: "Kathmandu",
      postalCode: "44601",
      phone: "9811111111",
    },
    paymentMethod: "Card",
    createdAt: "2026-07-18T10:00:00Z",
  },
  {
    id: "ORD-1003",
    customerName: "Hari Thapa",
    customerEmail: "hari@example.com",
    items: [
      {
        productId: "3",
        title: "Stainless Steel Water Bottle",
        image: "https://placehold.co/100x100?text=Bottle",
        price: 19.99,
        quantity: 1,
      },
    ],
    subtotal: 19.99,
    shippingCost: 5.0,
    total: 24.99,
    status: "Processing",
    statusHistory: [
      { status: "Pending", timestamp: "2026-07-22T11:00:00Z" },
      { status: "Processing", timestamp: "2026-07-22T16:00:00Z" },
    ],
    shippingAddress: {
      fullName: "Hari Thapa",
      address: "12 Patan Durbar Square",
      city: "Lalitpur",
      postalCode: "44700",
      phone: "9822222222",
    },
    paymentMethod: "Cash on Delivery",
    createdAt: "2026-07-22T11:00:00Z",
  },
  {
    id: "ORD-1004",
    customerName: "Gita Shrestha",
    customerEmail: "gita@example.com",
    items: [
      {
        productId: "1",
        title: "Wireless Bluetooth Headphones",
        image: "https://placehold.co/100x100?text=Headphones",
        price: 59.99,
        quantity: 2,
      },
    ],
    subtotal: 119.98,
    shippingCost: 5.0,
    total: 124.98,
    status: "Cancelled",
    statusHistory: [
      { status: "Pending", timestamp: "2026-07-24T09:00:00Z" },
      { status: "Cancelled", timestamp: "2026-07-24T12:00:00Z", note: "Customer requested cancellation" },
    ],
    shippingAddress: {
      fullName: "Gita Shrestha",
      address: "8 New Road",
      city: "Kathmandu",
      postalCode: "44600",
      phone: "9833333333",
    },
    paymentMethod: "Card",
    createdAt: "2026-07-24T09:00:00Z",
  },
]

// ── Users ───────────────────────────────────────────────

export const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Dammar Bhatt",
    email: "dammar@example.com",
    role: "admin",
    status: "active",
    totalOrders: 5,
    totalSpent: 320.5,
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Sita Rai",
    email: "sita@example.com",
    role: "user",
    status: "active",
    totalOrders: 3,
    totalSpent: 150.0,
    joinedDate: "2025-03-22",
  },
  {
    id: "3",
    name: "Hari Thapa",
    email: "hari@example.com",
    role: "user",
    status: "suspended",
    totalOrders: 1,
    totalSpent: 24.99,
    joinedDate: "2025-06-10",
  },
  {
    id: "4",
    name: "Gita Shrestha",
    email: "gita@example.com",
    role: "user",
    status: "active",
    totalOrders: 2,
    totalSpent: 124.98,
    joinedDate: "2025-07-01",
  },
]


export const mockCategoryBreakdown: CategoryBreakdown[] = [
  { category: "Electronics", revenue: 9358.44, unitsSold: 156 },
  { category: "Footwear", revenue: 2880.0, unitsSold: 64 },
  { category: "Home", revenue: 1959.02, unitsSold: 98 },
  { category: "Clothing", revenue: 630.5, unitsSold: 42 },
]

export const mockCustomerMetric: CustomerMetric = {
  newCustomers: 34,
  returningCustomers: 94,
}

// Extended revenue data for 30d/90d views (reusing pattern from mockRevenueData)
export const mockRevenueData30d = Array.from({ length: 30 }, (_, i) => {
  const date = new Date("2026-07-26")
  date.setDate(date.getDate() - (29 - i))
  return {
    date: date.toISOString().split("T")[0],
    revenue: Math.round((300 + Math.random() * 700) * 100) / 100,
    orders: Math.floor(8 + Math.random() * 20),
  }
})


export const mockReviews: ProductReview[] = [
  {
    id: "REV-001",
    productId: "1",
    productTitle: "Wireless Bluetooth Headphones",
    productImage: "https://placehold.co/100x100?text=Headphones",
    customerName: "Sita Rai",
    rating: 5,
    comment: "Amazing sound quality and the noise cancellation actually works great during my commute.",
    status: "approved",
    storeReply: "Thank you so much for the kind words, Sita!",
    createdAt: "2026-07-15T10:00:00Z",
  },
  {
    id: "REV-002",
    productId: "1",
    productTitle: "Wireless Bluetooth Headphones",
    productImage: "https://placehold.co/100x100?text=Headphones",
    customerName: "Hari Thapa",
    rating: 2,
    comment: "Battery drains faster than advertised. Disappointed after just 2 weeks of use.",
    status: "pending",
    createdAt: "2026-07-24T14:00:00Z",
  },
  {
    id: "REV-003",
    productId: "2",
    productTitle: "Running Shoes",
    productImage: "https://placehold.co/100x100?text=Shoes",
    customerName: "Gita Shrestha",
    rating: 4,
    comment: "Comfortable for daily runs, true to size. Would buy again in a different color.",
    status: "approved",
    createdAt: "2026-07-20T09:00:00Z",
  },
  {
    id: "REV-004",
    productId: "3",
    productTitle: "Stainless Steel Water Bottle",
    productImage: "https://placehold.co/100x100?text=Bottle",
    customerName: "Anonymous User",
    rating: 1,
    comment: "Buy this product now click here for free gift www.spam-link-example.com",
    status: "pending",
    createdAt: "2026-07-25T18:00:00Z",
  },
]


export const mockMessages: ContactMessage[] = [
  {
    id: "MSG-001",
    name: "Sita Rai",
    email: "sita@example.com",
    subject: "Order inquiry",
    message: "Hi, I placed an order last week (ORD-1002) but haven't received a shipping update yet. Could you check the status for me?",
    isRead: false,
    createdAt: "2026-07-25T09:00:00Z",
  },
  {
    id: "MSG-002",
    name: "Hari Thapa",
    email: "hari@example.com",
    subject: "Product question",
    message: "Does the Wireless Bluetooth Headphones come with a warranty? I couldn't find this info on the product page.",
    isRead: true,
    adminReply: "Hi Hari, yes! All our electronics come with a 1-year manufacturer warranty. Let us know if you need anything else.",
    createdAt: "2026-07-22T14:00:00Z",
  },
  {
    id: "MSG-003",
    name: "Gita Shrestha",
    email: "gita@example.com",
    subject: "Return request",
    message: "I'd like to return the item from my recent order. It arrived slightly damaged. Please advise on next steps.",
    isRead: false,
    createdAt: "2026-07-26T11:30:00Z",
  },
]


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