import { useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { OrderDetailDialog } from "./OrderDetailDialog";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/features/orders/ordersApi";
import type { Order, OrderStatus } from "@/features/orders/types";

const statusVariant: Record<
  OrderStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "outline",
  PROCESSING: "default",
  SHIPPED: "default",
  DELIVERED: "secondary",
  CANCELLED: "destructive",
  REFUNDED: "destructive",
};

const statusFilters: Array<OrderStatus | "All"> = [
  "All",
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: response, isLoading } = useGetAllOrdersQuery({
    status: statusFilter !== "All" ? statusFilter : undefined,
  });
  const [updateStatus] = useUpdateOrderStatusMutation();

  const orders = response?.data ?? [];

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingFullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    try {
      const result = await updateStatus({
        id: orderId,
        status: newStatus,
      }).unwrap();
      setSelectedOrder(result.data);
      toast.success(`Order marked as ${newStatus}`);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update order status");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 sm:top-1/4 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input hover:bg-accent text-muted-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium">Order ID</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Items</th>
                <th className="text-left p-4 font-medium">Total</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {!isLoading && filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="border-b last:border-0 cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4 font-medium">
                    {order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="p-4">{order.shippingFullName}</td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)}{" "}
                    item(s)
                  </td>
                  <td className="p-4 font-medium">
                    ${Number(order.total).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <Badge variant={statusVariant[order.status]}>
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <OrderDetailDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default AdminOrdersPage;
