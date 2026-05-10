"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockBookings, mockSlots, mockZones, mockUsers, mockVehicles } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Calendar, Filter, Eye } from "lucide-react";
import { Booking } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { FilterSection } from "@/components/shared/filter-section";

export default function BookingsPage() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  
  // Filter zones belonging to this sub-admin
  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  
  // Filter slots belonging to those zones
  const mySlots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];
  const mySlotIds = mySlots.map(s => s.id);
  
  // Filter bookings for those slots
  let bookings = isDemoMode 
    ? mockBookings.filter(b => mySlotIds.includes(b.slot_id)) 
    : [];

  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    bookings = bookings.filter(b => {
      const user = mockUsers.find(u => u.id === b.user_id);
      return (
        b.booking_code.toLowerCase().includes(query) ||
        user?.first_name.toLowerCase().includes(query) ||
        user?.last_name.toLowerCase().includes(query) ||
        user?.email.toLowerCase().includes(query)
      );
    });
  }

  // Apply filters
  if (filters.status) {
    bookings = bookings.filter(b => b.status === filters.status);
  }
  if (filters.zone) {
    bookings = bookings.filter(b => {
      const slot = mockSlots.find(s => s.id === b.slot_id);
      return slot?.zone_id === filters.zone;
    });
  }

  const filterOptions = [
    {
      label: "Status",
      key: "status",
      options: [
        { label: "All Status", value: "all" },
        { label: "Approved", value: "approved" },
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Expired", value: "expired" },
      ],
    },
    {
      label: "Zone",
      key: "zone",
      options: [
        { label: "All Zones", value: "all" },
        ...myZones.map(z => ({ label: z.zone_name, value: z.id })),
      ],
    },
  ];

  const columns = [
    {
      key: "booking_code",
      header: "Booking Code",
      cell: (row: Booking) => (
        <span className="font-mono font-bold text-primary">{row.booking_code}</span>
      ),
    },
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
              <p className="text-xs text-muted-foreground">{user?.phone}</p>
            </div>
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
      key: "status",
      header: "Status",
      cell: (row: Booking) => {
        const variants: Record<string, "success" | "warning" | "danger" | "secondary" | "default"> = {
          approved: "success",
          pending: "warning",
          completed: "default",
          cancelled: "danger",
          expired: "secondary",
        };
        return (
          <Badge variant={variants[row.status] || "secondary"}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row: Booking) => formatCurrency(row.total_amount),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Booking) => (
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" /> View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Bookings"
        description="View and manage all parking bookings in your zones."
      />

      <FilterSection
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        placeholder="Search by code, user name or email..."
      />

      <DataTable
        columns={columns}
        data={bookings}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
}
