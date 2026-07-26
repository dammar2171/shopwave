import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useTheme } from "@/components/theme-provider";
import { setCredentials } from "@/features/auth/authSlice";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const detailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

function ProfileOverview() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const { theme, setTheme } = useTheme();

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
  ];

  function onSubmit(values: DetailsFormValues) {
    if (!user || !token) return;

    // No backend yet — update Redux directly to simulate a saved profile
    dispatch(
      setCredentials({
        user: { ...user, name: values.name, email: values.email },
        token,
      }),
    );
    toast.success("Profile updated successfully!");
  }

  return (
    <div className="space-y-8 ">
      <h1 className="text-xl font-bold">My Details</h1>
      <Card>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
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

              <div>
                <Label className="text-muted-foreground text-xs">
                  Account Type
                </Label>
                <p className="font-medium text-sm mt-1 capitalize">
                  {user?.role}
                </p>
              </div>

              <Button
                type="submit"
                disabled={!form.formState.isDirty}
                className="w-full sm:w-auto"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Separator />

      <div>
        <h2 className="text-sm font-semibold mb-3">Appearance</h2>
        <div className="flex gap-2">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant="outline"
              size="sm"
              onClick={() => setTheme(value)}
              className={cn(
                theme === value && "border-primary text-primary bg-primary/5",
              )}
            >
              <Icon className="h-4 w-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
