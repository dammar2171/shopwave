import { ModeToggle } from "@/components/mode-toggle";
import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex gap-4">
        <Link to="/" className="font-bold text-primary">
          ShopWave
        </Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/design-system">Design</Link>
        <ModeToggle />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t p-4 text-center text-muted">
        © 2026 ShopWave
      </footer>
    </div>
  );
}

export default MainLayout;
