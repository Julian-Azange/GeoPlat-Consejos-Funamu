"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { RegionCard } from "@/components/regions/RegionCard";
import { regionsMock } from "@/data/regions";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useFakeLoading } from "@/hooks/useFakeLoading";
import { Skeleton } from "@/components/ui/skeleton";

export default function RegionsPage() {
  const isLoading = useFakeLoading(1000);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRegions = regionsMock.filter(region => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Directorio Nacional</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Explorar Consejos</h1>
          <p className="text-lg text-muted-foreground">
            Conoce el detalle de cada territorio, sus indicadores clave y los proyectos estratégicos en ejecución.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar consejo por nombre..." 
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground w-full md:w-auto text-left md:text-right">
            Mostrando {filteredRegions.length} consejos
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[320px] w-full rounded-xl" />
            ))}
          </div>
        ) : filteredRegions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRegions.map((region) => (
              <RegionCard key={region.id} region={region} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border rounded-xl bg-muted/20 border-dashed">
            <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No se encontraron consejos</h3>
            <p className="text-muted-foreground">Intenta con otros términos de búsqueda.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
