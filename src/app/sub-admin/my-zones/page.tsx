"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockZones } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Building2, MapPin, Plus } from "lucide-react";
import { ParkingZone } from "@/lib/types";
import { AddZoneModal } from "@/components/sub-admin/modals/add-zone-modal";

export default function MyZonesPage() {
  const { isDemoMode } = useDemoModeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const zones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];

  const columns = [
    {
      key: "zone_name",
      header: "Zone Name",
      cell: (row: ParkingZone) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">{row.zone_name}</p>
            <p className="text-xs text-muted-foreground">{row.zone_code}</p>
          </div>
        </div>
      ),
    },
    {
      key: "address",
      header: "Address",
      cell: (row: ParkingZone) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {row.address}
        </div>
      ),
    },
    {
      key: "total_slots",
      header: "Total Slots",
      cell: (row: ParkingZone) => row.total_slots,
    },
    {
      key: "is_active",
      header: "Status",
      cell: (row: ParkingZone) => (
        <Badge variant={row.is_active ? "success" : "secondary"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: ParkingZone) => (
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
          title="My Zones"
          description="Manage and monitor your assigned parking zones."
        />
        <Button className="w-full md:w-auto" onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Zone
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={zones}
        keyExtractor={(row) => row.id}
      />

      <AddZoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
