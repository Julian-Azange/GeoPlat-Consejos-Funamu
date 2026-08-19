"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import Leaflet components (ssr: false) to prevent next.js build errors
const DynamicMapLayerInner = dynamic(() => import("./MapLayerInner"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full min-h-[500px] rounded-3xl" />,
});

const DynamicMapSwipeInner = dynamic(() => import("./MapSwipeInner"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full min-h-[500px] rounded-3xl" />,
});

/* ==========================================================================
   1. MapLayerViewer
   ========================================================================== */
interface MapLayer {
  id: string | number;
  name: string;
  geojsonUrl?: string;
  color?: string;
  visible?: boolean;
  type?: string; // "polygon" | "line" | "point"
}

interface MapLayerViewerProps {
  center: [number, number];
  zoom: number;
  layers: MapLayer[];
  basemap?: "satellite" | "voyager";
}

export function MapLayerViewer({ center, zoom, layers, basemap }: MapLayerViewerProps) {
  // Layer visibility state (all enabled since control panel is removed)
  const [activeLayers] = useState<Record<string | number, boolean>>(() => {
    const initial: Record<string | number, boolean> = {};
    layers.forEach((l) => {
      initial[l.id] = l.visible !== false;
    });
    return initial;
  });

  return (
    <div className="w-full my-8 h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-border shadow-md bg-muted/20 relative z-0">
      <DynamicMapLayerInner center={center} zoom={zoom} layers={layers} activeLayers={activeLayers} basemap={basemap} />
    </div>
  );
}

/* ==========================================================================
   2. MapSwipeViewer
   ========================================================================== */
interface SwipeLayer {
  name: string;
  geojsonUrl: string;
  color?: string;
  style?: {
    color: string;
    weight?: number;
  };
}

interface MapSwipeViewerProps {
  center: [number, number];
  zoom: number;
  leftLayer: SwipeLayer;
  rightLayer: SwipeLayer;
}

export function MapSwipeViewer({ center, zoom, leftLayer, rightLayer }: MapSwipeViewerProps) {
  return (
    <div className="w-full my-8">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-1">
          Comparador Geográfico
        </span>
        <h4 className="text-xl font-bold text-foreground">Comparativa de Cobertura y Presión</h4>
        <p className="text-xs text-muted-foreground">
          Arrastra el deslizador central para comparar las zonas de conservación (izquierda) y los frentes de impacto (degradación/minería, derecha).
        </p>
      </div>

      {/* Single Swipe Map Container */}
      <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-sm relative z-0">
        <DynamicMapSwipeInner
          center={center}
          zoom={zoom}
          leftLayer={leftLayer}
          rightLayer={rightLayer}
        />
      </div>
    </div>
  );
}
