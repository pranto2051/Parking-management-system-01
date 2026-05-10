"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockSlots, mockZones } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Car, Filter, Plus, Eye, Edit } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ParkingSlot } from "@/lib/types";
import { AddSlotModal } from "@/components/sub-admin/modals/add-slot-modal";
import { EditSlotModal } from "@/components/sub-admin/modals/edit-slot-modal";
import { ViewSlotModal } from "@/components/sub-admin/modals/view-slot-modal";

export default function SlotsPage() {
  const { isDemoMode } = useDemoModeStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);

  const handleEdit = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setIsEditModalOpen(true);
  };

  const handleView = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setIsViewModalOpen(true);
  };
  
  // Filter zones belonging to this sub-admin
  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  
  // Filter slots belonging to those zones
  const slots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];

  const columns = [
    {
      key: "slot_number",
      header: "Slot Info",
      cell: (row: ParkingSlot) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center text-info">
            <Car className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">{row.slot_number}</p>
            <p className="text-xs text-muted-foreground">{row.unique_slot_id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "zone_id",
      header: "Zone",
      cell: (row: ParkingSlot) => {
        const zone = myZones.find(z => z.id === row.zone_id);
        return zone?.zone_name || "Unknown Zone";
      },
    },
    {
      key: "slot_type",
      header: "Type",
      cell: (row: ParkingSlot) => (
        <span className="capitalize">{row.slot_type}</span>
      ),
    },
    {
      key: "price_per_month",
      header: "Price/Month",
      cell: (row: ParkingSlot) => formatCurrency(row.price_per_month),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: ParkingSlot) => {
        const variants: Record<string, "success" | "warning" | "danger" | "secondary"> = {
          available: "success",
          booked: "warning",
          occupied: "danger",
        };
        return (
          <Badge variant={variants[row.status] || "secondary"}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: ParkingSlot) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleView(row)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(row)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" suppressHydrationWarning>
        <PageHeader
          title="Parking Slots"
          description="Manage availability and pricing for your parking slots."
        />
        <div className="flex gap-2" suppressHydrationWarning>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Slot
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={slots}
        keyExtractor={(row) => row.id}
      />

      <AddSlotModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditSlotModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} slot={selectedSlot} />
      <ViewSlotModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} slot={selectedSlot} />
    </div>
  );
}
