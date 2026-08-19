"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type GeoJSONData = Parameters<typeof L.geoJSON>[0];

interface ConsejosMenoresInnerProps {
  generalGeojsonUrl: string;
  minorGeojsonUrl: string;
  selectedName: string;
  basemap?: "satellite" | "voyager";
}

// Controller component to center and animate the map to the selected minor council polygon
function MapFlyController({
  selectedName,
  minorData,
}: {
  selectedName: string;
  minorData: GeoJSONData | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedName || !minorData) return;

    // Find the feature in the FeatureCollection
    const featureCollection = minorData as unknown as import("geojson").FeatureCollection;
    if (!featureCollection?.features) return;

    const feature = featureCollection.features.find(
      (f) => f.properties?.Nombre?.toUpperCase() === selectedName.toUpperCase()
    );

    if (feature) {
      try {
        const tempLayer = L.geoJSON(feature);
        const bounds = tempLayer.getBounds();
        if (bounds.isValid()) {
          map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
        }
      } catch (err) {
        console.error("Error panning map to minor council bounds:", err);
      }
    }
  }, [map, selectedName, minorData]);

  return null;
}

export default function ConsejosMenoresInner({
  generalGeojsonUrl,
  minorGeojsonUrl,
  selectedName,
  basemap = "voyager",
}: ConsejosMenoresInnerProps) {
  const [generalData, setGeneralData] = useState<GeoJSONData | null>(null);
  const [minorData, setMinorData] = useState<GeoJSONData | null>(null);

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

  // Load general boundary GeoJSON
  useEffect(() => {
    if (generalGeojsonUrl) {
      fetch(generalGeojsonUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error loading general boundary: ${res.status}`);
          return res.json();
        })
        .then((data) => setGeneralData(data))
        .catch((err) => console.error("Error loading general council boundary:", err));
    }
  }, [generalGeojsonUrl]);

  // Load minor councils GeoJSON
  useEffect(() => {
    if (minorGeojsonUrl) {
      fetch(minorGeojsonUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error loading minor boundaries: ${res.status}`);
          return res.json();
        })
        .then((data) => setMinorData(data))
        .catch((err) => console.error("Error loading minor council boundaries:", err));
    }
  }, [minorGeojsonUrl]);

  return (
    <MapContainer
      center={[5.63, -76.8]}
      zoom={12}
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
      <MapFlyController selectedName={selectedName} minorData={minorData} />

      {/* 1. General Outline Shape (Villa Conto General Boundary) - hollow border */}
      {generalData && (
        <GeoJSON
          key="general-boundary"
          data={generalData as import("geojson").GeoJsonObject}
          style={() => ({
            color: "#d33939ff",
            weight: 3.5,
            opacity: 0.9,
            dashArray: "8, 8",
            fillOpacity: 0,
          })}
        />
      )}

      {/* 2. Minor Councils Polygons with 0.3 transparency */}
      {minorData && (
        <GeoJSON
          key={`minor-councils-${selectedName}`}
          data={minorData as import("geojson").GeoJsonObject}
          style={(feature) => {
            const isSelected = feature?.properties?.Nombre?.toUpperCase() === selectedName.toUpperCase();
            return {
              color: isSelected ? "#10b981" : "#ffffff", // Emerald border for active, white border for inactive
              weight: isSelected ? 3.5 : 1.5,
              opacity: 0.95,
              fillColor: isSelected ? "#10b981" : "#16a34a", // Active emerald fill vs green fill
              fillOpacity: isSelected ? 0.45 : 0.3, // Highlight active selected layer, others stay 0.3 fill opacity
            };
          }}
        />
      )}
    </MapContainer>
  );
}
