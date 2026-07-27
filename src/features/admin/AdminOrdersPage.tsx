import { useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { OrderDetailDialog } from "./OrderDetailDialog";
import { mockAdminOrders as initialOrders } from "./mockAdminData";
import type { AdminOrder, OrderStatus } from "./types";

const statusVariant: Record<
  OrderStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Pending: "outline",
  Processing: "default",
  Shipped: "default",
  Delivered: "secondary",
  Cancelled: "destructive",
  Refunded: "destructive",
};

const statusFilters: Array<OrderStatus | "All"> = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
];

function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              statusHistory: [
                ...order.statusHistory,
                { status: newStatus, timestamp: new Date().toISOString() },
              ],
            }
          : order,
      ),
    );
    setSelectedOrder((prev) =>
      prev && prev.id === orderId ? { ...prev, status: newStatus } : prev,
    );
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

      {/* Table */}
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
              {filteredOrders.length === 0 && (
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
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)}{" "}
                    item(s)
                  </td>
                  <td className="p-4 font-medium">${order.total.toFixed(2)}</td>
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
