"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation, NavItem } from "./user-sidebar";

export function BottomNav() {
  const pathname = usePathname();
  
  // Show first 5 items on bottom nav
  const bottomNavItems = navigation.slice(0, 5);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-slate-200 h-20 flex items-center justify-around z-50 px-2 pb-2 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)]">
      {bottomNavItems.map((item: NavItem) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all relative", 
              isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {isActive && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-primary rounded-full" />
            )}
            <item.icon className={cn("h-6 w-6 transition-transform", isActive ? "stroke-[2.5] scale-110" : "stroke-[2]")} />
            <span className={cn("text-[10px] font-black uppercase tracking-wider transition-all", isActive ? "opacity-100" : "opacity-70")}>
              {item.name.split(' ').pop()}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
