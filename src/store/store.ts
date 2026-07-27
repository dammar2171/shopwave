import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { productsApi } from '@/features/products/productsApi'
import cartReducer from '@/features/cart/cartSlice';
import wishlistReducer from '@/features/wishlist/wishlistSlice'
import authReducer from '@/features/auth/authSlice'
import reviewsReducer from '../features/reviews/reviewsSlice'
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,cart: cartReducer,wishlist: wishlistReducer,auth: authReducer,reviews:reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware as Middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;