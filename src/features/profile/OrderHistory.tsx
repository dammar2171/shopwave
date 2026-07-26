import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Temporary mock data — will come from a real ordersApi once backend exists
const mockOrders = [
  { id: "ORD-1001", date: "2026-07-10", total: 79.98, status: "Delivered" },
  { id: "ORD-1002", date: "2026-07-18", total: 45.0, status: "Shipped" },
  { id: "ORD-1003", date: "2026-07-22", total: 19.99, status: "Processing" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Delivered: "secondary",
  Shipped: "default",
  Processing: "outline",
};

function OrderHistory() {
  if (mockOrders.length === 0) {
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

      {mockOrders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{order.id}</p>
              <p className="text-xs text-muted-foreground">{order.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={statusVariant[order.status]}>
                {order.status}
              </Badge>
              <p className="font-semibold text-sm">${order.total.toFixed(2)}</p>
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
