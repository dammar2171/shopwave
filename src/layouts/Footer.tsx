import { Link } from "react-router-dom";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Shop: [
    { label: "All Products", to: "/products" },
    { label: "Cart", to: "/cart" },
    { label: "Wishlist", to: "/wish-list" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  Support: [
    { label: "Shipping Info", to: "/shipping" },
    { label: "Returns", to: "/returns" },
    { label: "FAQ", to: "/faq" },
  ],
};

const socialLinks = [
  { icon: SiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: SiX, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="font-bold text-lg text-primary">
              ShopWave
            </Link>
            <p className="text-sm text-muted-foreground">
              Quality products, delivered fast. Shop with confidence.
            </p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="space-y-3">
              <h3 className="text-sm font-semibold">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopWave. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
