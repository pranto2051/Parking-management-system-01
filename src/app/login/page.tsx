"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockSuperAdmin, mockSubAdmins, mockUsers } from "@/lib/data";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Car, Eye, EyeOff, Mail, Lock, Users, Zap, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { isDemoMode, setDemoMode } = useDemoModeStore();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDemoLogin = (role: "super_admin" | "sub_admin" | "user", index: number = 0) => {
    setDemoMode(true);
    if (role === "super_admin") {
      setUser(mockSuperAdmin as never);
      router.push("/super-admin/dashboard");
    } else if (role === "sub_admin") {
      const subAdmin = mockSubAdmins[index] || mockSubAdmins[0];
      setUser(subAdmin as never);
      router.push("/sub-admin/dashboard");
    } else {
      const user = mockUsers[index] || mockUsers[0];
      setUser(user as never);
      router.push("/user/dashboard");
    }
    toast.success("Demo mode activated!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        toast.success("Login successful!");

        const profileRole = (profile as unknown as { role: string })?.role;
        if (profileRole === "super_admin") {
          router.push("/super-admin/dashboard");
        } else if (profileRole === "sub_admin") {
          router.push("/sub-admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Mouse Glow Effect */}
      <div 
        className="mouse-glow hidden lg:block"
        style={{ 
          left: mousePosition.x, 
          top: mousePosition.y 
        }}
      />

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-20 text-white space-y-12">
          <div className="animate-float">
            <div className="h-24 w-24 rounded-[2rem] bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
              <Car className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-black tracking-tighter">
              Park<span className="text-accent">BD</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-md leading-relaxed font-medium">
              Join thousands of users managing parking slots across Bangladesh with our state-of-the-art platform.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
            <div className="p-8 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-colors">
              <p className="text-4xl font-black mb-2">1000+</p>
              <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">Parking Slots</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-colors">
              <p className="text-4xl font-black mb-2">50+</p>
              <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">Active Zones</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/60 text-sm font-bold tracking-widest">
            <ShieldCheck className="h-4 w-4" />
            SECURED BY ENTERPRISE GRADE ENCRYPTION
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
              <Car className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter">
              Park<span className="text-primary">BD</span>
            </span>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center pb-8 space-y-2">
              <CardTitle className="text-4xl font-black tracking-tight">Welcome Back</CardTitle>
              <p className="text-muted-foreground font-medium">
                Enter your credentials to access your dashboard
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Demo Login Buttons */}
              <div className="p-6 glass-card rounded-[2rem] border border-primary/10">
                <p className="text-xs font-black mb-4 text-center uppercase tracking-[0.2em] text-primary">Quick Access</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { role: "super_admin", label: "Super", color: "bg-primary" },
                    { role: "sub_admin", label: "Admin", color: "bg-blue-600" },
                    { role: "user", label: "User", color: "bg-emerald-600" }
                  ].map((btn) => (
                    <button
                      key={btn.role}
                      onClick={() => handleDemoLogin(btn.role as any)}
                      className="flex flex-col items-center gap-2 group p-2 rounded-2xl hover:bg-white transition-colors"
                    >
                      <div className={`h-12 w-12 rounded-xl ${btn.color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                        <Users className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-muted-foreground">
                  <span className="bg-background px-4">OR SECURE LOGIN</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Email Address</label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    icon={<Mail className="h-4 w-4 text-primary" />}
                    className="h-14 rounded-2xl border-muted-foreground/10 focus:border-primary/50 transition-all bg-white"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-black uppercase tracking-widest">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      icon={<Lock className="h-4 w-4 text-primary" />}
                      className="h-14 rounded-2xl border-muted-foreground/10 focus:border-primary/50 transition-all bg-white"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Access Dashboard"}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-muted-foreground font-medium">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline font-black">
                    Create One Now
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}