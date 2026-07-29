import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clearCart } from "@/features/cart/cartSlice";
import { checkoutSchema, type CheckoutFormValues } from "./checkoutSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    },
  });

  function onSubmit(values: CheckoutFormValues) {
    // No real backend yet — simulate order placement
    console.log("Order placed:", { values, items, subtotal });
    toast.success("Order placed successfully!");
    dispatch(clearCart());
    navigate("/orders");
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-muted-foreground">
          Your cart is empty — add items before checking out.
        </p>
      </div>
    );
  }

  return (
    <Reveal className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Form */}
      <div>
        <h1 className="text-xl font-bold mb-4">Shipping Details</h1>
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Kathmandu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="44600" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="9800000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full">
                  Place Order
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Order summary */}
      <div>
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <Card>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.product.title} × {item.quantity}
                  </span>
                  <span>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Separator className="my-4" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </Reveal>
  );
}

export default CheckoutPage;
