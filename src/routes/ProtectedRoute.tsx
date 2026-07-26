import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/hooks/reduxHooks"
import type { UserRole } from "@/features/auth/types"

interface ProtectedRouteProps {
  requiredRole?: UserRole
}

function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector((state) => state.auth.user)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute