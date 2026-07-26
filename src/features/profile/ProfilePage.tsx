import { Outlet, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { User, Lock, Package, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logout } from "../auth/authSlice";

const userNavItems = [
  { label: "My Details", to: "/profile", icon: User, end: true },
  { label: "Change Password", to: "/profile/change-password", icon: Lock },
  { label: "Order History", to: "/profile/orders", icon: Package },
];

function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-[220px_1fr] gap-8">
      {/* Sidebar */}
      <aside className="space-y-1">
        <Card>
          <CardContent className="p-2 space-y-2">
            <p className="text-sm text-muted-foreground mb-3 px-3">
              Hi, {user?.name}
            </p>
            {userNavItems.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent",
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
            <Button
              variant={"destructive"}
              onClick={() => dispatch(logout())}
              className={"w-full md:mt-20"}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </aside>

      {/* Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
