import { Link } from "react-router-dom";
import { Target, Heart, Leaf, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To make quality products accessible and affordable for everyone, without compromising on service.",
  },
  {
    icon: Heart,
    title: "Customer First",
    desc: "Every decision we make starts with one question: does this genuinely help our customers?",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We partner with suppliers who share our commitment to responsible, ethical sourcing.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We're proud to support local businesses and give back to the communities we serve.",
  },
];

const stats = [
  { label: "Happy Customers", value: "50,000+" },
  { label: "Products", value: "2,000+" },
  { label: "Countries Served", value: "5" },
  { label: "Years of Service", value: "8" },
];

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Built for People Who Value Quality
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ShopWave started with a simple idea: shopping online shouldn't mean
            settling for less. Today, we bring that same standard to everything
            we sell.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://thumbs.dreamstime.com/b/our-story-blue-business-symbols-circles-triangle-text-concept-image-293025030.jpg"
          alt="ShopWave team"
          className="rounded-2xl w-full object-cover shadow-lg"
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">How It Started</h2>
          <p className="text-muted-foreground leading-relaxed">
            We founded ShopWave in 2018 with a small catalog of everyday
            essentials and a simple promise: fair prices, honest descriptions,
            and fast delivery. What began as a two-person operation has grown
            into a trusted destination for thousands of shoppers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We still operate by the same principles today — every product is
            checked for quality before it reaches our shelves, and every
            customer question gets a real, human response.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${index < 3 ? "border-r-2" : ""}`}
            >
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <Card className="hover:bg-accent">
              <CardContent>
                <div key={title} className="text-center space-y-3">
                  <div className="h-14 w-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to Start Shopping?</h2>
        <p className="text-muted-foreground">
          Browse our full catalog and see why thousands of customers trust
          ShopWave.
        </p>
        <Link to="/products" className={cn(buttonVariants({ size: "lg" }))}>
          Explore Products
        </Link>
      </section>
    </div>
  );
}

export default AboutPage;
