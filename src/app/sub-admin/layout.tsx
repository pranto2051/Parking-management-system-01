"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useUser } from "@/lib/hooks/use-user";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/shared/avatar";
import {
  LayoutDashboard,
  Building2,
  Car,
  Calendar,
  Users,
  CreditCard,
  Bell,
  Ticket,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHasHydrated } from "@/lib/hooks/use-has-hydrated";

const navigation = [
  { name: "Dashboard", href: "/sub-admin/dashboard", icon: LayoutDashboard },
  { name: "My Zones", href: "/sub-admin/my-zones", icon: Building2 },
  { name: "Slots", href: "/sub-admin/slots", icon: Car },
  { name: "Requests", href: "/sub-admin/requests", icon: Calendar },
  { name: "Bookings", href: "/sub-admin/bookings", icon: Calendar },
  { name: "Users", href: "/sub-admin/users", icon: Users },
  { name: "Payments", href: "/sub-admin/payments", icon: CreditCard },
  { name: "Tickets", href: "/sub-admin/tickets", icon: Ticket },
  { name: "Reports", href: "/sub-admin/reports", icon: BarChart3 },
  { name: "Notifications", href: "/sub-admin/notifications", icon: Bell },
  { name: "Settings", href: "/sub-admin/settings", icon: Settings },
];

export default function SubAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useUser();
  const hasHydrated = useHasHydrated();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-[280px] bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700" suppressHydrationWarning>
          <Link href="/sub-admin/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center" suppressHydrationWarning>
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">ParkBD</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]" suppressHydrationWarning>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700" suppressHydrationWarning>
          <button onClick={signOut} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="lg:pl-[280px]" suppressHydrationWarning>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-8" suppressHydrationWarning>
          <div className="flex items-center gap-4" suppressHydrationWarning>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-muted">
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 w-64" suppressHydrationWarning>
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none text-sm focus:outline-none w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4" suppressHydrationWarning>
            <button className="relative p-2 rounded-lg hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </button>
            
            <div className="relative" suppressHydrationWarning>
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                <Avatar 
                  firstName={hasHydrated ? user?.first_name : undefined} 
                  lastName={hasHydrated ? user?.last_name : undefined} 
                  src={hasHydrated ? user?.profile_image : undefined}
                  size="sm" 
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">
                    {hasHydrated ? `${user?.first_name} ${user?.last_name}` : "Loading..."}
                  </p>
                  <p className="text-xs text-muted-foreground">Sub Admin</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl border shadow-lg py-1 z-50">
                  <Link href="/sub-admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button onClick={signOut} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-destructive hover:bg-muted">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}