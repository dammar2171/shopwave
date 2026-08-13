import { useParams, Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetOrderByIdQuery } from "@/features/orders/ordersApi";
import type { OrderStatus } from "@/features/orders/types";

const steps: OrderStatus[] = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const stepLabels: Record<OrderStatus, string> = {
  PENDING: "Order Placed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading, isError } = useGetOrderByIdQuery(id!);
  const order = response?.data;

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading order...</p>;
  }

  if (isError || !order) {
    return (
      <div className="space-y-4 max-w-lg">
        <Link
          to="/profile/orders"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Order History
        </Link>
        <p className="text-sm text-muted-foreground">
          We couldn't find this order, or you don't have permission to view it.
        </p>
      </div>
    );
  }

  const isTerminal =
    order.status === "CANCELLED" || order.status === "REFUNDED";
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <Link
          to="/profile/orders"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Order History
        </Link>
        <h1 className="text-xl font-bold mt-2">
          Tracking Order {order.id.slice(0, 8).toUpperCase()}
        </h1>
      </div>

      {isTerminal ? (
        <p className="text-sm font-medium text-destructive">
          This order was {stepLabels[order.status].toLowerCase()}.
        </p>
      ) : (
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index <= currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {index <= currentStepIndex ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-sm",
                  index <= currentStepIndex
                    ? "font-medium"
                    : "text-muted-foreground",
                )}
              >
                {stepLabels[step]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTracking;
