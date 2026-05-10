"use client";

import Link from "next/link";
import { useUser } from "@/lib/hooks/use-user";
import { useState } from "react";
import { Avatar } from "@/components/shared/avatar";
import {
  Car,
  Bell,
  Menu,
  Search,
} from "lucide-react";
import { UserSidebar } from "@/components/user/user-sidebar";
import { MobileSidebar } from "@/components/user/mobile-sidebar";
import { BottomNav } from "@/components/user/bottom-nav";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-primary/20 selection:text-primary">
      {/* Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm shadow-slate-200/50">
        <div className="h-full px-6 flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/user/dashboard" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 hidden sm:block uppercase">Park<span className="text-primary">BD</span></span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="flex items-center gap-3 bg-slate-100/80 border border-slate-200/50 rounded-2xl px-4 py-2.5 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 transition-all group">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Search slots, vehicles, or bookings..." className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 relative group transition-all">
              <Bell className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-10 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <Link href="/user/profile" className="flex items-center gap-3 group">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-slate-900 line-clamp-1">{user?.first_name} {user?.last_name}</p>
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">Premium User</p>
               </div>
               <div className="relative">
                 <div className="absolute -inset-1 bg-linear-to-tr from-primary to-accent rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                 <Avatar firstName={user?.first_name} lastName={user?.last_name} src={user?.profile_image} size="sm" className="h-10 w-10 border-2 border-white relative z-10" />
               </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto relative">
        <UserSidebar />
        <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 min-h-[calc(100vh-80px)]">{children}</main>
      </div>

      <BottomNav />
    </div>
  );
}