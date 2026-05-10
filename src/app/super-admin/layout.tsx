"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useUser } from "@/lib/hooks/use-user";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import {
  LayoutDashboard,
  Users,
  UserCog,
  MapPin,
  Building2,
  Car,
  Calendar,
  CreditCard,
  ShieldAlert,
  FileText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notification } from "@/lib/types";
import { useHasHydrated } from "@/lib/hooks/use-has-hydrated";

const navigation = [
  { name: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard },
  { name: "Admins", href: "/super-admin/admins", icon: UserCog },
  { name: "Users", href: "/super-admin/users", icon: Users },
  { name: "Divisions", href: "/super-admin/divisions", icon: MapPin },
  { name: "Districts", href: "/super-admin/districts", icon: Building2 },
  { name: "Areas", href: "/super-admin/areas", icon: MapPin },
  { name: "Zones", href: "/super-admin/zones", icon: Building2 },
  { name: "Slots", href: "/super-admin/slots", icon: Car },
  { name: "Bookings", href: "/super-admin/bookings", icon: Calendar },
  { name: "Payments", href: "/super-admin/payments", icon: CreditCard },
  { name: "Blacklist", href: "/super-admin/blacklist", icon: ShieldAlert },
  { name: "Audit Logs", href: "/super-admin/audit-logs", icon: FileText },
  { name: "Reports", href: "/super-admin/reports", icon: BarChart3 },
  { name: "Notifications", href: "/super-admin/notifications", icon: Bell },
  { name: "Settings", href: "/super-admin/settings", icon: Settings },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useUser();
  const hasHydrated = useHasHydrated();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;

      const supabase = createClient();
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (data) {
        setNotifications(data as Notification[]);
        setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
      }
    };

    if (user?.id) {
      fetchNotifications();
    }
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-[280px] bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <Link href="/super-admin/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">ParkBD</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[280px]">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-background border-b flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-muted">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted"
              >
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
                  <p className="text-xs text-muted-foreground">
                    {hasHydrated ? user?.role?.replace("_", " ") : "Loading..."}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl border shadow-lg py-1 z-50">
                  <Link
                    href="/super-admin/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-destructive hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}