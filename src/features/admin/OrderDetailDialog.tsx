import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminOrder, OrderStatus } from "./types";

const allStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
];

interface OrderDetailDialogProps {
  order: AdminOrder | null;
  onClose: () => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export function OrderDetailDialog({
  order,
  onClose,
  onStatusChange,
}: OrderDetailDialogProps) {
  if (!order) return null;

  const currentStepIndex = allStatuses.indexOf(order.status);
  const isCancelledOrRefunded =
    order.status === "Cancelled" || order.status === "Refunded";

  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order {order.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status stepper */}
          {!isCancelledOrRefunded && (
            <div className="flex items-center justify-between">
              {allStatuses.map((status, index) => (
                <div
                  key={status}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium",
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
                  <span className="text-xs text-center text-muted-foreground">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {isCancelledOrRefunded && (
            <Badge variant="destructive" className="text-sm">
              {order.status}
            </Badge>
          )}

          {/* Update status */}
          <div>
            <p className="text-sm font-medium mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {[...allStatuses, "Cancelled", "Refunded"].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    onStatusChange(order.id, status as OrderStatus)
                  }
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                    order.status === status
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input hover:bg-accent",
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Customer + shipping */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold mb-2">Customer</p>
              <p className="text-sm">{order.customerName}</p>
              <p className="text-sm text-muted-foreground">
                {order.customerEmail}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Shipping Address</p>
              <p className="text-sm">{order.shippingAddress.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div>
            <p className="text-sm font-semibold mb-3">Items</p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-12 w-12 rounded-md object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>${order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-1">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Payment: {order.paymentMethod}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
