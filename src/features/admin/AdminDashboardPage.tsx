import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockStats, mockRevenueData, mockTopSelling } from "./mockAdminData";

function AdminDashboardPage() {
  const statCards = [
    {
      label: "Total Revenue",
      value: `$${mockStats.totalRevenue.toLocaleString()}`,
      change: mockStats.revenueChangePercent,
      icon: DollarSign,
    },
    {
      label: "Total Orders",
      value: mockStats.totalOrders.toLocaleString(),
      change: mockStats.ordersChangePercent,
      icon: ShoppingCart,
    },
    {
      label: "Total Products",
      value: mockStats.totalProducts.toLocaleString(),
      icon: Package,
    },
    {
      label: "Total Users",
      value: mockStats.totalUsers.toLocaleString(),
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your store's performance
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, change, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">{value}</p>
              {change !== undefined && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs mt-1",
                    change >= 0 ? "text-green-600" : "text-destructive",
                  )}
                >
                  {change >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{Math.abs(change)}% vs last week</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts row */}
      {(mockStats.pendingOrders > 0 || mockStats.lowStockProducts > 0) && (
        <div className="grid md:grid-cols-2 gap-4">
          {mockStats.pendingOrders > 0 && (
            <Card className="border-amber-200 dark:border-amber-900">
              <CardContent className="pt-6 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-sm">
                  <span className="font-semibold">
                    {mockStats.pendingOrders}
                  </span>{" "}
                  orders are awaiting processing.
                </p>
              </CardContent>
            </Card>
          )}
          {mockStats.lowStockProducts > 0 && (
            <Card className="border-amber-200 dark:border-amber-900">
              <CardContent className="pt-6 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-sm">
                  <span className="font-semibold">
                    {mockStats.lowStockProducts}
                  </span>{" "}
                  products are running low on stock.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Revenue chart + Top selling side by side */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Revenue (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date: string) =>
                    new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  className="text-xs"
                  stroke="currentColor"
                />
                <YAxis className="text-xs" stroke="currentColor" />
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)}`,
                    "Revenue",
                  ]}
                  labelFormatter={(label) =>
                    new Date(String(label)).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })
                  }
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--popover-foreground)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top selling products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTopSelling.map((product, index) => (
              <div key={product.productId} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-muted-foreground w-4">
                  {index + 1}
                </span>
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-10 w-10 rounded-md object-cover bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">
                    {product.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.unitsSold} units sold
                  </p>
                </div>
                <Badge variant="secondary">${product.revenue.toFixed(0)}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
