import { useState } from "react";
import {
  Search,
  MoreVertical,
  ShieldCheck,
  ShieldOff,
  UserX,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/features/users/usersApi";
import type { AdminUser } from "@/features/users/types";

type PendingAction =
  | { type: "promote" | "demote"; user: AdminUser }
  | { type: "suspend" | "reactivate"; user: AdminUser }
  | null;

function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: response, isLoading } = useGetUsersQuery({
    search: searchQuery || undefined,
  });
  const [updateRole] = useUpdateUserRoleMutation();
  const [updateStatus] = useUpdateUserStatusMutation();

  const users = response?.data ?? [];

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  async function confirmAction() {
    if (!pendingAction) return;
    const { type, user } = pendingAction;

    try {
      if (type === "promote") {
        await updateRole({ id: user.id, role: "ADMIN" }).unwrap();
        toast.success(`${user.name} is now an admin.`);
      } else if (type === "demote") {
        await updateRole({ id: user.id, role: "USER" }).unwrap();
        toast.success(`${user.name} is no longer an admin.`);
      } else if (type === "suspend") {
        await updateStatus({ id: user.id, status: "SUSPENDED" }).unwrap();
        toast.success(`${user.name}'s account has been suspended.`);
      } else {
        await updateStatus({ id: user.id, status: "ACTIVE" }).unwrap();
        toast.success(`${user.name}'s account has been reactivated.`);
      }
      setPendingAction(null);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
      setPendingAction(null);
    }
  }

  const dialogText = {
    promote: {
      title: "Promote to Admin?",
      desc: "This user will gain full access to the admin dashboard, including managing products, orders, and other users.",
      confirmLabel: "Promote to Admin",
    },
    demote: {
      title: "Remove Admin Access?",
      desc: "This user will lose access to the admin dashboard and revert to a regular customer account.",
      confirmLabel: "Remove Admin Access",
    },
    suspend: {
      title: "Suspend this account?",
      desc: "The user will be unable to log in until reactivated. Their order history will be preserved.",
      confirmLabel: "Suspend Account",
    },
    reactivate: {
      title: "Reactivate this account?",
      desc: "The user will regain the ability to log in normally.",
      confirmLabel: "Reactivate Account",
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Orders</th>
                <th className="text-left p-4 font-medium">Joined</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {!isLoading && users.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              )}
              {users.map((user) => {
                const orderCount = user._count?.orders ?? 0;
                return (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <Badge
                        variant={user.role === "ADMIN" ? "default" : "outline"}
                      >
                        {user.role.toLowerCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "secondary" : "destructive"
                        }
                      >
                        {user.status.toLowerCase()}
                      </Badge>
                    </td>
                    <td className="p-4">{orderCount}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.role === "USER" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                setPendingAction({ type: "promote", user })
                              }
                            >
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Promote to Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                setPendingAction({ type: "demote", user })
                              }
                            >
                              <ShieldOff className="h-4 w-4 mr-2" />
                              Remove Admin Access
                            </DropdownMenuItem>
                          )}

                          {user.status === "ACTIVE" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                setPendingAction({ type: "suspend", user })
                              }
                              className="text-destructive"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                setPendingAction({ type: "reactivate", user })
                              }
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Reactivate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!pendingAction}
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <AlertDialogContent>
          {pendingAction && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {dialogText[pendingAction.type].title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {dialogText[pendingAction.type].desc}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmAction}
                  className={
                    pendingAction.type === "suspend" ||
                    pendingAction.type === "demote"
                      ? "bg-destructive text-white hover:bg-destructive/90"
                      : ""
                  }
                >
                  {dialogText[pendingAction.type].confirmLabel}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AdminUsersPage;
