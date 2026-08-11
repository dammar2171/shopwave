export interface Category {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  costPrice: number
  sku: string
  image: string
  stock: number
  lowStockThreshold: number
  isActive: boolean
  rating: number
  category: Category
  createdAt: string
  updatedAt: string
}