import { baseApi } from "@/services/apiClient"
import type { User } from "./types"

interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    accessToken: string
  }
}

interface RefreshResponse {
  success: boolean
  data: {
    accessToken: string
  }
}

interface UserResponse {
  success: boolean
  data: User
}

interface ChangePasswordResponse {
  success: boolean
  message: string
}

interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, { name: string; email: string; password: string }>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordInput>({
        query: (body) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body,
      }),
    }),

    getMe: builder.query<UserResponse, void>({
      query: () => "/users/me",
    }),

    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useChangePasswordMutation
} = authApi