import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceTag } from "@/components/price-tag";
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
      <Separator />
    </div>
  );
}

function DesignSystemPage() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Design System</h1>

      <Section title="Buttons">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </Section>

      <Section title="Inputs">
        <div className="space-y-2 w-full max-w-sm">
          <Label htmlFor="demo-input">Email</Label>
          <Input id="demo-input" placeholder="you@example.com" />
        </div>
      </Section>

      <Section title="Badges">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Section>

      <Section title="Price Tag">
        <PriceTag price={29.99} />
        <PriceTag price={19.99} originalPrice={39.99} />
      </Section>

      <Section title="Card">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Sample Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is card content used across product and order displays.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Product Card Skeleton">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export default DesignSystemPage;
