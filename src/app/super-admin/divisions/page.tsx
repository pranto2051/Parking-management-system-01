"use client";

import { useState } from "react";
import { mockDivisions } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Map } from "lucide-react";
import { AddDivisionModal } from "@/components/super-admin/modals/add-division-modal";
import toast from "react-hot-toast";

export default function DivisionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      key: "name",
      header: "Division Name",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Map className="h-4 w-4" />
          </div>
          <span className="font-bold">{row.name}</span>
        </div>
      ),
    },
    { key: "code", header: "Code" },
    {
      key: "created_at",
      header: "Created At",
      cell: (row: any) => new Date(row.created_at).toLocaleDateString(),
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
        title="Divisions"
        description="Manage the highest level of geographical organization."
        addLabel="Add Division"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockDivisions}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <AddDivisionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
