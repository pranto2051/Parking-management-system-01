"use client";

import { mockBookings, mockVehicles } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Calendar, Car, ArrowRight, CheckCircle2, Clock, FileText } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { useState, useMemo } from "react";

export function BookingsSection() {
  const { isDemoMode } = useDemoModeStore();
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");
  
  const filteredBookings = useMemo(() => {
    const bookings = isDemoMode ? mockBookings : [];
    
    if (filter === "all") return bookings;
    if (filter === "active") return bookings.filter(b => b.status === "approved");
    if (filter === "pending") return bookings.filter(b => b.status === "pending");
    return bookings;
  }, [isDemoMode, filter]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gradient">My Bookings</h1>
          <p className="text-muted-foreground font-medium">Keep track of your active and past parking reservations.</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
           <Button 
             variant={filter === "all" ? "secondary" : "ghost"} 
             size="sm" 
             onClick={() => setFilter("all")}
             className={`rounded-lg text-xs font-bold px-4 ${filter === "all" ? 'shadow-sm' : 'text-slate-500'}`}
           >
             All
           </Button>
           <Button 
             variant={filter === "active" ? "secondary" : "ghost"} 
             size="sm" 
             onClick={() => setFilter("active")}
             className={`rounded-lg text-xs font-bold px-4 ${filter === "active" ? 'shadow-sm' : 'text-slate-500'}`}
           >
             Active
           </Button>
           <Button 
             variant={filter === "pending" ? "secondary" : "ghost"} 
             size="sm" 
             onClick={() => setFilter("pending")}
             className={`rounded-lg text-xs font-bold px-4 ${filter === "pending" ? 'shadow-sm' : 'text-slate-500'}`}
           >
             Pending
           </Button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const vehicle = mockVehicles.find(v => v.id === booking.vehicle_id);
            
            return (
              <Card key={booking.id} className="premium-card border-none rounded-4xl overflow-hidden group">
                <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className={`lg:w-72 p-8 flex flex-col justify-between ${
                    booking.status === 'approved' ? 'bg-emerald-50' : 
                    booking.status === 'pending' ? 'bg-amber-50' : 'bg-slate-50'
                  }`}>
                    <div>
                      <Badge className={`${
                        booking.status === 'approved' ? 'bg-emerald-500' : 
                        booking.status === 'pending' ? 'bg-amber-500' : 'bg-slate-500'
                      } text-white border-none px-4 py-1 font-black text-[10px] uppercase tracking-widest rounded-full mb-4`}>
                        {booking.status}
                      </Badge>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Booking Code</p>
                      <p className="text-xl font-black tracking-tighter text-slate-900">{booking.booking_code}</p>
                    </div>
                    <div className="mt-8">
                       <div className="flex items-center gap-2 text-slate-500">
                         {booking.status === 'approved' ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : 
                          booking.status === 'pending' ? <Clock className="h-5 w-5 text-amber-500" /> : 
                          <CheckCircle2 className="h-5 w-5 text-slate-400" />}
                         <span className="text-sm font-bold">
                           {booking.status === 'approved' ? 'Active Session' : 
                            booking.status === 'pending' ? 'Waiting Review' : 'Booking Completed'}
                         </span>
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 p-8 grid md:grid-cols-3 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                          <Car className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</p>
                          <p className="font-bold text-slate-900">{vehicle?.vehicle_number}</p>
                          <p className="text-xs text-muted-foreground font-medium">{vehicle?.brand} {vehicle?.model}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                          <p className="font-bold text-slate-900">{new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground font-medium">{booking.duration_months} Months</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3">
                       <Button variant="outline" className="w-full xl:w-auto flex-1 rounded-xl font-bold h-12">
                         <FileText className="h-4 w-4 mr-2" /> Invoice
                       </Button>
                       <Button className="w-full xl:w-auto flex-1 rounded-xl font-bold h-12 shadow-lg shadow-primary/10">
                         Details <ArrowRight className="h-4 w-4 ml-2" />
                       </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
            <Clock size={40} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">No Bookings Found</h3>
            <p className="text-muted-foreground font-medium">You don&apos;t have any {filter !== 'all' ? filter : ''} bookings at the moment.</p>
          </div>
          <Button 
            variant="outline" 
            className="rounded-xl font-bold"
            onClick={() => setFilter('all')}
          >
            Show All Bookings
          </Button>
        </div>
      )}
      </div>
    </div>
  );
}
