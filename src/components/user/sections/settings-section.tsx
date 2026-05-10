"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Settings, Bell, Shield, Eye, Smartphone, Globe, Moon } from "lucide-react";

export function SettingsSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-gradient">Settings</h1>
        <p className="text-muted-foreground font-medium">Customize your experience and manage application preferences.</p>
      </div>

      <div className="max-w-4xl space-y-6">
         {[
           {
             title: 'Notification Preferences',
             description: 'Choose what updates you want to receive.',
             icon: Bell,
             color: 'text-blue-500 bg-blue-50',
             settings: [
               { label: 'Push Notifications', value: true },
               { label: 'Email Alerts', value: true },
               { label: 'SMS Notifications', value: false },
             ]
           },
           {
             title: 'Privacy & Visibility',
             description: 'Control who can see your vehicle and booking details.',
             icon: Eye,
             color: 'text-emerald-500 bg-emerald-50',
             settings: [
               { label: 'Public Profile', value: false },
               { label: 'Show Vehicle Number', value: true },
             ]
           },
           {
             title: 'Display Settings',
             description: 'Customize how the dashboard looks on your device.',
             icon: Moon,
             color: 'text-amber-500 bg-amber-50',
             settings: [
               { label: 'Dark Mode', value: false },
               { label: 'Compact View', value: false },
             ]
           },
         ].map((group, idx) => (
           <Card key={idx} className="rounded-[2rem] border-none shadow-sm bg-white/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="px-8 pt-8">
                 <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${group.color}`}>
                       <group.icon className="h-6 w-6" />
                    </div>
                    <div>
                       <CardTitle className="text-xl font-black tracking-tight">{group.title}</CardTitle>
                       <p className="text-xs text-muted-foreground font-medium mt-1">{group.description}</p>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-4">
                 <div className="space-y-4">
                    {group.settings.map((setting, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                         <span className="font-bold text-slate-700">{setting.label}</span>
                         <button className={`w-12 h-6 rounded-full transition-colors relative ${setting.value ? 'bg-primary' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${setting.value ? 'right-1' : 'left-1'}`} />
                         </button>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
         ))}

         <div className="flex justify-end pt-6">
            <Button className="rounded-xl px-12 h-14 font-black shadow-xl shadow-primary/20">
               Save All Preferences
            </Button>
         </div>
      </div>
    </div>
  );
}
