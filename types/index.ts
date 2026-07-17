export interface Region {
  id: string;
  slug: string;
  name: string;
  description: string;
  municipalitiesCount: number;
  projectsCount: number;
  indicatorsCount: number;
  imageUrl: string;
}

export interface KPI {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  status: "Completado" | "En progreso" | "Planificado";
  location: string;
  budget: string;
  progress: number;
  category: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: "pdf" | "excel" | "word";
  size: string;
  date: string;
}
