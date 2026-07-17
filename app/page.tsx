"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Globe, Map as MapIcon, Database } from "lucide-react";
import Image from "next/image";
import { regionsMock } from "@/data/regions";
import { globalKPIs } from "@/data/mockData";
import { RegionCard } from "@/components/regions/RegionCard";
import { InteractiveMap } from "@/components/maps/InteractiveMap";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFakeLoading } from "@/hooks/useFakeLoading";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const isLoading = useFakeLoading(1500);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/hero-principal.jpg"
            alt="Paisaje de montaña"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6 flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-md">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Plataforma de Información Territorial</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Conectando <span className="text-primary">Territorios</span> e Información
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Sistema integral de visualización de datos, seguimiento de proyectos y análisis espacial para las regiones del país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/regiones" className={cn(buttonVariants({ size: "lg" }), "rounded-full gap-2 h-12 px-8 text-md")}>
                Explorar Consejos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex flex-1 justify-end items-center"
          >
            <div className="relative w-80 h-80 lg:w-[480px] lg:h-[480px] drop-shadow-2xl">
              <Image 
                src="/assets/funamu-logo-white.png" 
                alt="Logo FUNAMU" 
                fill 
                className="object-contain opacity-90 hover:opacity-100 transition-opacity" 
              />
            </div>
          </motion.div>
        </div>
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Descubrir</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Fundación FUNAMU Section */}
      <section className="py-16 bg-primary/5 dark:bg-primary/10 border-y border-primary/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                Apoyo Institucional
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Fundación FUNAMU</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Trabajamos con esperanza por la Cultura y los Derechos Humanos de las Comunidades Negras y Afrodescendientes. Promovemos la dignidad, el liderazgo y la transformación en los territorios.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.fundacionfunamu.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg", variant: "default" }), "rounded-full shadow-lg shadow-primary/20 gap-2 h-14 px-8 text-md")}
              >
                Conoce más sobre FUNAMU <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Regions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Consejos Comunitarios Destacados</h2>
              <p className="text-muted-foreground">
                Descubre información detallada de cada territorio y comunidad.
              </p>
            </div>
            <Link href="/regiones" className={cn(buttonVariants({ variant: "link" }), "hidden sm:flex text-primary hover:text-primary/80")}>
              Ver todos los consejos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading 
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-[320px] w-full rounded-xl" />
                ))
              : regionsMock.slice(0, 4).map((region) => (
                  <RegionCard key={region.id} region={region} />
                ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/regiones" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              Ver todos los consejos
            </Link>
          </div>
        </div>
      </section>

      {/* Global KPIs */}
      <section className="py-12 bg-muted/30 border-y">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))
              : globalKPIs.map((kpi, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
              >
                <Card className="bg-card border-none shadow-sm h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{kpi.label}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold tracking-tight">{kpi.value}</h3>
                      {kpi.percentage > 0 && (
                        <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                          +{kpi.percentage}%
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GIS Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
                <MapIcon className="h-8 w-8 text-primary" />
                Visor Geográfico Nacional
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Explora la distribución espacial de los proyectos y los consejos comunitarios a través de nuestro visor interactivo de mapas.
              </p>
            </div>
            <Button variant="outline">Ver pantalla completa</Button>
          </div>
          <InteractiveMap />
        </div>
      </section>


    </PageTransition>
  );
}
