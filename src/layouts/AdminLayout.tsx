import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  BarChart3,
  Star,
  Mail,
  Settings,
  Menu,
  LogOutIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/authSlice";

const adminNavItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Categories", to: "/admin/categories", icon: Tags },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Reviews", to: "/admin/reviews", icon: Star },
  { label: "Messages", to: "/admin/contacts", icon: Mail },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <>
      <Link to="/" className="block font-bold text-lg text-primary mb-6 px-2">
        ShopWave{" "}
        <span className="text-muted-foreground text-sm font-normal">Admin</span>
      </Link>

      <nav className="space-y-1">
        {adminNavItems.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
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
      </nav>
      <div className="mt-4 pt-4 border-t space-y-2">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent w-full text-left"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </button>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </>
  );
}

function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar - hidden below lg */}
      <aside className="w-64 border-r bg-secondary/30 p-4 hidden lg:block">
        <SidebarNav />
      </aside>

      {/* Mobile/tablet sidebar - slide-out sheet */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-64 p-4">
          <SidebarNav onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar - visible below lg, shows hamburger */}
        <header className="lg:hidden sticky top-0 z-30 border-b bg-background flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
          <span className="font-semibold text-sm">
            {user?.name ? `Hi, ${user.name}` : "Admin"}
          </span>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
