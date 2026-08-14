export type UserRole = "USER" | "ADMIN"
export type AccountStatus = "ACTIVE" | "SUSPENDED"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: AccountStatus
  createdAt: string
  _count?: { orders: number }
}