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
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-black tracking-tight text-white">My <span className="animated-gradient-text">Bookings</span></h1>
          <p className="text-gray-400 text-sm font-medium">Keep track of your active and past parking reservations.</p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-lg border border-slate-700">
           <Button
             variant={filter === "all" ? "secondary" : "ghost"}
             size="sm"
             onClick={() => setFilter("all")}
             className={`rounded-md text-[10px] font-bold px-3 ${filter === "all" ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
           >
             All
           </Button>
           <Button
             variant={filter === "active" ? "secondary" : "ghost"}
             size="sm"
             onClick={() => setFilter("active")}
             className={`rounded-md text-[10px] font-bold px-3 ${filter === "active" ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
           >
             Active
           </Button>
           <Button
             variant={filter === "pending" ? "secondary" : "ghost"}
             size="sm"
             onClick={() => setFilter("pending")}
             className={`rounded-md text-[10px] font-bold px-3 ${filter === "pending" ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
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
              <Card key={booking.id} className="border-none rounded-2xl overflow-hidden group bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all">
                <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className={`lg:w-56 p-5 flex flex-col justify-between ${
                    booking.status === 'approved' ? 'bg-emerald-500/10' :
                    booking.status === 'pending' ? 'bg-amber-500/10' : 'bg-slate-700/50'
                  }`}>
                    <div>
                      <Badge className={`${
                        booking.status === 'approved' ? 'bg-emerald-500' :
                        booking.status === 'pending' ? 'bg-amber-500' : 'bg-slate-500'
                      } text-white border-none px-3 py-1 font-bold text-[9px] uppercase tracking-wider rounded-full mb-3`}>
                        {booking.status}
                      </Badge>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Booking Code</p>
                      <p className="text-lg font-black tracking-tight text-white">{booking.booking_code}</p>
                    </div>
                    <div className="mt-4">
                       <div className="flex items-center gap-2 text-gray-400">
                         {booking.status === 'approved' ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> :
                          booking.status === 'pending' ? <Clock className="h-4 w-4 text-amber-400" /> :
                          <CheckCircle2 className="h-4 w-4 text-gray-500" />}
                         <span className="text-xs font-medium">
                           {booking.status === 'approved' ? 'Active Session' :
                            booking.status === 'pending' ? 'Waiting Review' : 'Booking Completed'}
                         </span>
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 p-4 grid md:grid-cols-3 gap-4 items-center">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-gray-400">
                          <Car className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Vehicle</p>
                          <p className="font-bold text-sm text-white">{vehicle?.vehicle_number}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{vehicle?.brand} {vehicle?.model}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
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
