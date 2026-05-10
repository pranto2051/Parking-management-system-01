"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockPayments, mockBookings, mockSlots, mockZones, mockUsers } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { CreditCard, Filter, Eye, CheckCircle } from "lucide-react";
import { Payment } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function PaymentsPage() {
  const { isDemoMode } = useDemoModeStore();
  
  // Filter zones belonging to this sub-admin
  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  
  // Filter slots belonging to those zones
  const mySlots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];
  const mySlotIds = mySlots.map(s => s.id);

  // Filter bookings for those slots
  const myBookings = isDemoMode ? mockBookings.filter(b => mySlotIds.includes(b.slot_id)) : [];
  const myBookingIds = myBookings.map(b => b.id);
  
  // Filter payments for those bookings
  const payments = isDemoMode 
    ? mockPayments.filter(p => myBookingIds.includes(p.booking_id)) 
    : [];

  const columns = [
    {
      key: "transaction_id",
      header: "Transaction ID",
      cell: (row: unknown) => {
        const payment = row as Payment;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono font-bold">{payment.transaction_id || "PENDING"}</p>
              <p className="text-xs text-muted-foreground capitalize">{payment.payment_method}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "user",
      header: "User",
      cell: (row: unknown) => {
        const payment = row as Payment;
        const user = mockUsers.find(u => u.id === payment.user_id);
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
      key: "amount",
      header: "Amount",
      cell: (row: unknown) => {
        const payment = row as Payment;
        return (
          <div className="font-bold text-primary">
            {formatCurrency(payment.amount)}
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (row: unknown) => {
        const payment = row as Payment;
        const variants: Record<string, "success" | "warning" | "danger" | "secondary"> = {
          paid: "success",
          unpaid: "warning",
          failed: "danger",
          refunded: "secondary",
        };
        return (
          <Badge variant={variants[payment.payment_status] || "secondary"}>
            {payment.payment_status.charAt(0).toUpperCase() + payment.payment_status.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: "date",
      header: "Date",
      cell: (row: unknown) => {
        const payment = row as Payment;
        return payment.payment_date || "Not paid yet";
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: unknown) => {
        const payment = row as Payment;
        return (
          <div className="flex items-center gap-2">
            {payment.payment_status === "unpaid" && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Payment History"
          description="Track and verify payments for your parking zones."
        />
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter Payments
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={payments}
        keyExtractor={(row) => (row as Payment).id}
      />
    </div>
  );
}
