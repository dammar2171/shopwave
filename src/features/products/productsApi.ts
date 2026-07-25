import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product } from './types'
import mockProducts from './mockProducts.json'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        // Simulate network delay so loading states are visible/testable
        await new Promise((resolve) => setTimeout(resolve, 600))
        return { data: mockProducts as Product[] }
      },
    }),
    getProductById: builder.query<Product | undefined, string>({
      queryFn: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const product = (mockProducts as Product[]).find((p) => p.id === id)
        return { data: product }
      },
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi