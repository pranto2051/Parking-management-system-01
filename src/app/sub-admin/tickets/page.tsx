"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockUsers } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Ticket, Filter, MessageSquare, Eye } from "lucide-react";
import { SupportTicket } from "@/lib/types";
import { FormattedDate } from "@/components/shared/formatted-date";

const mockTickets: SupportTicket[] = [
  {
    id: "tick-001",
    user_id: "user-001",
    subject: "Unable to pay via bKash",
    message: "I am trying to pay for my booking but the bKash option is not working.",
    status: "open",
    priority: "high",
    created_at: "2024-05-09T10:00:00Z",
    updated_at: "2024-05-09T10:00:00Z",
  },
  {
    id: "tick-002",
    user_id: "user-002",
    subject: "Slot is occupied by another car",
    message: "I arrived at my booked slot A-001 but there is already another car parked there.",
    status: "in_progress",
    priority: "urgent",
    created_at: "2024-05-08T15:30:00Z",
    updated_at: "2024-05-08T16:00:00Z",
  },
  {
    id: "tick-003",
    user_id: "user-003",
    subject: "Booking cancellation request",
    message: "I want to cancel my booking for next month.",
    status: "resolved",
    priority: "medium",
    created_at: "2024-05-07T09:00:00Z",
    updated_at: "2024-05-07T14:00:00Z",
  },
];

export default function TicketsPage() {
  const { isDemoMode } = useDemoModeStore();
  const tickets = isDemoMode ? mockTickets : [];

  const columns = [
    {
      key: "subject",
      header: "Ticket Info",
      cell: (row: unknown) => {
        const ticket = row as SupportTicket;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">{ticket.subject}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{ticket.message}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "user",
      header: "User",
      cell: (row: unknown) => {
        const ticket = row as SupportTicket;
        const user = mockUsers.find(u => u.id === ticket.user_id);
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
      key: "status",
      header: "Status",
      cell: (row: unknown) => {
        const ticket = row as SupportTicket;
        const variants: Record<string, "success" | "warning" | "danger" | "secondary" | "default"> = {
          open: "danger",
          in_progress: "warning",
          resolved: "success",
          closed: "secondary",
        };
        return (
          <Badge variant={variants[ticket.status] || "secondary"}>
            {ticket.status.replace("_", " ").charAt(0).toUpperCase() + ticket.status.replace("_", " ").slice(1)}
          </Badge>
        );
      },
    },
    {
      key: "priority",
      header: "Priority",
      cell: (row: unknown) => {
        const ticket = row as SupportTicket;
        const colors: Record<string, string> = {
          urgent: "text-red-600 font-bold",
          high: "text-orange-600 font-bold",
          medium: "text-blue-600 font-bold",
          low: "text-slate-600 font-bold",
        };
        return (
          <span className={colors[ticket.priority || "low"] + " capitalize text-xs"}>
            {ticket.priority}
          </span>
        );
      },
    },
    {
      key: "date",
      header: "Created",
      cell: (row: unknown) => {
        const ticket = row as SupportTicket;
        return <FormattedDate date={ticket.created_at} />;
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: unknown) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageSquare className="h-4 w-4" />
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Support Tickets"
          description="Manage and respond to support requests from your users."
        />
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter Tickets
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={tickets}
        keyExtractor={(row) => (row as SupportTicket).id}
      />
    </div>
  );
}
