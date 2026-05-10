"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockBookings, mockSlots, mockZones, mockUsers, mockVehicles } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Calendar, Check, X, Eye } from "lucide-react";
import { Booking } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function RequestsPage() {
  const { isDemoMode } = useDemoModeStore();
  
  // Filter zones belonging to this sub-admin
  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  
  // Filter slots belonging to those zones
  const mySlots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];
  const mySlotIds = mySlots.map(s => s.id);
  
  // Filter bookings for those slots that are pending
  const requests = isDemoMode 
    ? mockBookings.filter(b => mySlotIds.includes(b.slot_id) && b.status === "pending") 
    : [];

  const columns = [
    {
      key: "user",
      header: "User",
      cell: (row: Booking) => {
        const user = mockUsers.find(u => u.id === row.user_id);
        return (
          <div className="flex items-center gap-3">
            <Avatar firstName={user?.first_name || ""} lastName={user?.last_name || ""} size="sm" />
            <div>
              <p className="font-bold">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "vehicle",
      header: "Vehicle",
      cell: (row: Booking) => {
        const vehicle = mockVehicles.find(v => v.id === row.vehicle_id);
        return (
          <div>
            <p className="font-medium">{vehicle?.vehicle_number}</p>
            <p className="text-xs text-muted-foreground capitalize">{vehicle?.brand} {vehicle?.model}</p>
          </div>
        );
      },
    },
    {
      key: "slot",
      header: "Slot",
      cell: (row: Booking) => {
        const slot = mockSlots.find(s => s.id === row.slot_id);
        const zone = mockZones.find(z => z.id === slot?.zone_id);
        return (
          <div>
            <p className="font-medium">{slot?.slot_number}</p>
            <p className="text-xs text-muted-foreground">{zone?.zone_name}</p>
          </div>
        );
      },
    },
    {
      key: "dates",
      header: "Duration",
      cell: (row: Booking) => (
        <div>
          <p className="text-sm">{row.start_date} to {row.end_date}</p>
          <p className="text-xs text-muted-foreground">{row.duration_months} Months</p>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Total",
      cell: (row: Booking) => formatCurrency(row.total_amount),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Booking) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Booking Requests"
        description="Review and approve pending booking requests for your zones."
      />

      <DataTable
        columns={columns}
        data={requests}
        keyExtractor={(row) => row.id}
        emptyMessage="No pending requests found"
      />
    </div>
  );
}
