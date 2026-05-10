"use client";

import { useState } from "react";
import { mockAreas, mockDistricts } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, MapPin } from "lucide-react";
import { AddAreaModal } from "@/components/super-admin/modals/add-area-modal";
import toast from "react-hot-toast";

export default function AreasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      key: "name",
      header: "Area Name",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="font-bold">{row.name}</span>
        </div>
      ),
    },
    {
      key: "district_id",
      header: "District",
      cell: (row: any) => {
        const district = mockDistricts.find(d => d.id === row.district_id);
        return district?.name || "Unknown";
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
        title="Areas"
        description="Manage specific areas and neighborhoods."
        addLabel="Add Area"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockAreas}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <AddAreaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
