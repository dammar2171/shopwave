import { z } from "zod"

export const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  originalPrice: z.number().optional(),
  costPrice: z.number().min(0, "Cost price cannot be negative"),
  categoryId: z.string().min(1, "Select a category"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  lowStockThreshold: z.number().int().min(0),
  image: z.string().url("Enter a valid image URL"),
  isActive: z.boolean(),
})

export type ProductFormValues = z.infer<typeof productSchema>