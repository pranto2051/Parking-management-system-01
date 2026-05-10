"use client";

import { SectionShell } from "@/components/super-admin/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Shield, User, Bell, Globe, Lock, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  return (
    <SectionShell
      title="System Settings"
      description="Configure platform parameters and manage your account preferences."
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { label: "General Settings", icon: Globe, active: true },
            { label: "Profile Information", icon: User },
            { label: "Security & Passwords", icon: Lock },
            { label: "Notification Rules", icon: Bell },
            { label: "System Permissions", icon: Shield },
          ].map((item, i) => (
            <button
              key={i}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                item.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Platform Name</label>
                  <Input defaultValue="ParkBD" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Support Email</label>
                  <Input defaultValue="support@parkbd.com" className="h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">System Maintenance Mode</label>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
                  <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Disable public access</p>
                    <p className="text-xs text-muted-foreground">Only admins will be able to access the dashboard during maintenance.</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">Enable</Button>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="h-12 px-8 rounded-xl font-black" onClick={() => toast.success("Settings saved successfully")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}

import { cn } from "@/lib/utils";
