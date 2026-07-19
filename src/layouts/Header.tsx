import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Wish List", to: "/wish-list" },
  { label: "Design", to: "/design-System" },
];

// Temporary hardcoded value — will come from Redux cartSlice on Day 5-ish
const cartItemCount = 0;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/75">
      <div className="mx-auto max-w-7xl flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-3xl text-primary">
          SWave
        </Link>

        {/* Desktop nav - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          <Link
            to="/cart"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "relative",
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden md:inline-flex",
            )}
          >
            Login
          </Link>

          {/* Mobile menu trigger - hidden on desktop */}
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-base font-medium ms-4 py-1.5 px-1 hover:bg-accent-foreground hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/login" className="text-base ms-4 font-medium">
                  Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
