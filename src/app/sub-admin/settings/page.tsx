"use client";

import { useUser } from "@/lib/hooks/use-user";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Avatar } from "@/components/shared/avatar";
import { User, Mail, Phone, MapPin, Shield, Bell, Save } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and profile information."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b">
                <Avatar firstName={user?.first_name || "A"} lastName={user?.last_name || "D"} size="xl" />
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input id="first_name" defaultValue={user?.first_name} icon={<User className="h-4 w-4" />} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input id="last_name" defaultValue={user?.last_name} icon={<User className="h-4 w-4" />} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user?.email} icon={<Mail className="h-4 w-4" />} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={user?.phone} icon={<Phone className="h-4 w-4" />} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={user?.address} icon={<MapPin className="h-4 w-4" />} />
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <Input id="current_password" type="password" icon={<Shield className="h-4 w-4" />} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input id="new_password" type="password" icon={<Shield className="h-4 w-4" />} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input id="confirm_password" type="password" icon={<Shield className="h-4 w-4" />} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Email Notifications", desc: "Receive updates via email" },
                { label: "Push Notifications", desc: "Receive alerts on your device" },
                { label: "Booking Requests", desc: "New request alerts" },
                { label: "Payment Alerts", desc: "Successful payment alerts" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="h-5 w-9 rounded-full bg-primary/20 relative cursor-pointer">
                    <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-primary" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">Deactivate Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
