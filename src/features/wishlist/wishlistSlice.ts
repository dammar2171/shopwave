import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { WishlistState } from "./types"
import type { Product } from "../products/types"

const WISHLIST_STORAGE_KEY = "shopwave-wishlist"

function loadWishlistFromStorage(): WishlistState {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [] }
  } catch {
    return { items: [] }
  }
}

function saveWishlistToStorage(state: WishlistState) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage might be full or disabled — fail silently, wishlist still works in-memory
  }
}

const initialState: WishlistState = loadWishlistFromStorage()

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const exists = state.items.some((item) => item.id === product.id)

      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id)
      } else {
        state.items.push(product)
      }

      saveWishlistToStorage(state)
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveWishlistToStorage(state)
    },

    clearWishlist: (state) => {
      state.items = []
      saveWishlistToStorage(state)
    },
  },
})

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions

export default wishlistSlice.reducer