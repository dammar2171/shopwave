import { useEffect } from "react";
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
  useGetSettingsQuery,
  useUpdateStoreSettingsMutation,
  useUpdateShippingSettingsMutation,
  useUpdateNotificationSettingsMutation,
} from "@/features/admin/settings/settingsApi";
import {
  storeSettingsSchema,
  shippingSettingsSchema,
  type StoreSettingsValues,
  type ShippingSettingsValues,
} from "./schemas/settingsSchema";

function AdminSettingsPage() {
  const { data: response, isLoading } = useGetSettingsQuery();
  const [updateStore, { isLoading: isSavingStore }] =
    useUpdateStoreSettingsMutation();
  const [updateShipping, { isLoading: isSavingShipping }] =
    useUpdateShippingSettingsMutation();
  const [updateNotifications] = useUpdateNotificationSettingsMutation();

  const settings = response?.data;

  const storeForm = useForm<StoreSettingsValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      storeName: "",
      storeEmail: "",
      storePhone: "",
      storeAddress: "",
      currency: "USD",
    },
  });

  const shippingForm = useForm<ShippingSettingsValues>({
    resolver: zodResolver(shippingSettingsSchema),
    defaultValues: {
      flatShippingRate: 0,
      freeShippingThreshold: 0,
      taxRatePercent: 0,
    },
  });

  // Once real settings load, populate both forms with real values
  useEffect(() => {
    if (settings) {
      storeForm.reset({
        storeName: settings.storeName,
        storeEmail: settings.storeEmail,
        storePhone: settings.storePhone,
        storeAddress: settings.storeAddress,
        currency: settings.currency,
      });
      shippingForm.reset({
        flatShippingRate: Number(settings.flatShippingRate),
        freeShippingThreshold: Number(settings.freeShippingThreshold),
        taxRatePercent: Number(settings.taxRatePercent),
      });
    }
  }, [settings]);

  async function onSaveStore(values: StoreSettingsValues) {
    try {
      await updateStore(values).unwrap();
      toast.success("Store settings updated!");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to save store settings");
    }
  }

  async function onSaveShipping(values: ShippingSettingsValues) {
    try {
      await updateShipping(values).unwrap();
      toast.success("Shipping & tax settings updated!");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to save shipping settings");
    }
  }

  async function toggleNotification(
    key: "emailOnNewOrder" | "emailOnLowStock" | "emailOnNewReview",
  ) {
    if (!settings) return;
    try {
      await updateNotifications({
        emailOnNewOrder:
          key === "emailOnNewOrder"
            ? !settings.emailOnNewOrder
            : settings.emailOnNewOrder,
        emailOnLowStock:
          key === "emailOnLowStock"
            ? !settings.emailOnLowStock
            : settings.emailOnLowStock,
        emailOnNewReview:
          key === "emailOnNewReview"
            ? !settings.emailOnNewReview
            : settings.emailOnNewReview,
      }).unwrap();
      toast.success("Notification preference updated!");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update preference");
    }
  }

  const notificationItems = [
    {
      key: "emailOnNewOrder" as const,
      label: "New Order Alerts",
      desc: "Get an email whenever a new order is placed",
    },
    {
      key: "emailOnLowStock" as const,
      label: "Low Stock Alerts",
      desc: "Get an email when a product falls below its stock threshold",
    },
    {
      key: "emailOnNewReview" as const,
      label: "New Review Alerts",
      desc: "Get an email whenever a customer leaves a product review",
    },
  ];

  if (isLoading || !settings) {
    return <p className="text-sm text-muted-foreground">Loading settings...</p>;
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Store Info</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Tax</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

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

                  <Button type="submit" disabled={isSavingStore}>
                    {isSavingStore ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

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

                  <Button type="submit" disabled={isSavingShipping}>
                    {isSavingShipping ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

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
                      aria-checked={settings[key]}
                      onClick={() => toggleNotification(key)}
                      className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
                        settings[key] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0
                           h-5 w-5 rounded-full bg-white transition-transform ${
                             settings[key] ? "translate-x-5" : "translate-x-0.5"
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
