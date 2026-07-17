"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Use next/dynamic to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-xl min-h-[400px]" />,
});

export function InteractiveMap() {
  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-xl border p-1 bg-background/50 shadow-sm backdrop-blur-sm relative">
      <MapComponent />
      
      {/* Mock GIS Control Panel overlay */}
      <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md p-4 rounded-lg shadow-lg border w-64 hidden sm:block">
        <h4 className="font-semibold text-sm mb-3">Capas GIS (Mock)</h4>
        <div className="space-y-3">
          {[
            { id: "infra", label: "Infraestructura", color: "bg-blue-500" },
            { id: "bio", label: "Biodiversidad", color: "bg-emerald-500" },
            { id: "edu", label: "Educación", color: "bg-amber-500" },
            { id: "health", label: "Salud", color: "bg-rose-500" },
          ].map((layer) => (
            <div key={layer.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                <span className="text-xs font-medium">{layer.label}</span>
              </div>
              <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-not-allowed opacity-70">
                <div className="w-3 h-3 bg-primary rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
