import { Project, NewsItem, DocumentItem, KPI } from "../types";

export const projectsMock: Project[] = [
  {
    id: "p1",
    title: "Restauración Bosque Protector",
    status: "En progreso",
    location: "Amazonía",
    budget: "$2.5M",
    progress: 65,
    category: "Medio Ambiente",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Vía Conectividad Sur",
    status: "Planificado",
    location: "Andina",
    budget: "$15.8M",
    progress: 10,
    category: "Infraestructura",
    imageUrl: "https://images.unsplash.com/photo-1545620980-d63653139360?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Puerto Multipropósito",
    status: "Completado",
    location: "Pacífica",
    budget: "$42.1M",
    progress: 100,
    category: "Infraestructura",
    imageUrl: "https://images.unsplash.com/photo-1582211594533-268e4e69d7bb?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "Parque Solar Fotovoltaico",
    status: "En progreso",
    location: "Caribe",
    budget: "$18.3M",
    progress: 45,
    category: "Energía",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-12009cb9f3ea?q=80&w=2070&auto=format&fit=crop",
  }
];

export const newsMock: NewsItem[] = [
  {
    id: "n1",
    title: "Avanza el plan de conectividad nacional",
    date: "12 Oct 2026",
    excerpt: "Nuevas vías rurales permitirán acortar los tiempos de transporte de productos agrícolas en un 40%.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "n2",
    title: "Cumbre Regional de Biodiversidad",
    date: "05 Oct 2026",
    excerpt: "Líderes de las 20 regiones acordaron nuevas políticas para la protección de cuencas hidrográficas.",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "n3",
    title: "Inversión histórica en educación",
    date: "28 Sep 2026",
    excerpt: "Más de 500 escuelas rurales serán dotadas con internet satelital de alta velocidad.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
  }
];

export const documentsMock: DocumentItem[] = [
  {
    id: "d1",
    title: "Plan de Desarrollo Regional 2025-2030",
    type: "pdf",
    size: "4.2 MB",
    date: "10 Ene 2026"
  },
  {
    id: "d2",
    title: "Presupuesto de Inversión Q3",
    type: "excel",
    size: "1.8 MB",
    date: "01 Jul 2026"
  },
  {
    id: "d3",
    title: "Informe de Avance de Obras",
    type: "word",
    size: "2.4 MB",
    date: "15 Sep 2026"
  }
];

export const globalKPIs: KPI[] = [
  { label: "Consejos Activos", value: "20", trend: "neutral", percentage: 0 },
  { label: "Municipios Impactados", value: "158", trend: "up", percentage: 12 },
  { label: "Proyectos en Ejecución", value: "870", trend: "up", percentage: 8.5 },
  { label: "Inversión Total (USD)", value: "$1.2B", trend: "up", percentage: 15.3 }
];
