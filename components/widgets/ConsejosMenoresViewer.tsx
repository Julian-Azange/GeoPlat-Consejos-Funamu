"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Scale, Minimize2 } from "lucide-react";

const DynamicConsejosMenoresInner = dynamic(() => import("./ConsejosMenoresInner"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full min-h-[500px] lg:min-h-[650px] rounded-3xl" />,
});

interface CouncilDetail {
  name: string;
  area: string;
  perimeter: string;
  description: string;
  imageUrl: string;
}

interface ConsejosMenoresViewerProps {
  title?: string;
  generalGeojsonUrl: string;
  minorGeojsonUrl: string;
  councils: CouncilDetail[];
  basemap?: "satellite" | "voyager";
}

export function ConsejosMenoresViewer({
  title,
  generalGeojsonUrl,
  minorGeojsonUrl,
  councils = [],
  basemap,
}: ConsejosMenoresViewerProps) {
  const [selectedName, setSelectedName] = useState<string>(councils[0]?.name || "");

  // IntersectionObserver to sync map zoom/pan with the scroll position of cards
  useEffect(() => {
    if (councils.length === 0) return;

    const observerOptions = {
      root: null, // relative to viewport
      rootMargin: "-35% 0px -35% 0px", // focus target is the middle 30% of the screen
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute("data-index");
          if (indexAttr !== null) {
            const idx = parseInt(indexAttr, 10);
            if (councils[idx]) {
              setSelectedName(councils[idx].name);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const steps = document.querySelectorAll(".scrolly-step");
    steps.forEach((step) => observer.observe(step));

    return () => {
      steps.forEach((step) => observer.unobserve(step));
      observer.disconnect();
    };
  }, [councils]);

  return (
    <div className="w-full my-12 flex flex-col gap-8">
      {title && (
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h3 className="text-2xl md:text-3xl font-black text-[#0f341b] tracking-tight uppercase leading-tight">
            {title}
          </h3>
          <div className="flex justify-center gap-1.5 mt-3">
            <span className="h-1 w-12 rounded-full bg-[#16a34a]" />
            <span className="h-1 w-4 rounded-full bg-[#16a34a]/40" />
            <span className="h-1 w-2 rounded-full bg-[#16a34a]/20" />
          </div>
        </div>
      )}

      {/* Sidecar container: Left list, Right map */}
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* Scrollable Column (Left) */}
        <div className="w-full lg:w-[42%] flex flex-col gap-[22vh] pb-[45vh] z-10">
          {councils.map((c, idx) => {
            const isSelected = c.name.toUpperCase() === selectedName.toUpperCase();
            return (
              <div
                key={c.name}
                data-index={idx}
                className="scrolly-step min-h-[50vh] flex items-center transition-all duration-500 ease-in-out"
                style={{
                  opacity: isSelected ? 1 : 0.35,
                  transform: isSelected ? "scale(1.02)" : "scale(0.98)",
                }}
              >
                {/* Single Large Focused Card */}
                <div
                  className={`w-full bg-card border rounded-[2rem] p-6 md:p-8 shadow-xl transition-all duration-300 ${
                    isSelected
                      ? "border-emerald-500/40 shadow-emerald-500/5 ring-1 ring-emerald-500/10"
                      : "border-border/60"
                  }`}
                >
                  {/* Large top image */}
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 border border-border bg-muted">
                    <Image
                      src={c.imageUrl || "/assets/hero/villa-conto.jpg"}
                      alt={c.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Header */}
                  <h4 className="text-xl font-bold tracking-wide uppercase text-foreground mb-4">
                    {c.name}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
                    {c.description}
                  </p>

                  {/* Badges / Metrics */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border/60">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                      <Scale className="h-3.5 w-3.5 shrink-0" />
                      <span>Área: {c.area}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]">
                      <Minimize2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Perímetro: {c.perimeter}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Map Column (Right) */}
        <div className="w-full lg:w-[58%] h-[400px] sm:h-[500px] lg:h-[650px] sticky top-28 rounded-3xl overflow-hidden border border-border shadow-2xl bg-muted/20 z-0">
          <DynamicConsejosMenoresInner
            generalGeojsonUrl={generalGeojsonUrl}
            minorGeojsonUrl={minorGeojsonUrl}
            selectedName={selectedName}
            basemap={basemap}
          />
        </div>

      </div>
    </div>
  );
}
