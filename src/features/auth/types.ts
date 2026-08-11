export type UserRole = "USER" | "ADMIN"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
}