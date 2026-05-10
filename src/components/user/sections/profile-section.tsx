"use client";

import { useUser } from "@/lib/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Input } from "@/components/shared/input";
import { SuccessMessage } from "@/components/shared";
import { User, Camera, Shield, CreditCard } from "lucide-react";
import { useState } from "react";

export function ProfileSection() {
  const { user } = useUser();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-gradient">Profile Settings</h1>
        <p className="text-muted-foreground font-medium">Manage your personal information and account security.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="premium-card overflow-hidden border-none rounded-4xl">
            <div className="h-24 premium-gradient" />
            <CardContent className="px-6 pb-8 -mt-12 text-center">
              <div className="relative inline-block group">
                <Avatar 
                  firstName={user?.first_name} 
                  lastName={user?.last_name} 
                  src={user?.profile_image} 
                  size="xl" 
                  className="h-28 w-28 border-4 border-background shadow-2xl" 
                />
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight">{user?.first_name} {user?.last_name}</h2>
              <p className="text-muted-foreground font-medium text-sm">{user?.email}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                  Premium Member
                </span>
                <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
                  Verified
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-4xl border-none shadow-sm bg-white/50 backdrop-blur-sm p-6 space-y-4">
             <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Account Progress</h3>
             <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Profile Completion</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                </div>
             </div>
             <p className="text-xs text-muted-foreground font-medium leading-relaxed">
               Add your vehicle details and set up a payment method to reach 100%.
             </p>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-4xl border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription className="font-medium">Update your profile details and how others see you.</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">First Name</label>
                  <Input defaultValue={user?.first_name} className="rounded-xl border-slate-200 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Last Name</label>
                  <Input defaultValue={user?.last_name} className="rounded-xl border-slate-200 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email Address</label>
                  <Input defaultValue={user?.email} disabled className="rounded-xl bg-slate-50/50 border-slate-200 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Phone Number</label>
                  <Input defaultValue={user?.phone || "+880 1XXX XXXXXX"} className="rounded-xl border-slate-200 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">NID Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      defaultValue={user?.nid_number || ""} 
                      placeholder="Enter NID Number" 
                      className="pl-10 rounded-xl border-slate-200 focus:ring-primary/20" 
                    />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Address</label>
                  <Input defaultValue={user?.address || "Street, Area, City"} className="rounded-xl border-slate-200 focus:ring-primary/20" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSaveChanges} 
                  disabled={isSaving}
                  className="rounded-xl px-8 font-bold shadow-lg shadow-primary/20"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <SuccessMessage 
            isVisible={showSuccess} 
            message="Profile updated successfully!" 
            onClose={() => setShowSuccess(false)} 
          />

          <Card className="rounded-4xl border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold">PW</div>
                       <div>
                          <p className="font-bold text-sm text-slate-900">Change Password</p>
                          <p className="text-xs text-muted-foreground font-medium">Last changed 3 months ago</p>
                       </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl font-bold">Update</Button>
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">2FA</div>
                       <div>
                          <p className="font-bold text-sm text-slate-900">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground font-medium">Currently disabled</p>
                       </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl font-bold">Enable</Button>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
