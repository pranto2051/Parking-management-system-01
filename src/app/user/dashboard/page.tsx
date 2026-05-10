"use client";

import { useState } from "react";
import { useUser, useSwitchDemoUser } from "@/lib/hooks/use-user";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import {
  mockUserStats,
  mockBookings,
  mockVehicles,
} from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Car, Calendar, Bell, MapPin, Plus, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function UserDashboard() {
  const { user } = useUser();
  const { isDemoMode } = useDemoModeStore();
  const { switchToSuperAdmin, switchToSubAdmin, switchToUser } = useSwitchDemoUser();
  const [isLoading] = useState(false);

  const stats = isDemoMode ? mockUserStats : { activeBookings: 0, totalVehicles: 0, pendingRequests: 0, notifications: 0 };
  const recentBookings = isDemoMode ? mockBookings : [];
  const vehicles = isDemoMode ? mockVehicles : [];

  const activeBooking = recentBookings.find((b) => b.status === "approved");

  return (
    <div className="space-y-10 pb-20 lg:pb-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
            Welcome back, {user?.first_name || "User"}!
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            Your parking command center is ready.
          </p>
        </div>
        {isDemoMode && (
          <div className="flex items-center gap-2 p-1 bg-muted rounded-xl border">
            <Button variant="ghost" size="sm" onClick={switchToSuperAdmin} className="rounded-lg text-xs">
              Admin
            </Button>
            <Button variant="ghost" size="sm" onClick={() => switchToSubAdmin(0)} className="rounded-lg text-xs">
              Staff
            </Button>
            <Button variant="secondary" size="sm" onClick={() => switchToUser(0)} className="rounded-lg shadow-sm text-xs px-4">
              User
            </Button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="relative group overflow-hidden rounded-[2rem] premium-gradient p-[1px] shadow-2xl">
        <div className="absolute inset-0 bg-dots opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <Card className="bg-background/95 backdrop-blur-xl border-none relative z-10 overflow-hidden rounded-[calc(2rem-1px)]">
          <CardContent className="p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-accent rounded-full blur-lg opacity-40 animate-pulse"></div>
                  <Avatar 
                    firstName={user?.first_name} 
                    lastName={user?.last_name} 
                    src={user?.profile_image} 
                    size="xl" 
                    className="h-24 w-24 text-4xl border-4 border-background relative z-10 shadow-2xl" 
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-black tracking-tight">{user?.first_name} {user?.last_name}</h2>
                  <p className="text-muted-foreground font-medium text-lg">{user?.email}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary px-3 py-1 rounded-full">
                      <Star className="h-3 w-3 mr-1 fill-primary" /> Verified Member
                    </Badge>
                    <p className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      Joined {new Date(user?.created_at || "2024-01-01").toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/user/vehicles">
                  <Button className="rounded-2xl h-14 px-8 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95">
                    <Plus className="h-5 w-5 mr-2 stroke-[3]" />
                    Register Vehicle
                  </Button>
                </Link>
                <Link href="/user/slots">
                  <Button variant="outline" className="rounded-2xl h-14 px-8 font-bold border-primary/20 hover:bg-primary/5 transition-all hover:-translate-y-1 active:scale-95">
                    <MapPin className="h-5 w-5 mr-2 stroke-[3]" />
                    Explore Slots
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
          
          {/* Decorative element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-3d border-none bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-blue-500/5 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8" />
              </div>
              <div>
                <p className="text-4xl font-black text-blue-600 tracking-tighter">{stats.activeBookings}</p>
                <p className="text-xs font-bold text-blue-600/70 uppercase tracking-[0.2em]">Active Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-3d border-none bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 shadow-emerald-500/5 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                <Car className="h-8 w-8" />
              </div>
              <div>
                <p className="text-4xl font-black text-emerald-600 tracking-tighter">{stats.totalVehicles}</p>
                <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-[0.2em]">Registered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-none bg-gradient-to-br from-amber-500/10 to-amber-600/5 shadow-amber-500/5 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/40 group-hover:scale-110 transition-transform">
                <Bell className="h-8 w-8" />
              </div>
              <div>
                <p className="text-4xl font-black text-amber-600 tracking-tighter">{stats.pendingRequests}</p>
                <p className="text-xs font-bold text-amber-600/70 uppercase tracking-[0.2em]">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d border-none bg-gradient-to-br from-rose-500/10 to-rose-600/5 shadow-rose-500/5 rounded-3xl overflow-hidden group">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/40 group-hover:scale-110 transition-transform">
                <Bell className="h-8 w-8" />
              </div>
              <div>
                <p className="text-4xl font-black text-rose-600 tracking-tighter">{stats.notifications}</p>
                <p className="text-xs font-bold text-rose-600/70 uppercase tracking-[0.2em]">New Updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="h-10 w-2 bg-primary rounded-full"></span>
              Explore ParkBD
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <Link href="/user/slots" className="group">
              <Card className="card-3d h-full border-none bg-card hover:bg-primary/5 transition-all rounded-[2rem]">
                <CardContent className="p-10 flex flex-col items-center text-center gap-6">
                  <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl shadow-primary/5">
                    <MapPin className="h-10 w-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">Find a Slot</h3>
                    <p className="text-sm text-muted-foreground mt-2 px-2 font-medium">Browse & book premium parking spaces instantly</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/user/bookings" className="group">
              <Card className="card-3d h-full border-none bg-card hover:bg-secondary/5 transition-all rounded-[2rem]">
                <CardContent className="p-10 flex flex-col items-center text-center gap-6">
                  <div className="h-20 w-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-2xl shadow-secondary/5">
                    <Calendar className="h-10 w-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">My Bookings</h3>
                    <p className="text-sm text-muted-foreground mt-2 px-2 font-medium">Manage your current & past reservations with ease</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/user/vehicles" className="group">
              <Card className="card-3d h-full border-none bg-card hover:bg-accent/5 transition-all rounded-[2rem]">
                <CardContent className="p-10 flex flex-col items-center text-center gap-6">
                  <div className="h-20 w-20 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-2xl shadow-accent/5">
                    <Car className="h-10 w-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">My Vehicles</h3>
                    <p className="text-sm text-muted-foreground mt-2 px-2 font-medium">Add and manage your fleet for faster checkout</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <span className="h-10 w-2 bg-accent rounded-full"></span>
            Status Feed
          </h3>
          
          {activeBooking ? (
            <Card className="premium-card overflow-hidden border-none group rounded-[2rem]">
              <div className="h-3 w-full bg-primary shadow-xl shadow-primary/30"></div>
              <CardHeader className="pb-4 pt-8 px-8">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-black tracking-tight">Active Session</CardTitle>
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none px-4 py-1 animate-pulse font-bold rounded-full">LIVE</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-10">
                <div className="p-6 bg-muted/50 rounded-3xl flex items-center gap-6 group-hover:bg-muted/80 transition-colors border">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                    <Car className="h-8 w-8 text-primary stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Selected Slot</p>
                    <p className="text-2xl font-black tracking-tight">Slot {activeBooking.slot_id?.slice(-3)}</p>
                    <p className="text-sm font-mono text-primary font-bold mt-1">{vehicles[0]?.vehicle_number}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-left space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-black tracking-tighter">Amount Paid</p>
                    <p className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(activeBooking.total_amount)}</p>
                  </div>
                  <Link href="/user/bookings">
                    <Button variant="ghost" className="group-hover:translate-x-2 transition-transform font-bold text-primary hover:bg-primary/5 rounded-xl">
                      Manage <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 bg-muted/30 rounded-[2rem]">
              <CardContent className="p-12 text-center space-y-5">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto opacity-50 shadow-inner">
                  <MapPin className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-muted-foreground">No active sessions</p>
                  <p className="text-sm text-muted-foreground/60 font-medium">Ready to park? Browse our available slots across the city.</p>
                </div>
                <Link href="/user/slots">
                  <Button className="mt-4 rounded-2xl h-12 px-8 font-bold shadow-lg shadow-muted/20">Book Now</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Simple tip card */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10 space-y-3">
               <h4 className="font-black flex items-center gap-3 text-lg">
                 <div className="h-8 w-8 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-accent animate-bounce" />
                 </div>
                 Smart Tip
               </h4>
               <p className="text-base text-slate-300 font-medium leading-relaxed">
                 Book at least 2 hours in advance during peak times to guarantee your spot and get exclusive rates!
               </p>
               <Button variant="link" className="text-accent p-0 font-bold h-auto hover:text-accent/80">Learn more</Button>
             </div>
             <div className="absolute -top-10 -right-10 opacity-10">
               <Car className="h-48 w-48 transform rotate-12" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}