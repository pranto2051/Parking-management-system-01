"use client";

import { mockSlots, mockZones, mockDivisions, mockDistricts, mockAreas } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { FilterSection } from "@/components/shared";
import { MapPin, Car, Bike, Truck, Zap } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { formatCurrency } from "@/lib/utils";
import { useState, useMemo } from "react";

export function SlotsSection() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (newFilters: Record<string, string>) => {
    const updatedFilters = { ...newFilters };

    // Reset District and Area if Division changes
    if (activeFilters.division_id !== newFilters.division_id) {
      delete updatedFilters.district_id;
      delete updatedFilters.area_id;
    }
    // Reset Area if District changes
    else if (activeFilters.district_id !== newFilters.district_id) {
      delete updatedFilters.area_id;
    }

    setActiveFilters(updatedFilters);
  };

  const filteredSlots = useMemo(() => {
    const slots = isDemoMode ? mockSlots : [];
    const zones = isDemoMode ? mockZones : [];
    const areas = isDemoMode ? mockAreas : [];
    const districts = isDemoMode ? mockDistricts : [];

    return slots.filter(slot => {
      // Get location hierarchy for the slot
      const zone = zones.find(z => z.id === slot.zone_id);
      const area = areas.find(a => a.id === zone?.area_id);
      const district = districts.find(d => d.id === area?.district_id);
      
      // Search by ID or Zone Name
      const matchesSearch = 
        slot.unique_slot_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        zone?.zone_name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by Geography
      const matchesDivision = !activeFilters.division_id || district?.division_id === activeFilters.division_id;
      const matchesDistrict = !activeFilters.district_id || area?.district_id === activeFilters.district_id;
      const matchesArea = !activeFilters.area_id || zone?.area_id === activeFilters.area_id;

      // Filter by Type and Status
      const matchesType = !activeFilters.slot_type || slot.slot_type === activeFilters.slot_type;
      const matchesStatus = !activeFilters.status || slot.status === activeFilters.status;

      return matchesSearch && matchesDivision && matchesDistrict && matchesArea && matchesType && matchesStatus;
    });
  }, [isDemoMode, searchQuery, activeFilters]);

  const divisions = useMemo(() => (isDemoMode ? mockDivisions : []), [isDemoMode]);
  const districts = useMemo(() => (isDemoMode ? mockDistricts : []), [isDemoMode]);
  const areas = useMemo(() => (isDemoMode ? mockAreas : []), [isDemoMode]);
  const zones = useMemo(() => (isDemoMode ? mockZones : []), [isDemoMode]);

  const filterOptions = useMemo(() => {
    const options = [
      {
        label: "Division",
        key: "division_id",
        options: divisions.map(d => ({ label: d.name, value: d.id })),
      },
      {
        label: "District",
        key: "district_id",
        options: districts
          .filter(d => !activeFilters.division_id || d.division_id === activeFilters.division_id)
          .map(d => ({ label: d.name, value: d.id })),
      },
      {
        label: "Area",
        key: "area_id",
        options: areas
          .filter(a => !activeFilters.district_id || a.district_id === activeFilters.district_id)
          .map(a => ({ label: a.name, value: a.id })),
      },
      {
        label: "Slot Type",
        key: "slot_type",
        options: [
          { label: "Car", value: "car" },
          { label: "Bike", value: "bike" },
          { label: "Truck", value: "truck" },
          { label: "Bus", value: "bus" },
        ],
      },
      {
        label: "Status",
        key: "status",
        options: [
          { label: "Available", value: "available" },
          { label: "Booked", value: "booked" },
          { label: "Occupied", value: "occupied" },
        ],
      },
    ];
    return options;
  }, [divisions, districts, areas, activeFilters.division_id, activeFilters.district_id]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gradient">Browse Slots</h1>
          <p className="text-muted-foreground font-medium">Find and book the perfect parking spot in your area.</p>
        </div>
        
        <div className="w-full lg:w-auto">
          <FilterSection 
            onSearch={setSearchQuery}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            placeholder="Search Slot ID or Zone..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSlots.map((slot) => {
          const zone = zones.find(z => z.id === slot.zone_id);
          return (
            <Card key={slot.id} className="premium-card group border-none rounded-4xl overflow-hidden flex flex-col">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                 <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                 <div className="absolute top-4 right-4 z-20">
                    <Badge className={`${
                      slot.status === 'available' ? 'bg-emerald-500' : 
                      slot.status === 'booked' ? 'bg-amber-500' : 'bg-rose-500'
                    } text-white border-none px-4 py-1.5 font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg`}>
                      {slot.status}
                    </Badge>
                 </div>
                 <div className="absolute bottom-4 left-6 z-20">
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">Price per month</p>
                    <p className="text-2xl font-black text-white tracking-tight">{formatCurrency(slot.price_per_month)}</p>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                    {slot.slot_type === 'car' ? <Car size={120} /> : slot.slot_type === 'bike' ? <Bike size={120} /> : <Truck size={120} />}
                 </div>
              </div>

              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                       <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900 leading-none">{zone?.zone_name || 'Premium Zone'}</h3>
                      <p className="text-xs text-muted-foreground font-medium mt-1">{zone?.address || 'Location information'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Slot ID</p>
                        <p className="font-bold text-sm text-slate-700">{slot.unique_slot_id}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="rounded-lg border-slate-200 bg-white text-[10px] font-bold py-1 px-3">
                      {slot.slot_type.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    className="w-full rounded-2xl h-14 font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
                    disabled={slot.status !== 'available'}
                  >
                    {slot.status === 'available' ? 'Book Now' : 'Not Available'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
