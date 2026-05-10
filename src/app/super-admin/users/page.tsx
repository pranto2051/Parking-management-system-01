"use client";

import { useState } from "react";
import { mockUsers } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Ban } from "lucide-react";
import { AddUserModal } from "@/components/super-admin/modals/add-user-modal";

interface RegularUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type: "driver" | "owner";
  is_blacklisted: boolean;
}

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      key: "name",
      header: "User",
      cell: (row: unknown) => {
        const user = row as RegularUser;
        return (
          <div className="flex items-center gap-3">
            <Avatar firstName={user.first_name} lastName={user.last_name} size="sm" />
            <div>
              <p className="font-bold">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-muted-foreground">{user.user_type === 'owner' ? 'Zone Owner' : 'Driver'}</p>
            </div>
          </div>
        );
      },
    },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "is_blacklisted",
      header: "Trust Score",
      cell: (row: unknown) => {
        const user = row as RegularUser;
        return (
          <Badge variant={user.is_blacklisted ? "danger" : "success"}>
            {user.is_blacklisted ? "Blacklisted" : "Verified"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600">
            <Ban className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SectionShell
        title="Users"
        description="View and manage drivers and parking zone owners."
        addLabel="Add User"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockUsers}
          columns={columns}
          keyExtractor={(row) => (row as RegularUser).id}
        />
      </SectionShell>
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
