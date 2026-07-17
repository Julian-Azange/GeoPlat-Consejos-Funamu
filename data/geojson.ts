export const mockGeoJSON: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "amazonia",
        name: "Región Amazonía",
        color: "#10b981", // Emerald 500
        projectsCount: 156,
        description: "Región forestal de alta biodiversidad"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74.0, -0.5],
            [-72.0, -0.5],
            [-70.0, -2.0],
            [-71.0, -4.0],
            [-75.0, -3.0],
            [-74.0, -0.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "andina",
        name: "Región Andina",
        color: "#6366f1", // Indigo 500
        projectsCount: 340,
        description: "Zona central montañosa"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-76.0, 6.0],
            [-73.0, 7.0],
            [-74.0, 4.0],
            [-76.0, 2.0],
            [-77.5, 4.0],
            [-76.0, 6.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "pacifica",
        name: "Región Pacífica",
        color: "#06b6d4", // Cyan 500
        projectsCount: 120,
        description: "Litoral pacífico de alta pluviosidad"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-77.5, 6.0],
            [-76.0, 6.0],
            [-77.5, 4.0],
            [-78.5, 2.0],
            [-79.0, 4.0],
            [-77.5, 6.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "caribe",
        name: "Región Caribe",
        color: "#f59e0b", // Amber 500
        projectsCount: 210,
        description: "Litoral costero norte"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-76.0, 11.0],
            [-72.0, 12.5],
            [-73.0, 9.0],
            [-76.0, 8.0],
            [-77.0, 9.5],
            [-76.0, 11.0]
          ]
        ]
      }
    }
  ]
};
