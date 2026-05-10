"use client";

import { useState } from "react";
import { mockDistricts, mockDivisions } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Building2 } from "lucide-react";
import { AddDistrictModal } from "@/components/super-admin/modals/add-district-modal";
import toast from "react-hot-toast";

export default function DistrictsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      key: "name",
      header: "District Name",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="font-bold">{row.name}</span>
        </div>
      ),
    },
    {
      key: "division_id",
      header: "Division",
      cell: (row: any) => {
        const division = mockDivisions.find(d => d.id === row.division_id);
        return division?.name || "Unknown";
      }
    },
    { key: "code", header: "Code" },
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
        title="Districts"
        description="Manage districts within divisions."
        addLabel="Add District"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockDistricts}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <AddDistrictModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
