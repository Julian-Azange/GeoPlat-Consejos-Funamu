"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { mockGeoJSON } from "@/data/geojson";
import { useRouter } from "next/navigation";

export default function MapComponent() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-muted/20 animate-pulse flex items-center justify-center border rounded-xl overflow-hidden">
        <span className="text-muted-foreground">Cargando mapa interactivo...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border shadow-sm relative z-0">
      <MapContainer 
        center={[4.5709, -74.2973]} 
        zoom={5} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        {/* Modern dark/light basemap options - using CartoDB for clean aesthetics */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <ZoomControl position="bottomright" />

        <GeoJSON
          data={mockGeoJSON}
          style={(feature) => ({
            color: feature?.properties?.color || "#3388ff",
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.2,
          })}
          onEachFeature={(feature, layer) => {
            layer.on({
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.5,
                  weight: 3
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.2,
                  weight: 2
                });
              },
              click: () => {
                if (feature.properties?.id) {
                  router.push(`/regiones/${feature.properties.id}`);
                }
              }
            });
          }}
        >
          {mockGeoJSON.features.map((feature: { properties: { name: string, projectsCount: number, id?: string } }, idx: number) => (
            <Tooltip key={idx} sticky>
              <div className="p-1">
                <p className="font-semibold text-sm">{feature.properties.name}</p>
                <p className="text-xs text-muted-foreground">{feature.properties.projectsCount} proyectos</p>
              </div>
            </Tooltip>
          ))}
        </GeoJSON>
      </MapContainer>
    </div>
  );
}
