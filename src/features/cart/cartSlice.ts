import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartState, CartItem } from "./types"
import type { Product } from "../products/types"

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product, quantity: 1 })
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.product.id !== productId)
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload
      const item = state.items.find((item) => item.product.id === productId)

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer