import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <Reveal className="space-y-6 text-center md:text-left">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            New Season Arrivals
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Shop Smarter,
            <br />
            Live Better
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto md:mx-0">
            Discover quality products at honest prices, delivered right to your
            door.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <Link to="/products" className={cn(buttonVariants({ size: "lg" }))}>
              Shop Now
            </Link>
            <Link
              to="/products"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Browse Categories
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.5} className="relative">
          <img
            src="https://brightandfly.in/cdn/shop/files/navybluemensformallinenshirtsonsale.jpg?v=1722081634&width=1946"
            alt="Featured products"
            className="rounded-2xl w-full h-100 object-cover shadow-lg"
          />
        </Reveal>
      </div>
    </section>
  );
}
