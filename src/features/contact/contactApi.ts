import { baseApi } from "@/services/apiClient"
import type { ContactMessage } from "./types"

interface MessagesResponse {
  success: boolean
  data: ContactMessage[]
}

interface MessageResponse {
  success: boolean
  data: ContactMessage
}

interface CreateMessageInput {
  name: string
  email: string
  subject: string
  message: string
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitMessage: builder.mutation<MessageResponse, CreateMessageInput>({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
    }),

    getMessages: builder.query<MessagesResponse, void>({
      query: () => "/contact",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "ContactMessage" as const, id })),
              { type: "ContactMessage" as const, id: "LIST" },
            ]
          : [{ type: "ContactMessage" as const, id: "LIST" }],
    }),

    markAsRead: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `/contact/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ContactMessage", id },
        { type: "ContactMessage", id: "LIST" },
      ],
    }),

    replyToMessage: builder.mutation<MessageResponse, { id: string; adminReply: string }>({
      query: ({ id, adminReply }) => ({
        url: `/contact/${id}/reply`,
        method: "PATCH",
        body: { adminReply },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ContactMessage", id },
        { type: "ContactMessage", id: "LIST" },
      ],
    }),

    deleteMessage: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ContactMessage", id: "LIST" }],
    }),
  }),
})

export const {
  useSubmitMessageMutation,
  useGetMessagesQuery,
  useMarkAsReadMutation,
  useReplyToMessageMutation,
  useDeleteMessageMutation,
} = contactApi