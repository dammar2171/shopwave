import { baseApi } from "@/services/apiClient"
import type { AdminUser, UserRole, AccountStatus } from "./types"

interface UsersResponse {
  success: boolean
  data: AdminUser[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface UserResponse {
  success: boolean
  data: AdminUser
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, { search?: string } | void>({
      query: (params) => ({
        url: "/users",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),

    updateUserRole: builder.mutation<UserResponse, { id: string; role: UserRole }>({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    updateUserStatus: builder.mutation<
      UserResponse,
      { id: string; status: AccountStatus }
    >({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} = usersApi