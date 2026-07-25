export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  stock: number
}