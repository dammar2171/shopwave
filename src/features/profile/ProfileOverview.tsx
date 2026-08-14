import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useTheme } from "@/components/theme-provider";
import { setCredentials } from "@/features/auth/authSlice";
import { useUpdateMyProfileMutation } from "@/features/users/usersApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { theme, setTheme } = useTheme();
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name, email: user.email });
    }
  }, [user]);

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
  ];

  async function onSubmit(values: DetailsFormValues) {
    if (!accessToken) return;

    try {
      const response = await updateMyProfile(values).unwrap();

      dispatch(
        setCredentials({
          user: response.data,
          accessToken,
        }),
      );

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update profile");
    }
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold">My Details</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update your personal information
        </p>
      </div>

      <Card className="max-w-6xl">
        <CardContent className="pt-6">
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
                  {user?.role.toLowerCase()}
                </p>
              </div>

              <Button
                type="submit"
                disabled={!form.formState.isDirty || isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Saving..." : "Save Changes"}
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
