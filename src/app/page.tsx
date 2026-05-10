"use client";

import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import {
  MapPin,
  Clock,
  CreditCard,
  Users,
  BarChart3,
  Smartphone,
  Car,
  ChevronRight,
  Zap,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";
import { useState, useEffect, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Real-time Slot Availability",
    description: "Check live parking slot availability across all zones in Bangladesh instantly.",
    color: "primary",
    bg: "bg-blue-500/10",
    text: "text-blue-600",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Online Booking & Payment",
    description: "Book slots and pay securely through bKash, Nagad, or bank transfer.",
    color: "secondary",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Multi-zone Management",
    description: "Manage multiple parking zones from a single dashboard with ease.",
    color: "accent",
    bg: "bg-rose-500/10",
    text: "text-rose-600",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Role-based Access Control",
    description: "Hierarchical access for Super Admin, Sub Admin, and regular users.",
    color: "info",
    bg: "bg-indigo-500/10",
    text: "text-indigo-600",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics & Reports",
    description: "Comprehensive analytics with exportable reports for better decision-making.",
    color: "warning",
    bg: "bg-amber-500/10",
    text: "text-amber-600",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile-friendly",
    description: "Fully responsive design that works perfectly on all devices.",
    color: "success",
    bg: "bg-cyan-500/10",
    text: "text-cyan-600",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Register Account",
    description: "Create your account with basic information and verify your phone number.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    step: "02",
    title: "Find a Slot",
    description: "Browse available parking slots by location, type, and price.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    step: "03",
    title: "Book & Pay",
    description: "Select your slot, choose duration, and complete payment securely.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    step: "04",
    title: "Park Your Vehicle",
    description: "Use your booking QR code to access the parking slot instantly.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const pricingPlans = [
  {
    type: "Car",
    icon: <Car className="h-8 w-8" />,
    price: "3,000",
    period: "/month",
    features: ["Covered parking", "24/7 access", "Security camera", "CCTV monitoring"],
    popular: false,
    color: "text-blue-600",
    border: "hover:border-blue-500/50",
  },
  {
    type: "Bike",
    icon: <Car className="h-8 w-8" />,
    price: "500",
    period: "/month",
    features: ["Dedicated bike parking", "Locking facility", "24/7 access", "Secure area"],
    popular: true,
    color: "text-primary",
    border: "border-primary shadow-primary/20 shadow-xl scale-105 z-10",
  },
  {
    type: "Truck",
    icon: <Car className="h-8 w-8" />,
    price: "8,000",
    period: "/month",
    features: ["Large space", "Loading area", "24/7 access", "Security guard"],
    popular: false,
    color: "text-rose-600",
    border: "hover:border-rose-500/50",
  },
  {
    type: "Bus",
    icon: <Car className="h-8 w-8" />,
    price: "15,000",
    period: "/month",
    features: ["Dedicated bus lane", "Wide space", "24/7 access", "Security guard"],
    popular: false,
    color: "text-amber-600",
    border: "hover:border-amber-500/50",
  },
];

const stats = [
  { value: "1000+", label: "Parking Slots" },
  { value: "50+", label: "Active Zones" },
  { value: "10+", label: "Districts" },
  { value: "500+", label: "Happy Users" },
];

const divisions = [
  { name: "Dhaka", zones: 15, color: "bg-blue-500" },
  { name: "Chittagong", zones: 12, color: "bg-emerald-500" },
  { name: "Sylhet", zones: 8, color: "bg-rose-500" },
  { name: "Khulna", zones: 6, color: "bg-amber-500" },
  { name: "Barisal", zones: 5, color: "bg-indigo-500" },
  { name: "Rangpur", zones: 4, color: "bg-cyan-500" },
];

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted) return;
    const targetValue = value.replace(/\D/g, "");
    if (!targetValue) return;
    
    const target = parseInt(targetValue);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, mounted]);

  if (!mounted) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {count}
      {suffix || (value.includes("+") ? "+" : "")}
    </span>
  );
}

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Mouse Glow Effect */}
      {mounted && (
        <div 
          className="mouse-glow hidden lg:block"
          style={{ 
            left: mousePosition.x, 
            top: mousePosition.y 
          }}
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20" suppressHydrationWarning>
        <div className="container mx-auto px-4" suppressHydrationWarning>
          <div className="flex h-16 items-center justify-between" suppressHydrationWarning>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:rotate-12" suppressHydrationWarning>
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Park<span className="text-primary">BD</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8" suppressHydrationWarning>
              {["Features", "How It Works", "Coverage", "Pricing"].map((item) => (
                <Link 
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`} 
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3" suppressHydrationWarning>
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-primary/10">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-10" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <Badge variant="secondary" className="px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                <Zap className="h-3 w-3 mr-2 fill-primary" />
                Bangladesh&apos;s Premier Parking Solution
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Smart Parking for a{" "}
                <span className="text-gradient">
                  Faster Nation
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Find, Book, and Manage Parking Slots Across Bangladesh in Seconds. Join the revolution of smart mobility.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 shadow-xl shadow-primary/20">
                    Book a Slot Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 glass-card">
                    Manage Your Zone
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-6 border-t border-primary/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-12 rounded-full bg-linear-to-br from-primary to-accent border-4 border-background flex items-center justify-center text-xs font-bold text-white shadow-lg"
                    >
                      U{i}
                    </div>
                  ))}
                  <div className="h-12 w-12 rounded-full bg-muted border-4 border-background flex items-center justify-center text-xs font-bold text-muted-foreground">
                    +500
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg">500+ Active Users</p>
                  <p className="text-sm text-muted-foreground">Trusted by commuters nationwide</p>
                </div>
              </div>
            </div>
            <div className="relative group animate-in zoom-in duration-1000">
              <div className="relative z-10 hover-lift">
                <div className="glass-card rounded-[2.5rem] p-8 shadow-2xl border border-white/30">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Live Status</p>
                      <p className="text-4xl font-bold mt-1">247 <span className="text-lg font-normal text-muted-foreground">Slots</span></p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-600 px-4 py-2 rounded-full font-bold text-sm animate-pulse-soft">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      LIVE
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className={`h-20 rounded-2xl transition-all duration-500 ${
                          i <= 4
                            ? "bg-linear-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-500/20 shadow-inner"
                            : "bg-muted/50 border border-dashed border-muted-foreground/20"
                        }`}
                      >
                        {i <= 4 && (
                          <div className="h-full flex items-center justify-center">
                            <Car className="h-8 w-8 text-emerald-500 animate-float" style={{ animationDelay: `${i * 0.2}s` }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-muted-foreground">Real-time Occupancy</span>
                      <span className="text-primary">67%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-muted-foreground/10">
                      <div 
                        className="h-full bg-linear-to-r from-primary to-accent rounded-full transition-all duration-1000"
                        style={{ width: "67%" }}
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground italic">Last updated just now</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent/20 rounded-full blur-[80px] animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-muted/50 border-y border-primary/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <p className="text-5xl font-extrabold text-primary mb-2 transition-transform group-hover:scale-110">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">Powerful Core</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" suppressHydrationWarning>
              Everything You Need for <span className="text-primary">Smart Parking</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our platform provides comprehensive tools for managing and using parking facilities across Bangladesh.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group relative p-8 hover-lift glass-card border-l-4 border-l-transparent hover:border-l-primary`}
              >
                <CardContent className="p-0 space-y-6">
                  <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.text} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                    {feature.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="pt-4 border-t border-muted/50 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Seamless Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Simple Steps to <span className="text-emerald-600">Get Started</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join our platform in minutes and start your stress-free parking journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <Card className="p-10 h-full glass-card hover:bg-white/60 transition-all duration-500">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className={`text-7xl font-black bg-clip-text text-transparent bg-linear-to-br ${step.gradient} opacity-20 mb-6 group-hover:opacity-40 transition-opacity`}>
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 grow">{step.description}</p>
                    <div className={`h-1.5 w-12 rounded-full bg-linear-to-r ${step.gradient}`} />
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="h-8 w-8 rounded-full bg-white border shadow-sm flex items-center justify-center">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="coverage" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 border-rose-500/20">Nationwide Network</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Present Across <span className="text-rose-600">Bangladesh</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Expanding rapidly to provide secure parking in every corner of the country.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {divisions.map((division, index) => (
              <div key={index} className="group cursor-pointer">
                <Card className="p-6 flex items-center justify-between glass-card hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl ${division.color} flex items-center justify-center text-white shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform`}>
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{division.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{division.zones} active zones</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-primary/5 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Fair Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Choose the Right <span className="text-primary">Plan for You</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Affordable and transparent pricing for all vehicle types.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative p-8 glass-card border-2 transition-all duration-500 hover:shadow-2xl ${plan.border}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-0 flex flex-col h-full">
                  <div className={`h-16 w-16 rounded-2xl bg-white shadow-xl flex items-center justify-center ${plan.color} mb-8 transition-transform hover:scale-110`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.type}</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black tracking-tight">৳{plan.price}</span>
                    <span className="text-muted-foreground font-medium">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-10 grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm font-medium text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full h-12 rounded-xl font-bold ${
                      plan.popular ? 'bg-primary' : 'bg-white text-primary border-2 border-primary hover:bg-primary/5'
                    }`}
                  >
                    Select {plan.type}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">User Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">Trusted by <span className="text-amber-600">Thousands</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Arifur Rahman", role: "Daily Commuter", quote: "ParkBD has completely changed my morning routine. I no longer worry about finding a spot in Motijheel." },
              { name: "Sarah Islam", role: "Business Owner", quote: "Managing my building&apos;s parking has never been easier. The sub-admin dashboard is a lifesaver." },
              { name: "Tanvir Ahmed", role: "App User", quote: "The real-time availability feature is incredibly accurate. Best utility app in Bangladesh!" }
            ].map((t, i) => (
              <Card key={i} className="p-8 hover-lift glass-card">
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[1, 2, 3, 4, 5].map(star => <Zap key={star} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-lg font-medium text-slate-700 italic mb-8">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-linear-to-br from-slate-200 to-slate-300" />
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 premium-gradient opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:rotate-12">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  Park<span className="text-primary">BD</span>
                </span>
              </Link>
              <p className="text-slate-400 leading-relaxed font-medium">
                Pioneering smart parking solutions for a sustainable and faster Bangladesh.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {["Features", "How It Works", "Coverage", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors font-medium">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-400 font-medium">
                  <Mail className="h-5 w-5 text-primary" />
                  info@parkbd.com
                </li>
                <li className="flex items-center gap-3 text-slate-400 font-medium">
                  <Phone className="h-5 w-5 text-primary" />
                  +880 1XXX XXXXXX
                </li>
                <li className="flex items-center gap-3 text-slate-400 font-medium">
                  <MapPin className="h-5 w-5 text-primary" />
                  Dhaka, Bangladesh
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-slate-400 mb-6 font-medium">Subscribe for updates and news.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-slate-800 border-none rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <Button className="rounded-xl px-4">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-12">
            <p className="text-slate-400 text-sm font-medium">© 2026 ParkBD. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Cookies Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}