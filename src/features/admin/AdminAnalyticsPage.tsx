import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAnalyticsQuery } from "./dashboardApi";

const dateRangeOptions: { value: "7d" | "30d"; label: string }[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
];

function AdminAnalyticsPage() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const { data: response, isLoading } = useGetAnalyticsQuery(range);
  const data = response?.data;

  if (isLoading || !data) {
    return (
      <p className="text-sm text-muted-foreground">Loading analytics...</p>
    );
  }

  const totalCustomers = data.newCustomers + data.returningCustomers;
  const returningRate =
    totalCustomers > 0
      ? ((data.returningCustomers / totalCustomers) * 100).toFixed(0)
      : "0";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex gap-2">
          {dateRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setRange(option.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                range === option.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input hover:bg-accent text-muted-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold mt-1">
              ${data.totalRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold mt-1">{data.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
            <p className="text-2xl font-bold mt-1">
              ${data.avgOrderValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Returning Rate</p>
            <p className="text-2xl font-bold mt-1">{returningRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Revenue Trend ({range === "7d" ? "7 Days" : "30 Days"})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
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
                minTickGap={30}
              />
              <YAxis className="text-xs" stroke="currentColor" />
              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toFixed(2)}`,
                  "Revenue",
                ]}
                labelFormatter={(label) =>
                  new Date(String(label)).toLocaleDateString("en-US", {
                    weekday: "short",
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
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {data.categoryBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No sales data yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={data.categoryBreakdown}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    className="text-xs"
                    stroke="currentColor"
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    className="text-xs"
                    stroke="currentColor"
                    width={80}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${Number(value).toFixed(2)}`,
                      "Revenue",
                    ]}
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--popover-foreground)",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--primary)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {totalCustomers === 0 ? (
              <p className="text-sm text-muted-foreground py-8">
                No customer data yet.
              </p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "New", value: data.newCustomers },
                        { name: "Returning", value: data.returningCustomers },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      <Cell fill="var(--chart-1)" />
                      <Cell fill="var(--primary)" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--popover-foreground)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-6 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: "var(--chart-1)" }}
                    />
                    <UserPlus className="h-3.5 w-3.5 text-muted-foreground" />
                    New: {data.newCustomers}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    <Repeat className="h-3.5 w-3.5 text-muted-foreground" />
                    Returning: {data.returningCustomers}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminAnalyticsPage;
