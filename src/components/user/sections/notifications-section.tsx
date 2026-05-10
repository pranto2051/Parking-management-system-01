"use client";

import { mockNotifications } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Bell, Calendar, CreditCard, Info, CheckCircle2, MessageSquare } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";

export function NotificationsSection() {
  const { isDemoMode } = useDemoModeStore();
  const notifications = isDemoMode ? mockNotifications : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gradient">Notifications</h1>
          <p className="text-muted-foreground font-medium">Stay updated with your booking status and system alerts.</p>
        </div>
        <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-slate-200">
          Mark all as read
        </Button>
      </div>

      <div className="max-w-4xl space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`rounded-3xl border-none shadow-sm transition-all hover:shadow-md ${notif.is_read ? 'bg-white/50 backdrop-blur-sm' : 'bg-white shadow-md border-l-4 border-l-primary'}`}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  notif.type === 'booking' ? 'bg-blue-50 text-blue-500' : 
                  notif.type === 'payment' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-500'
                }`}>
                  {notif.type === 'booking' ? <Calendar className="h-6 w-6" /> : 
                   notif.type === 'payment' ? <CreditCard className="h-6 w-6" /> : <Info className="h-6 w-6" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`font-black text-lg ${notif.is_read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">{notif.message}</p>
                  {!notif.is_read && (
                    <div className="pt-4 flex items-center gap-3">
                       <Button size="sm" className="rounded-lg font-bold text-xs">View Details</Button>
                       <Button variant="ghost" size="sm" className="rounded-lg font-bold text-xs text-slate-400">Dismiss</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-20">
             <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                <Bell className="h-10 w-10 text-slate-300" />
             </div>
             <p className="text-xl font-bold text-slate-400">All caught up!</p>
             <p className="text-slate-400 font-medium">No new notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
