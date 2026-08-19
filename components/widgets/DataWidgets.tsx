"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChartWidget, BarChartWidget, HorizontalBarChartWidget } from "@/components/charts/Charts";
import * as Icons from "lucide-react";

// Helper to resolve dynamic icons
const DynamicIcon = ({ name, className = "h-5 w-5" }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
};

/* ==========================================================================
   1. DataStatsGrid
   ========================================================================== */
interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  colorTheme?: "emerald" | "blue" | "amber" | "red" | "indigo" | "rose";
}

interface DataStatsGridProps {
  stats: StatItem[];
}

export function DataStatsGrid({ stats }: DataStatsGridProps) {
  const themeMap = {
    emerald: {
      bg: "from-[#f0fdf4] to-[#dcfce7] dark:from-emerald-950/20 dark:to-emerald-900/10",
      border: "border-[#bbf7d0] dark:border-emerald-500/20",
      iconBg: "bg-emerald-500/20 text-[#166534] dark:text-emerald-400",
      textVal: "text-[#14532d] dark:text-emerald-200",
      deco: "bg-[#86efac] dark:bg-emerald-500",
    },
    blue: {
      bg: "from-[#eff6ff] to-[#dbeafe] dark:from-blue-950/20 dark:to-blue-900/10",
      border: "border-[#bfdbfe] dark:border-blue-500/20",
      iconBg: "bg-blue-500/20 text-[#1e40af] dark:text-blue-400",
      textVal: "text-[#1e3a8a] dark:text-blue-200",
      deco: "bg-[#93c5fd] dark:bg-blue-500",
    },
    amber: {
      bg: "from-[#fffbeb] to-[#fef3c7] dark:from-amber-950/20 dark:to-amber-900/10",
      border: "border-[#fde68a] dark:border-amber-500/20",
      iconBg: "bg-[#f59e0b]/20 text-[#b45309] dark:text-amber-400",
      textVal: "text-[#92400e] dark:text-amber-200",
      deco: "bg-[#fcd34d] dark:bg-amber-500",
    },
    red: {
      bg: "from-[#fef2f2] to-[#fee2e2] dark:from-red-950/20 dark:to-red-900/10",
      border: "border-[#fecaca] dark:border-red-500/20",
      iconBg: "bg-red-500/20 text-[#b91c1c] dark:text-red-400",
      textVal: "text-[#991b1b] dark:text-red-200",
      deco: "bg-[#fca5a5] dark:bg-red-500",
    },
    indigo: {
      bg: "from-[#f5f3ff] to-[#ede9fe] dark:from-indigo-950/20 dark:to-indigo-900/10",
      border: "border-[#ddd6fe] dark:border-indigo-500/20",
      iconBg: "bg-indigo-500/20 text-[#5b21b6] dark:text-indigo-400",
      textVal: "text-[#4c1d95] dark:text-indigo-200",
      deco: "bg-[#c4b5fd] dark:bg-indigo-500",
    },
    rose: {
      bg: "from-[#fff5f5] to-[#ffe3e3] dark:from-rose-950/20 dark:to-rose-900/10",
      border: "border-[#ffd2d2] dark:border-rose-500/20",
      iconBg: "bg-rose-500/20 text-[#9f1239] dark:text-rose-400",
      textVal: "text-[#881337] dark:text-rose-200",
      deco: "bg-[#fecdd3] dark:bg-rose-500",
    },
  };

  return (
    <div className="w-full my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, idx) => {
        const theme = themeMap[stat.colorTheme || "emerald"];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -3 }}
            className={`bg-gradient-to-br ${theme.bg} border ${theme.border} p-6 rounded-3xl flex items-center gap-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
          >
            {stat.icon && (
              <div className={`${theme.iconBg} p-3.5 rounded-full z-10 shrink-0 border border-white/20`}>
                <DynamicIcon name={stat.icon} className="h-6 w-6" />
              </div>
            )}
            <div className="z-10">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-3xl font-black ${theme.textVal}`}>
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs font-semibold text-muted-foreground">
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>
            {/* Background design blob */}
            <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10 dark:opacity-5 ${theme.deco}`} />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   2. DataChartContainer
   ========================================================================== */
interface ChartDataSeries extends Record<string, string | number> {
  name: string;
  value: number;
}

interface DataChartContainerProps {
  chartType: "pie" | "bar" | "horizontalBar";
  title: string;
  description?: string;
  series: ChartDataSeries[];
}

export function DataChartContainer({
  chartType,
  title,
  description,
  series,
}: DataChartContainerProps) {
  return (
    <div className="w-full my-8">
      <Card className="shadow-sm border-border/50 rounded-[2rem] overflow-hidden bg-background">
        <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
          <CardTitle className="text-lg font-bold text-foreground">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-xs">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-6 h-[260px]">
          {chartType === "pie" && <PieChartWidget data={series} />}
          {chartType === "bar" && <BarChartWidget data={series} />}
          {chartType === "horizontalBar" && <HorizontalBarChartWidget data={series} />}
        </CardContent>
      </Card>
    </div>
  );
}

/* ==========================================================================
   3. DataEquipmentGrid
   ========================================================================== */
interface EquipmentItem {
  id: string | number;
  name: string;
  category: string;
  icon?: string;
  description: string;
  imageUrl: string;
}

interface DataEquipmentGridProps {
  equipments: EquipmentItem[];
}

export function DataEquipmentGrid({ equipments }: DataEquipmentGridProps) {
  return (
    <div className="w-full my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {equipments.map((eq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -3 }}
            className="border border-border/60 bg-card rounded-3xl overflow-hidden group flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Top Image */}
            <div className="relative h-44 w-full overflow-hidden bg-muted">
              <Image
                src={eq.imageUrl}
                alt={eq.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-[#0f341b] text-white font-black text-xs w-6 h-6 flex items-center justify-center rounded-lg shadow z-10">
                {i + 1}
              </div>
            </div>

            {/* Bottom Details */}
            <div className="p-5 flex flex-col items-start grow">
              <div className="flex items-start gap-3 w-full">
                {eq.icon && (
                  <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2.5 rounded-full shrink-0 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <DynamicIcon name={eq.icon} className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">
                    {eq.category}
                  </span>
                  <h3 className="text-sm font-black text-foreground uppercase tracking-wide leading-tight mb-2">
                    {eq.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {eq.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
