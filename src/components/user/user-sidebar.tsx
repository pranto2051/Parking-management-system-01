"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Car,
  MapPin,
  Calendar,
  CreditCard,
  Bell,
  Star,
  Ticket,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { useUser } from "@/lib/hooks/use-user";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export const navigation: NavItem[] = [
  { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/user/profile", icon: User },
  { name: "My Vehicles", href: "/user/vehicles", icon: Car },
  { name: "Browse Slots", href: "/user/slots", icon: MapPin },
  { name: "My Bookings", href: "/user/bookings", icon: Calendar },
  { name: "Payments", href: "/user/payments", icon: CreditCard },
  { name: "Notifications", href: "/user/notifications", icon: Bell },
  { name: "Reviews", href: "/user/reviews", icon: Star },
  { name: "Support", href: "/user/tickets", icon: Ticket },
  { name: "Settings", href: "/user/settings", icon: Settings },
];

export function UserSidebar() {
  const pathname = usePathname();
  const { signOut } = useUser();

  const mainMenu = navigation.slice(0, 6);
  const supportMenu = navigation.slice(6);

  return (
    <aside className="hidden lg:flex flex-col w-72 min-h-[calc(100vh-80px)] sticky top-20 border-r border-slate-200/60 p-6 space-y-8 bg-white/50 backdrop-blur-sm">
      <div className="flex-1">
        <div className="space-y-8">
          <div>
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
            <nav className="space-y-1.5">
              {mainMenu.map((item: NavItem) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative overflow-hidden",
                      isActive 
                        ? "bg-primary text-white shadow-xl shadow-primary/20" 
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110 relative z-10", isActive ? "text-white" : "text-slate-400")} />
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Support & Settings</p>
            <nav className="space-y-1.5">
              {supportMenu.map((item: NavItem) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative overflow-hidden",
                      isActive 
                        ? "bg-primary text-white shadow-xl shadow-primary/20" 
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110 relative z-10", isActive ? "text-white" : "text-slate-400")} />
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <button 
          onClick={signOut} 
          className="flex items-center gap-3.5 w-full px-4 py-3 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 hover:shadow-inner transition-all group"
        >
          <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
            <LogOut className="h-4 w-4" />
          </div>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
