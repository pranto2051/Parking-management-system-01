"use client";

import { useState } from "react";
import { mockSubAdmins } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Edit, Trash2 } from "lucide-react";
import { AddAdminModal } from "@/components/super-admin/modals/add-admin-modal";

interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
}

export default function AdminsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      key: "name",
      header: "Admin",
      cell: (row: unknown) => {
        const admin = row as AdminUser;
        return (
          <div className="flex items-center gap-3">
            <Avatar firstName={admin.first_name} lastName={admin.last_name} size="sm" />
            <div>
              <p className="font-bold">{admin.first_name} {admin.last_name}</p>
              <p className="text-xs text-muted-foreground">@{admin.username}</p>
            </div>
          </div>
        );
      },
    },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "address", header: "Location" },
    {
      key: "is_active",
      header: "Status",
      cell: (row: unknown) => {
        const admin = row as AdminUser;
        return (
          <Badge variant={admin.is_active ? "success" : "secondary"}>
            {admin.is_active ? "Active" : "Inactive"}
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
        title="Sub Admins"
        description="Manage administrative users who control parking zones."
        addLabel="Invite Admin"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockSubAdmins}
          columns={columns}
          keyExtractor={(row) => (row as AdminUser).id}
        />
      </SectionShell>
      <AddAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
