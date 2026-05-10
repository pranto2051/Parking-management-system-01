"use client";

import { mockVehicles } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Input } from "@/components/shared/input";
import { SuccessMessage, ConfirmModal } from "@/components/shared";
import { Car, Plus, Trash2, Edit3, ShieldCheck, Info, X } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { useState } from "react";
import { Vehicle, VehicleType } from "@/lib/types";

export function VehiclesSection() {
  const { isDemoMode } = useDemoModeStore();
  const [vehicles, setVehicles] = useState<Vehicle[]>(isDemoMode ? mockVehicles : []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState<{
    vehicle_number: string;
    brand: string;
    model: string;
    license_number: string;
    vehicle_type: VehicleType;
  }>({
    vehicle_number: "",
    brand: "",
    model: "",
    license_number: "",
    vehicle_type: "car"
  });

  const handleAddClick = () => {
    setEditingVehicle(null);
    setFormData({ vehicle_number: "", brand: "", model: "", license_number: "", vehicle_type: "car" });
    setIsFormOpen(true);
  };

  const handleEditClick = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicle_number: vehicle.vehicle_number,
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      license_number: vehicle.license_number || "",
      vehicle_type: vehicle.vehicle_type
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (editingVehicle) {
      setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? { ...v, ...formData } : v));
      setSuccessMsg("Vehicle updated successfully!");
    } else {
      const newVehicle: Vehicle = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: "user-1",
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...formData
      };
      setVehicles(prev => [newVehicle, ...prev]);
      setSuccessMsg("Vehicle added successfully!");
    }
    setIsFormOpen(false);
    setShowSuccess(true);
  };

  const handleDelete = () => {
    if (vehicleToDelete) {
      setVehicles(prev => prev.filter(v => v.id !== vehicleToDelete));
      setVehicleToDelete(null);
      setSuccessMsg("Vehicle deleted successfully!");
      setShowSuccess(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gradient">My Vehicles</h1>
          <p className="text-muted-foreground font-medium">Add and manage your vehicles for seamless parking.</p>
        </div>
        <Button 
          onClick={handleAddClick}
          className="rounded-2xl h-12 px-6 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1"
        >
          <Plus className="h-5 w-5 mr-2 stroke-3" />
          Add New Vehicle
        </Button>
      </div>

      {isFormOpen && (
        <Card className="premium-card border-none rounded-4xl overflow-hidden animate-in slide-in-from-top-4">
          <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black tracking-tight">
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </CardTitle>
              <CardDescription className="font-medium">Enter your vehicle details below.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Plate Number</label>
                <Input 
                  value={formData.vehicle_number} 
                  onChange={e => setFormData(prev => ({ ...prev, vehicle_number: e.target.value }))}
                  placeholder="e.g. DHAKA-METRO-KA-1234" 
                  className="rounded-xl border-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Brand</label>
                <Input 
                  value={formData.brand} 
                  onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="e.g. Toyota" 
                  className="rounded-xl border-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Model</label>
                <Input 
                  value={formData.model} 
                  onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g. Corolla" 
                  className="rounded-xl border-slate-200" 
                />
              </div>
              <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">License Number</label>
                  <Input 
                    value={formData.license_number} 
                    onChange={e => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
                    placeholder="e.g. 12-3456" 
                    className="rounded-xl border-slate-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Type</label>
                  <select 
                    value={formData.vehicle_type}
                    onChange={e => setFormData(prev => ({ ...prev, vehicle_type: e.target.value as VehicleType }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-background text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="truck">Truck</option>
                    <option value="bus">Bus</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <Button variant="outline" onClick={() => setIsFormOpen(false)} className="rounded-xl font-bold px-6">Cancel</Button>
                <Button onClick={handleSave} className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20">
                  {editingVehicle ? "Save Changes" : "Add Vehicle"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="premium-card group border-none rounded-4xl overflow-hidden">
              <div className={`h-2 w-full ${vehicle.vehicle_type === 'car' ? 'bg-primary' : 'bg-accent'}`} />
              <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-inner ${
                  vehicle.vehicle_type === 'car' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                }`}>
                  <Car className="h-8 w-8 stroke-[2.5]" />
                </div>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none px-3 py-1 font-bold rounded-full">
                  <ShieldCheck className="h-3 w-3 mr-1" /> VERIFIED
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Plate Number</p>
                  <p className="text-2xl font-black tracking-tighter text-slate-900">{vehicle.vehicle_number}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</p>
                    <p className="font-bold text-slate-700">{vehicle.brand}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model</p>
                    <p className="font-bold text-slate-700">{vehicle.model}</p>
                  </div>
                </div>

                <div className="pt-6 flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditClick(vehicle)}
                    className="flex-1 rounded-xl font-bold border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setVehicleToDelete(vehicle.id)}
                    className="rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmModal 
        open={!!vehicleToDelete}
        onOpenChange={() => setVehicleToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />

      <SuccessMessage 
        isVisible={showSuccess} 
        message={successMsg} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}

