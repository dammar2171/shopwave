import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! Watch your inbox for deals.");
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center space-y-4">
      <h2 className="text-2xl font-bold">Get 10% Off Your First Order</h2>
      <p className="text-muted-foreground">
        Subscribe to our newsletter for exclusive deals and updates.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </section>
  );
}
