"use client";

import { useState } from "react";
import { mockSlots, mockZones } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Car, Bike, Truck, Eye } from "lucide-react";
import { SlotDetailModal } from "@/components/super-admin/modals/slot-detail-modal";
import toast from "react-hot-toast";

export default function SlotsPage() {
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'car': return <Car className="h-4 w-4" />;
      case 'bike': return <Bike className="h-4 w-4" />;
      case 'truck': return <Truck className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const columns = [
    {
      key: "slot_number",
      header: "Slot Info",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            {getIcon(row.slot_type)}
          </div>
          <div>
            <p className="font-bold">{row.slot_number}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{row.unique_slot_id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "zone_id",
      header: "Zone",
      cell: (row: any) => {
        const zone = mockZones.find(z => z.id === row.zone_id);
        return zone?.zone_name || "Unknown";
      }
    },
    {
      key: "slot_type",
      header: "Type",
      cell: (row: any) => (
        <Badge variant="outline" className="capitalize">
          {row.slot_type}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: any) => (
        <Badge variant={row.status === 'available' ? 'success' : row.status === 'booked' ? 'warning' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "price_per_month",
      header: "Rate",
      cell: (row: any) => `৳${row.price_per_month}/mo`,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-primary"
            onClick={() => {
              setSelectedSlot(row);
              setIsDetailModalOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
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
        title="Parking Slots"
        description="Manage individual parking spaces and their availability."
        addLabel="Add Slots"
        onAdd={() => toast.success("Add slots modal")}
      >
        <DataTable
          data={mockSlots}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <SlotDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        slot={selectedSlot} 
      />
    </>
  );
}
