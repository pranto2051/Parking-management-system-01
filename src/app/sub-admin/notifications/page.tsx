"use client";

import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockNotifications } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Bell, Check, Trash2, Calendar, CreditCard, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { cn } from "@/lib/utils";
import { FormattedDate } from "@/components/shared/formatted-date";

export default function NotificationsPage() {
  const { isDemoMode } = useDemoModeStore();
  const notifications = isDemoMode ? mockNotifications : [];

  const getIcon = (type: string) => {
    switch (type) {
      case "booking": return <Calendar className="h-5 w-5 text-blue-500" />;
      case "payment": return <CreditCard className="h-5 w-5 text-green-500" />;
      case "system": return <ShieldAlert className="h-5 w-5 text-orange-500" />;
      default: return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Notifications"
          description="Stay updated with the latest activities and alerts."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive">
            Clear all
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Card key={notif.id} className={cn("transition-colors", !notif.is_read && "bg-primary/5 border-primary/20")}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-background border flex items-center justify-center shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-sm truncate">{notif.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        <FormattedDate date={notif.created_at} />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{notif.message}</p>
                    <div className="flex items-center gap-2">
                      {!notif.is_read && (
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                          <Check className="mr-1 h-3 w-3" /> Mark read
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-destructive">
                        <Trash2 className="mr-1 h-3 w-3" /> Delete
                      </Button>
                    </div>
                  </div>
                  {!notif.is_read && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notifications to show</p>
          </div>
        )}
      </div>
    </div>
  );
}
