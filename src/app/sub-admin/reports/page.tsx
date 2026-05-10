"use client";

import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockRevenueData, mockBookingStatusData, mockSlotTypeData } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

export default function ReportsPage() {
  const { isDemoMode } = useDemoModeStore();
  const revenueData = isDemoMode ? mockRevenueData : [];
  const statusData = isDemoMode ? mockBookingStatusData : [];
  const slotTypeData = isDemoMode ? mockSlotTypeData : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Reports & Analytics"
          description="Analyze your zone performance and revenue trends."
        />
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" /> This Year
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis 
                    fontSize={12} 
                    tickFormatter={(value) => `৳${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry: { name: string; value: number; color: string }, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item: { name: string; value: number; color: string }) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Slot Occupancy by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slotTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" fontSize={12} width={60} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
