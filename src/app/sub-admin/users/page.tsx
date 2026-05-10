"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockUsers } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { UserPlus, Mail, Phone, MapPin } from "lucide-react";
import { Profile } from "@/lib/types";

export default function UsersPage() {
  const { isDemoMode } = useDemoModeStore();
  
  // Filter users belonging to this sub-admin
  const users = isDemoMode 
    ? mockUsers.filter(u => u.parent_admin_id === "sub-admin-001") 
    : [];

  const columns = [
    {
      key: "name",
      header: "User",
      cell: (row: unknown) => {
        const user = row as Profile;
        return (
          <div className="flex items-center gap-3">
            <Avatar firstName={user.first_name} lastName={user.last_name} size="sm" />
            <div>
              <p className="font-bold">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "contact",
      header: "Contact",
      cell: (row: unknown) => {
        const user = row as Profile;
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <Mail className="h-3 w-3 text-muted-foreground" />
              {user.email}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Phone className="h-3 w-3 text-muted-foreground" />
              {user.phone}
            </div>
          </div>
        );
      },
    },
    {
      key: "user_type",
      header: "Type",
      cell: (row: unknown) => {
        const user = row as Profile;
        return (
          <Badge variant="outline" className="capitalize">
            {user.user_type}
          </Badge>
        );
      },
    },
    {
      key: "is_active",
      header: "Status",
      cell: (row: unknown) => {
        const user = row as Profile;
        return (
          <Badge variant={user.is_active ? "success" : "secondary"}>
            {user.is_active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: unknown) => (
        <Button variant="outline" size="sm">
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="My Users"
          description="Manage users registered under your administration."
        />
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Register User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        keyExtractor={(row) => (row as Profile).id}
      />
    </div>
  );
}
