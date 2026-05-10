"use client";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "accent" | "info" | "warning";
  className?: string;
}

const variantStyles = {
  default: "card-default glass-card",
  primary: "card-primary bg-primary/5",
  secondary: "card-secondary bg-secondary/5",
  accent: "card-accent bg-accent/5",
  info: "card-info bg-blue-500/5",
  warning: "card-warning bg-orange-500/5",
};

const iconStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/20 text-primary",
  secondary: "bg-secondary/20 text-secondary",
  accent: "bg-accent/20 text-accent",
  info: "bg-blue-500/20 text-blue-500",
  warning: "bg-orange-500/20 text-orange-500",
};

export function StatsCard({
  title,
  value,
  icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group",
        variantStyles[variant],
        className
      )}
      suppressHydrationWarning
    >
      <div className="flex items-start justify-between" suppressHydrationWarning>
        <div className="space-y-2" suppressHydrationWarning>
          <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider opacity-80" suppressHydrationWarning>{title}</p>
          <p className="text-3xl font-black tracking-tight group-hover:scale-105 transition-transform origin-left" suppressHydrationWarning>
            {value}
          </p>
        </div>
        {icon && (
          <div className={cn(
            "p-4 rounded-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg",
            iconStyles[variant]
          )} suppressHydrationWarning>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-6 flex items-center gap-2" suppressHydrationWarning>
          <div className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black shadow-sm",
            trend.isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
          )} suppressHydrationWarning>
            {trend.isPositive ? "↑" : "↓"}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-xs text-muted-foreground font-medium italic opacity-60" suppressHydrationWarning>vs last month</span>
        </div>
      )}
    </div>
  );
}