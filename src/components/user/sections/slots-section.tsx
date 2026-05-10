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
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-black tracking-tight text-white">Browse <span className="animated-gradient-text">Slots</span></h1>
          <p className="text-gray-400 text-sm font-medium">Find and book the perfect parking spot in your area.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.map((slot) => {
          const zone = zones.find(z => z.id === slot.zone_id);
          return (
            <Card key={slot.id} className="group border-none rounded-2xl overflow-hidden flex flex-col bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all">
              <div className="relative h-36 bg-slate-700/50 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                 <div className="absolute top-3 right-3 z-20">
                    <Badge className={`${
                      slot.status === 'available' ? 'bg-emerald-500' :
                      slot.status === 'booked' ? 'bg-amber-500' : 'bg-rose-500'
                    } text-white border-none px-3 py-1 font-bold text-[9px] uppercase tracking-wider rounded-full shadow-lg`}>
                      {slot.status}
                    </Badge>
                 </div>
                 <div className="absolute bottom-3 left-4 z-20">
                    <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider mb-0.5">Price per month</p>
                    <p className="text-xl font-black text-white tracking-tight">{formatCurrency(slot.price_per_month)}</p>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                    {slot.slot_type === 'car' ? <Car size={80} /> : slot.slot_type === 'bike' ? <Bike size={80} /> : <Truck size={80} />}
                 </div>
              </div>

              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                       <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white leading-none">{zone?.zone_name || 'Premium Zone'}</h3>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">{zone?.address || 'Location information'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-slate-800 flex items-center justify-center text-gray-400">
                        <Zap className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">Slot ID</p>
                        <p className="font-bold text-xs text-gray-300">{slot.unique_slot_id}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="rounded-md border-slate-600 bg-slate-800 text-[9px] font-bold py-0.5 px-2 text-gray-300">
                      {slot.slot_type.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    className="w-full rounded-xl h-10 font-bold text-xs shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all active:scale-95 disabled:opacity-50"
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
