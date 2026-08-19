"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip, ZoomControl, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapLayer {
  id: string | number;
  name: string;
  color?: string;
  geojsonUrl?: string;
  visible?: boolean;
  type?: string;
}

interface MapLayerInnerProps {
  center: [number, number];
  zoom: number;
  layers: MapLayer[];
  activeLayers: Record<string | number, boolean>;
  basemap?: "satellite" | "voyager";
}

// Helper component to auto-center map bounds to active GeoJSON features
interface MapControllerProps {
  geoJSONs: Record<string | number, Parameters<typeof L.geoJSON>[0]>;
  activeLayers: Record<string | number, boolean>;
}

function MapController({ geoJSONs, activeLayers }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    const activeData: Parameters<typeof L.geoJSON>[0][] = [];
    Object.keys(activeLayers).forEach((layerId) => {
      if (activeLayers[layerId] && geoJSONs[layerId]) {
        activeData.push(geoJSONs[layerId]);
      }
    });

    if (activeData.length > 0) {
      try {
        const group = L.featureGroup();
        activeData.forEach((data) => {
          const geoJsonLayer = L.geoJSON(data);
          group.addLayer(geoJsonLayer);
        });
        const bounds = group.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
        }
      } catch (err) {
        console.error("Error adjusting map bounds to active layers:", err);
      }
    }
  }, [map, geoJSONs, activeLayers]);

  return null;
}

// Generate organic-looking polygon coordinates around a center point (fallback)
function generateSimulatedPolygon(center: [number, number], scale: number, seed: number) {
  const [lat, lng] = center;
  const points = 8;
  const coords: [number, number][] = [];
  
  for (let i = 0; i < points; i++) {
    const angle = (i * 2 * Math.PI) / points;
    const variance = 0.85 + 0.3 * Math.sin(angle * 3 + seed);
    const offsetLat = Math.cos(angle) * scale * variance;
    const offsetLng = Math.sin(angle) * scale * variance * 1.2;
    coords.push([lat + offsetLat, lng + offsetLng]);
  }
  coords.push(coords[0]);
  return coords;
}

export default function MapLayerInner({
  center,
  zoom,
  layers,
  activeLayers,
  basemap = "voyager",
}: MapLayerInnerProps) {
  const [geoJSONData, setGeoJSONData] = useState<Record<string | number, Parameters<typeof L.geoJSON>[0]>>({});

  // Fix Leaflet icons in Next.js environment
  useEffect(() => {
    // @ts-expect-error - overriding default icon fetching logic in leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  // Fetch GeoJSON data asynchronously
  useEffect(() => {
    layers.forEach((layer) => {
      if (layer.geojsonUrl && !geoJSONData[layer.id]) {
        fetch(layer.geojsonUrl)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error loading GeoJSON: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            setGeoJSONData((prev) => {
              if (prev[layer.id]) return prev;
              return {
                ...prev,
                [layer.id]: data,
              };
            });
          })
          .catch((err) => {
            console.error(`Error loading GeoJSON for layer ${layer.name}:`, err);
          });
      }
    });
  }, [layers, geoJSONData]);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        {basemap === "satellite" ? (
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
        )}

        <ZoomControl position="bottomright" />
        <MapController geoJSONs={geoJSONData} activeLayers={activeLayers} />

        {layers.map((layer, idx) => {
          if (!activeLayers[layer.id]) return null;

          // If GeoJSON is loaded, render the real geometry
          if (geoJSONData[layer.id]) {
            return (
              <GeoJSON
                key={`geojson-${layer.id}`}
                data={geoJSONData[layer.id] as import("geojson").GeoJsonObject}
                style={() => ({
                  color: layer.color || "#16a34a",
                  weight: 3,
                  opacity: 0.95,
                  fillColor: layer.color || "#16a34a",
                  fillOpacity: 0.25,
                })}
              >
                <Tooltip sticky>
                  <div className="p-1">
                    <span className="font-bold text-xs block text-slate-800">{layer.name}</span>
                    <span className="text-[10px] text-slate-500">C.C. Mayor de Villa Conto</span>
                  </div>
                </Tooltip>
              </GeoJSON>
            );
          }

          // Fallback to simulated polygon if no geojsonUrl is provided
          const scale = 0.015 - idx * 0.003;
          const polyCoords = generateSimulatedPolygon(center, scale, idx * 10);

          return (
            <Polygon
              key={`fallback-${layer.id}`}
              positions={polyCoords}
              pathOptions={{
                color: layer.color || "#3b82f6",
                fillColor: layer.color || "#3b82f6",
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.25,
              }}
            >
              <Tooltip sticky>
                <div className="p-1">
                  <span className="font-bold text-xs block text-slate-800">{layer.name}</span>
                  <span className="text-[10px] text-slate-500">C.C. Mayor de Villa Conto (Simulado)</span>
                </div>
              </Tooltip>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}
