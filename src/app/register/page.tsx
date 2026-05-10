"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { 
  Car, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  CheckCircle2,
  Building2,
  Gamepad2 as SteeringWheel
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Identity", icon: User, description: "Who are you?" },
  { id: 2, title: "Credentials", icon: Mail, description: "Secure access" },
  { id: 3, title: "Verification", icon: ShieldCheck, description: "Final details" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    userType: "driver" as "driver" | "owner",
    address: "",
    nidNumber: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== ""
      );
    }
    if (step === 2) {
      return (
        formData.username.trim() !== "" &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword
      );
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert(
          {
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            address: formData.address || null,
            nid_number: formData.nidNumber || null,
            user_type: formData.userType,
            role: "user",
          } as never
        );

        if (profileError) {
          throw profileError;
        }

        toast.success("Registration successful! Please check your email to verify.");
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
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
              Join Park<span className="text-accent">BD</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-md leading-relaxed font-medium">
              Start your journey today. Find the perfect slot or manage your own parking zone with ease.
            </p>
          </div>
          
          <div className="space-y-6 w-full max-w-sm">
            {[
              "Real-time slot tracking",
              "Secure digital payments",
              "24/7 Premium support",
              "Verified parking zones"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-primary-foreground/60 text-sm font-bold tracking-widest uppercase">
            <ShieldCheck className="h-4 w-4" />
            Trusted by 500+ users across Bangladesh
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10 overflow-y-auto">
        <div className="w-full max-w-xl py-12">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
              <Car className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter">
              Park<span className="text-primary">BD</span>
            </span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-16 px-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative group">
                <div
                  className={cn(
                    "flex items-center justify-center h-14 w-14 rounded-2xl transition-all duration-500 z-10 shadow-lg",
                    currentStep >= step.id
                      ? "bg-primary text-white scale-110"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <p className={cn(
                    "text-xs font-black uppercase tracking-widest mb-1",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground/60 hidden sm:block">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden sm:block absolute top-7 left-[calc(100%+0.5rem)] w-[calc(200%-4rem)] h-1 rounded-full",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center pb-8 space-y-2">
              <CardTitle className="text-4xl font-black tracking-tight">
                {currentStep === 1 && "Start Your Profile"}
                {currentStep === 2 && "Secure Your Account"}
                {currentStep === 3 && "Almost There!"}
              </CardTitle>
              <p className="text-muted-foreground font-medium">
                Please fill in the details below to proceed
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest ml-1">First Name</label>
                        <Input
                          placeholder="John"
                          icon={<User className="h-4 w-4 text-primary" />}
                          className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest ml-1">Last Name</label>
                        <Input
                          placeholder="Doe"
                          className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Email Address</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        icon={<Mail className="h-4 w-4 text-primary" />}
                        className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        icon={<Phone className="h-4 w-4 text-primary" />}
                        className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Choose Username</label>
                      <Input
                        placeholder="johndoe_123"
                        icon={<User className="h-4 w-4 text-primary" />}
                        className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          icon={<Lock className="h-4 w-4 text-primary" />}
                          className="h-14 rounded-2xl bg-white border-muted-foreground/10"
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
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Confirm Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        icon={<Lock className="h-4 w-4 text-primary" />}
                        className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Who are you?</label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'driver', label: 'Driver', icon: SteeringWheel, desc: 'I want to park' },
                          { id: 'owner', label: 'Zone Owner', icon: Building2, desc: 'I have slots' }
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, userType: type.id as any })}
                            className={cn(
                              "flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 transition-all duration-300",
                              formData.userType === type.id
                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                                : "border-muted-foreground/10 bg-white hover:border-primary/30"
                            )}
                          >
                            <div className={cn(
                              "h-12 w-12 rounded-xl flex items-center justify-center transition-transform",
                              formData.userType === type.id ? "bg-primary text-white rotate-6" : "bg-muted text-muted-foreground"
                            )}>
                              <type.icon className="h-6 w-6" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-black uppercase tracking-wider">{type.label}</p>
                              <p className="text-[10px] font-bold text-muted-foreground/60">{type.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">Physical Address</label>
                      <Input
                        placeholder="House #, Road #, Area, City"
                        icon={<MapPin className="h-4 w-4 text-primary" />}
                        className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest ml-1">NID Number</label>
                      <Input
                        placeholder="Enter 10 or 13 digit NID"
                        icon={<FileText className="h-4 w-4 text-primary" />}
                        className="h-14 rounded-2xl bg-white border-muted-foreground/10"
                        value={formData.nidNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, nidNumber: e.target.value })
                        }
                      />
                    </div>
                    <div className="p-6 glass-card rounded-[2rem] border border-primary/10 flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                        By clicking "Create Account", you agree to our <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>. We will verify your NID for security.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBack} 
                      className="h-16 flex-1 rounded-2xl font-black text-lg border-muted-foreground/20"
                    >
                      <ChevronLeft className="mr-2 h-5 w-5" />
                      Back
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button 
                      type="button" 
                      onClick={handleNext} 
                      className="h-16 flex-1 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="h-16 flex-1 rounded-2xl font-black text-lg shadow-xl shadow-primary/20" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create Account"}
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground font-medium">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-black">
                    Sign In Here
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