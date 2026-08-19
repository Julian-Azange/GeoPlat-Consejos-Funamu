"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Tooltip, ZoomControl, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type GeoJSONData = Parameters<typeof L.geoJSON>[0];

interface SwipeLayer {
  name: string;
  geojsonUrl: string;
  color?: string;
  style?: {
    color: string;
    weight?: number;
  };
}

interface MapSwipeInnerProps {
  center: [number, number];
  zoom: number;
  leftLayer: SwipeLayer;
  rightLayer: SwipeLayer;
}

// Category color mapping for Cobertura y Uso de la Tierra
const COBERTURA_COLORS: Record<string, string> = {
  "Bosque denso": "#047857",
  "Bosque de galería y ripario": "#10b981",
  "Bosque fragmentado": "#34d399",
  "Zonas Pantanosas": "#0d9488",
  "Rios": "#2563eb",
  "Tejido urbano continuo": "#dc2626",
  "Tejido urbano discontinuo": "#f87171",
  "Tierras desnudas y degradadas": "#b45309",
  "Zona de extracción minera": "#4b5563",
};

function getCoberturaColor(cobertura: string): string {
  const name = cobertura?.trim();
  return COBERTURA_COLORS[name] || "#6b7280"; // Default gray if not found
}

// Helper to create custom panes in Leaflet
function CustomPanesInitializer() {
  const map = useMap();
  useEffect(() => {
    if (!map.getPane("left-pane")) {
      const leftPane = map.createPane("left-pane");
      leftPane.style.zIndex = "350";
    }
    if (!map.getPane("right-pane")) {
      const rightPane = map.createPane("right-pane");
      rightPane.style.zIndex = "450";
    }
  }, [map]);
  return null;
}

// Helper component that clips layers based on slider position
function SwipeClipper({ sliderPos }: { sliderPos: number }) {
  const map = useMap();

  useEffect(() => {
    const updateClip = () => {
      try {
        const leftPane = map.getPane("left-pane");
        const rightPane = map.getPane("right-pane");
        if (!leftPane || !rightPane) return;

        // 1. Get map width in pixels
        const size = map.getSize();
        if (!size || size.x === 0) return;
        
        const sliderX = (sliderPos / 100) * size.x;

        // 2. Convert screen pixels to internal Leaflet layer coordinates
        const layerPoint = map.containerPointToLayerPoint([sliderX, 0]);

        // 3. Apply infinite vertical clip paths
        leftPane.style.clipPath = `polygon(-99999px -99999px, ${layerPoint.x}px -99999px, ${layerPoint.x}px 99999px, -99999px 99999px)`;
        leftPane.style.setProperty("-webkit-clip-path", `polygon(-99999px -99999px, ${layerPoint.x}px -99999px, ${layerPoint.x}px 99999px, -99999px 99999px)`);

        rightPane.style.clipPath = `polygon(${layerPoint.x}px -99999px, 99999px -99999px, 99999px 99999px, ${layerPoint.x}px 99999px)`;
        rightPane.style.setProperty("-webkit-clip-path", `polygon(${layerPoint.x}px -99999px, 99999px -99999px, 99999px 99999px, ${layerPoint.x}px 99999px)`);
      } catch (err) {
        console.debug("Map swipe clipping not ready:", err);
      }
    };

    // Run on mount, resize, zoom, move, etc.
    updateClip();
    map.on("move zoom viewreset resize", updateClip);
    
    const timer = setTimeout(updateClip, 100);

    return () => {
      clearTimeout(timer);
      map.off("move zoom viewreset resize", updateClip);
    };
  }, [map, sliderPos]);

  return null;
}

export default function MapSwipeInner({ center, zoom, leftLayer, rightLayer }: MapSwipeInnerProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftGeojson, setLeftGeojson] = useState<GeoJSONData | null>(null);
  const [rightGeojson, setRightGeojson] = useState<GeoJSONData | null>(null);

  // Fix Leaflet icons
  useEffect(() => {
    // @ts-expect-error - overriding default icon fetching logic in leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  // Fetch Left Layer GeoJSON (Croquis boundary)
  useEffect(() => {
    if (leftLayer.geojsonUrl) {
      fetch(leftLayer.geojsonUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error loading left layer: ${res.status}`);
          return res.json();
        })
        .then((data) => setLeftGeojson(data))
        .catch((err) => console.error("Error loading swipe left layer:", err));
    }
  }, [leftLayer.geojsonUrl]);

  // Fetch Right Layer GeoJSON (Coberturas)
  useEffect(() => {
    if (rightLayer.geojsonUrl) {
      fetch(rightLayer.geojsonUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error loading right layer: ${res.status}`);
          return res.json();
        })
        .then((data) => setRightGeojson(data))
        .catch((err) => console.error("Error loading swipe right layer:", err));
    }
  }, [rightLayer.geojsonUrl]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const onMouseMove = (moveEvent: MouseEvent) => handleMove(moveEvent.clientX);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleTouchStart = () => {
    const onTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length > 0) {
        handleMove(moveEvent.touches[0].clientX);
      }
    };
    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none rounded-3xl border border-border">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <CustomPanesInitializer />
        <SwipeClipper sliderPos={sliderPos} />

        {/* --- LEFT PANE (Satellite Base Map with Left Croquis outline) --- */}
        <TileLayer
          pane="left-pane"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {leftGeojson && (
          <GeoJSON
            key="left-croquis"
            pane="left-pane"
            data={leftGeojson as import("geojson").GeoJsonObject}
            style={() => ({
              color: leftLayer.color || leftLayer.style?.color || "#a36116ff",
              weight: 3.5,
              opacity: 0.95,
              fillColor: leftLayer.color || leftLayer.style?.color || "#a34a16ff",
              fillOpacity: 0.65,
            })}
          >
            <Tooltip sticky>
              <div className="p-1">
                <span className="font-bold text-xs block text-slate-800">{leftLayer.name}</span>
                <span className="text-[10px] text-slate-500">C.C. Mayor de Villa Conto</span>
              </div>
            </Tooltip>
          </GeoJSON>
        )}

        {/* --- RIGHT PANE (Satellite Base Map with Right Land Cover layers) --- */}
        <TileLayer
          pane="right-pane"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {rightGeojson && (
          <GeoJSON
            key="right-coberturas"
            pane="right-pane"
            data={rightGeojson as import("geojson").GeoJsonObject}
            style={(feature) => {
              const cobertura = feature?.properties?.Cobertura || "";
              const color = getCoberturaColor(cobertura);
              return {
                color: color,
                weight: 1.2,
                opacity: 0.85,
                fillColor: color,
                fillOpacity: 0.6, // 0.3 fill opacity as requested
              };
            }}
            onEachFeature={(feature, layer) => {
              const props = feature?.properties;
              const areaVal = props?.Área || props?.Area;
              const formattedArea = areaVal ? Number(areaVal).toLocaleString(undefined, { maximumFractionDigits: 1 }) : "";
              const tooltipContent = `
                <div class="p-1">
                  <span class="font-bold text-xs block text-slate-800">${props?.Cobertura || "Cobertura"}</span>
                  ${formattedArea ? `<span class="text-[10px] text-slate-500 block mt-0.5">Área: ${formattedArea} m²</span>` : ""}
                  <span class="text-[9px] text-slate-400 block mt-0.5">Código: ${props?.Código || props?.Codigo || ""}</span>
                </div>
              `;
              layer.bindTooltip(tooltipContent, { sticky: true });
            }}
          />
        )}

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* --- Floating Drag Slider Handle --- */}
      <div
        className="absolute top-0 bottom-0 z-[1000] w-[4px] bg-white cursor-ew-resize flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-10 h-10 bg-white dark:bg-card rounded-full shadow-lg border border-border flex items-center justify-center cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
          <span className="text-foreground text-xs font-black select-none">◀▶</span>
        </div>
      </div>

      {/* --- Labels Overlay --- */}
      <div className="absolute top-4 left-4 z-[999] pointer-events-none bg-background/85 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-border/60 text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm uppercase tracking-wide">
        {leftLayer.name}
      </div>
      <div className="absolute top-4 right-4 z-[999] pointer-events-none bg-background/85 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-border/60 text-xs font-bold text-red-600 dark:text-red-400 shadow-sm uppercase tracking-wide">
        {rightLayer.name}
      </div>

      {/* --- Land Cover Legend Overlay (Bottom Left) --- */}
      <div className="absolute bottom-6 left-6 z-[999] bg-background/90 backdrop-blur-md p-4 rounded-2xl border border-border/80 shadow-2xl max-w-[280px] hidden sm:block">
        <h5 className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-2.5">
          Leyenda de Cobertura
        </h5>
        <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
          {Object.entries(COBERTURA_COLORS).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0 border border-black/10"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] font-medium text-foreground/80 truncate leading-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
