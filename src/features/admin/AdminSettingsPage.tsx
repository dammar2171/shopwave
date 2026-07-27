import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  mockStoreSettings,
  mockShippingSettings,
  mockNotificationSettings,
} from "./mockAdminData";
import {
  storeSettingsSchema,
  shippingSettingsSchema,
  type StoreSettingsValues,
  type ShippingSettingsValues,
} from "./schemas/settingsSchema";
import type { NotificationSettings } from "./types";

function AdminSettingsPage() {
  const [notifications, setNotifications] = useState<NotificationSettings>(
    mockNotificationSettings,
  );

  const storeForm = useForm<StoreSettingsValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: mockStoreSettings,
  });

  const shippingForm = useForm<ShippingSettingsValues>({
    resolver: zodResolver(shippingSettingsSchema),
    defaultValues: mockShippingSettings,
  });

  function onSaveStore(values: StoreSettingsValues) {
    // No backend yet — simulate save
    console.log("Store settings saved:", values);
    toast.success("Store settings updated!");
  }

  function onSaveShipping(values: ShippingSettingsValues) {
    console.log("Shipping settings saved:", values);
    toast.success("Shipping & tax settings updated!");
  }

  function toggleNotification(key: keyof NotificationSettings) {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.success("Notification preference updated!");
      return updated;
    });
  }

  const notificationItems: {
    key: keyof NotificationSettings;
    label: string;
    desc: string;
  }[] = [
    {
      key: "emailOnNewOrder",
      label: "New Order Alerts",
      desc: "Get an email whenever a new order is placed",
    },
    {
      key: "emailOnLowStock",
      label: "Low Stock Alerts",
      desc: "Get an email when a product falls below its stock threshold",
    },
    {
      key: "emailOnNewReview",
      label: "New Review Alerts",
      desc: "Get an email whenever a customer leaves a product review",
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Store Info</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Tax</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Store Info */}
        <TabsContent value="store">
          <Card>
            <CardContent className="pt-6">
              <Form {...storeForm}>
                <form
                  onSubmit={storeForm.handleSubmit(onSaveStore)}
                  className="space-y-4"
                >
                  <FormField
                    control={storeForm.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={storeForm.control}
                    name="storeEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Support Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={storeForm.control}
                    name="storePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={storeForm.control}
                    name="storeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={storeForm.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <FormControl>
                          <select
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                            {...field}
                          >
                            <option value="USD">USD ($)</option>
                            <option value="NPR">NPR (Rs.)</option>
                            <option value="EUR">EUR (€)</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping & Tax */}
        <TabsContent value="shipping">
          <Card>
            <CardContent className="pt-6">
              <Form {...shippingForm}>
                <form
                  onSubmit={shippingForm.handleSubmit(onSaveShipping)}
                  className="space-y-4"
                >
                  <FormField
                    control={shippingForm.control}
                    name="flatShippingRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flat Shipping Rate ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            name={field.name}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shippingForm.control}
                    name="freeShippingThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Shipping Above ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            name={field.name}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shippingForm.control}
                    name="taxRatePercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            name={field.name}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {notificationItems.map(({ key, label, desc }, index) => (
                <div key={key}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={notifications[key]}
                      onClick={() => toggleNotification(key)}
                      className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
                        notifications[key] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0 h-5 w-5 rounded-full bg-white transition-transform ${
                          notifications[key]
                            ? "translate-x-5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  {index < notificationItems.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminSettingsPage;
