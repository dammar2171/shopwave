import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { productsApi } from '@/features/products/productsApi'
import cartReducer from '@/features/cart/cartSlice';
import wishlistReducer from '@/features/wishlist/wishlistSlice'
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,cart: cartReducer,wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware as Middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;