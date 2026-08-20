import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartState, CartItem } from "./types"
import type { Product } from "../products/types"

const CART_STORAGE_KEY = "shopwave-cart"

function loadCartFromStorage(): CartState {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [] }
  } catch {
    return { items: [] }
  }
}

function saveCartToStorage(state: CartState) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage might be full or disabled — fail silently, cart still works in-memory
  }
}

const initialState: CartState = loadCartFromStorage()

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

      saveCartToStorage(state)
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.product.id !== productId)
      saveCartToStorage(state)
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

      saveCartToStorage(state)
    },

    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer