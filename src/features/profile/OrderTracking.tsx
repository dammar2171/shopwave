import { useParams, Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];

function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  // Temporary — will be based on real order status once backend exists
  const currentStep = 2;

  return (
    <div className="space-y-6 ">
      <div>
        <Link
          to="/profile/orders"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Order History
        </Link>
        <h1 className="text-xl font-bold mt-2">Tracking Order {id}</h1>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {index <= currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    index <= currentStep
                      ? "font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderTracking;
