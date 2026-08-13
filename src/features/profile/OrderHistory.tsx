import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetMyOrdersQuery } from "@/features/orders/ordersApi";
import type { OrderStatus } from "@/features/orders/types";

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

function OrderHistory() {
  const { data: response, isLoading, isError } = useGetMyOrdersQuery();
  const orders = response?.data ?? [];

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Loading your orders...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-muted-foreground">
        Something went wrong loading your orders.
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Order History</h1>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-medium text-sm">
                {order.id.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={statusVariant[order.status]}>
                {order.status}
              </Badge>
              <p className="font-semibold text-sm">
                ${Number(order.total).toFixed(2)}
              </p>
              <Link
                to={`/profile/orders/${order.id}/tracking`}
                className="text-sm text-primary hover:underline"
              >
                Track
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default OrderHistory;
