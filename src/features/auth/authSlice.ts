import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, User } from "./types"

const stored = localStorage.getItem("auth")
const parsed = stored ? JSON.parse(stored) : null

const initialState: AuthState = {
  user: parsed?.user ?? null,
  token: parsed?.token ?? null,
  isAuthenticated: !!parsed,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem("auth", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("auth")
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer