"use client";

import { useState } from "react";
import { useUser, useSwitchDemoUser } from "@/lib/hooks/use-user";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import {
  mockSubAdminStats,
  mockWeeklyData,
  mockBookings,
  mockUsers,
} from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Building2, Car, Calendar, CreditCard, Users } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

export default function SubAdminDashboard() {
  const { user } = useUser();
  const { isDemoMode } = useDemoModeStore();
  const { switchToSuperAdmin, switchToSubAdmin, switchToUser } = useSwitchDemoUser();
  const [isLoading] = useState(false);

  const stats = isDemoMode ? mockSubAdminStats : { myZones: 0, activeSlots: 0, pendingRequests: 0, activeBookings: 0, monthlyRevenue: 0, myUsers: 0 };
  const weeklyData = isDemoMode ? mockWeeklyData : [];

  return (
    <div className="space-y-8" suppressHydrationWarning>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" suppressHydrationWarning>
        <PageHeader
          title={`Welcome back, ${user?.first_name || "Admin"}!`}
          description="Here's an overview of your zone performance."
        />
        {isDemoMode && (
          <div className="flex gap-2" suppressHydrationWarning>
            <Button variant="outline" size="sm" onClick={switchToSuperAdmin}>
              Super Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => switchToSubAdmin(0)}>
              Sub Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => switchToUser(0)}>
              User
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" suppressHydrationWarning>
        <StatsCard title="My Zones" value={stats.myZones} icon={<Building2 className="h-5 w-5" />} variant="primary" />
        <StatsCard title="Active Slots" value={stats.activeSlots} icon={<Car className="h-5 w-5" />} variant="info" />
        <StatsCard title="Pending Requests" value={stats.pendingRequests} icon={<Calendar className="h-5 w-5" />} variant="warning" />
        <StatsCard title="Active Bookings" value={stats.activeBookings} icon={<Calendar className="h-5 w-5" />} variant="accent" />
        <StatsCard title="Monthly Revenue" value={formatCurrency(stats.monthlyRevenue)} icon={<CreditCard className="h-5 w-5" />} variant="secondary" trend={{ value: 12, isPositive: true }} />
        <StatsCard title="My Users" value={stats.myUsers} icon={<Users className="h-5 w-5" />} variant="info" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6" suppressHydrationWarning>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Booking Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="bookings" stroke="#00A86B" strokeWidth={2} dot={{ fill: "#00A86B" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Requests</CardTitle>
            <Link href="/sub-admin/requests">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats.pendingRequests > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">New Booking Request</p>
                    <p className="text-sm text-muted-foreground">Click to review</p>
                  </div>
                  <Badge variant="warning">{stats.pendingRequests} pending</Badge>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No pending requests</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}