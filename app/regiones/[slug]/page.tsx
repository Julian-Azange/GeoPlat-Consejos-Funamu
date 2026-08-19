"use client";

import { use, useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { regionsMock } from "@/data/regions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, MapPin, Droplet, GraduationCap, 
  Activity, Home, Church, Leaf, Users, ShieldAlert,
  TreePine, FileText, Mountain, Map as MapIcon, X,
  Landmark, Trees, PieChart as PieChartIcon,
  CheckCircle2, AlertTriangle, ClipboardList, Building2,
  Waves, Pickaxe, Droplets, Building
} from "lucide-react";
import { InteractiveMap } from "@/components/maps/InteractiveMap";
import { motion, AnimatePresence } from "framer-motion";
import { PieChartWidget, BarChartWidget, HorizontalBarChartWidget } from "@/components/charts/Charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useFakeLoading } from "@/hooks/useFakeLoading";
import { Skeleton } from "@/components/ui/skeleton";

import * as Widgets from "@/components/widgets";
import villaContoDinamicoConfig from "@/data/mayor-de-villa-conto-dinamico.json";

export default function RegionStoryMapPage({ params }: { params: Promise<{ slug: string }> }) {
  const isLoading = useFakeLoading(1200);
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const carouselImages = [1, 2, 3, 4, 5, 6];
  const region = regionsMock.find(r => r.slug === slug);

  if (!region) {
    notFound();
  }

  if (slug === "mayor-de-villa-conto-dinamico") {
    return (
      <PageTransition>
        <div className="bg-background min-h-screen text-foreground pb-20">
          {villaContoDinamicoConfig.sections.map((section) => {
            const { component, props } = section;
            let content;
            switch (component) {
              case "HeroPortada":
                content = <Widgets.HeroPortada {...(props as unknown as React.ComponentProps<typeof Widgets.HeroPortada>)} />;
                break;
              case "TitleH1":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.TitleH1 {...(props as unknown as React.ComponentProps<typeof Widgets.TitleH1>)} />
                  </div>
                );
                break;
              case "ConsejosMenoresViewer":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.ConsejosMenoresViewer {...(props as unknown as React.ComponentProps<typeof Widgets.ConsejosMenoresViewer>)} />
                  </div>
                );
                break;
              case "TitleH2":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.TitleH2 {...(props as unknown as React.ComponentProps<typeof Widgets.TitleH2>)} />
                  </div>
                );
                break;
              case "TitleH3":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.TitleH3 {...(props as unknown as React.ComponentProps<typeof Widgets.TitleH3>)} />
                  </div>
                );
                break;
              case "NarrativeIntroQuote":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.NarrativeIntroQuote {...(props as unknown as React.ComponentProps<typeof Widgets.NarrativeIntroQuote>)} />
                  </div>
                );
                break;
              case "NarrativeParagraph":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.NarrativeParagraph {...(props as unknown as React.ComponentProps<typeof Widgets.NarrativeParagraph>)} />
                  </div>
                );
                break;
              case "NarrativeOralHeritageQuote":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.NarrativeOralHeritageQuote {...(props as unknown as React.ComponentProps<typeof Widgets.NarrativeOralHeritageQuote>)} />
                  </div>
                );
                break;
              case "MediaBentoGrid":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.MediaBentoGrid {...(props as unknown as React.ComponentProps<typeof Widgets.MediaBentoGrid>)} />
                  </div>
                );
                break;
              case "MediaInfiniteScrollGallery":
                content = <Widgets.MediaInfiniteScrollGallery {...(props as unknown as React.ComponentProps<typeof Widgets.MediaInfiniteScrollGallery>)} />;
                break;
              case "MediaImageCompareSlider":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.MediaImageCompareSlider {...(props as unknown as React.ComponentProps<typeof Widgets.MediaImageCompareSlider>)} />
                  </div>
                );
                break;
              case "MediaHotspotViewer":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.MediaHotspotViewer {...(props as unknown as React.ComponentProps<typeof Widgets.MediaHotspotViewer>)} />
                  </div>
                );
                break;
              case "MediaFolderQRCard":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.MediaFolderQRCard {...(props as unknown as React.ComponentProps<typeof Widgets.MediaFolderQRCard>)} />
                  </div>
                );
                break;
              case "MapLayerViewer":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.MapLayerViewer {...(props as unknown as React.ComponentProps<typeof Widgets.MapLayerViewer>)} />
                  </div>
                );
                break;
              case "MapSwipeViewer":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.MapSwipeViewer {...(props as unknown as React.ComponentProps<typeof Widgets.MapSwipeViewer>)} />
                  </div>
                );
                break;
              case "NarrativeTimelineSteps":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.NarrativeTimelineSteps {...(props as unknown as React.ComponentProps<typeof Widgets.NarrativeTimelineSteps>)} />
                  </div>
                );
                break;
              case "DataStatsGrid":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.DataStatsGrid {...(props as unknown as React.ComponentProps<typeof Widgets.DataStatsGrid>)} />
                  </div>
                );
                break;
              case "DataChartContainer":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.DataChartContainer {...(props as unknown as React.ComponentProps<typeof Widgets.DataChartContainer>)} />
                  </div>
                );
                break;
              case "DataEquipmentGrid":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.DataEquipmentGrid {...(props as unknown as React.ComponentProps<typeof Widgets.DataEquipmentGrid>)} />
                  </div>
                );
                break;
              case "SpeciesFlipGrid":
                content = (
                  <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
                    <Widgets.SpeciesFlipGrid {...(props as unknown as React.ComponentProps<typeof Widgets.SpeciesFlipGrid>)} />
                  </div>
                );
                break;
              default:
                content = (
                  <div className="p-4 bg-red-100 text-red-800">
                    Componente {component} no soportado.
                  </div>
                );
            }

            if (component === "HeroPortada") {
              return <div key={section.id} id={section.id}>{content}</div>;
            }

            
            return (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="py-12 md:py-16 animate-section"
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </PageTransition>
    );
  }

  // Real Data Extracted from ArcGIS StoryMap
  const waterTreatmentData = [
    { name: "Hervir", value: 16 },
    { name: "Filtrar", value: 4 },
    { name: "Ninguno", value: 80 },
  ];

  const sexDemographicData = [
    { name: "Hombre", value: 20 },
    { name: "Mujer", value: 4 },
    { name: "Otro", value: 1 },
  ];

  const landCoverData = [
    { name: "Bosque Denso", value: 24675 },
    { name: "Extracción Minera", value: 1523 },
    { name: "Tierras degradadas", value: 813 },
    { name: "Ríos", value: 400 },
    { name: "Bosque fragmentado", value: 38 },
  ];

  const consejosMenores = [
    { name: "VILLA CONTO", area: "240.124 m²" },
    { name: "LOMA PUEBLO NUEVO", area: "54.807 m²" },
    { name: "CHIGUARANDÓ ALTO", area: "23.868 m²" },
    { name: "CHIVIGUIDÓ", area: "15.206 m²" },
    { name: "BOCA DE PARTADÓ", area: "7.208 m²" }
  ];

  const equipamientos = [
    { name: "Acueducto", icon: Droplet, desc: "Sistema que abastece de agua potable a la comunidad.", image: "/assets/equipamientos/acueducto.jpg" },
    { name: "Institución Educativa Doña Mercedes", icon: GraduationCap, desc: "Espacio dedicado a la formación académica de niños, niñas y jóvenes.", image: "/assets/equipamientos/institucion-educativa.jpg" },
    { name: "Cancha", icon: Activity, desc: "Espacio deportivo para la recreación y el deporte de la comunidad.", image: "/assets/equipamientos/cancha.jpg" },
    { name: "Parque", icon: TreePine, desc: "Lugar de encuentro y esparcimiento para la comunidad.", image: "/assets/equipamientos/parque.jpg" },
    { name: "Parque Principal", icon: TreePine, desc: "Centro de reunión comunitaria y actividades sociales.", image: "/assets/equipamientos/parque-principal-1.jpg" },
    { name: "Caseta Comunal", icon: Home, desc: "Infraestructura utilizada para reuniones, eventos y actividades comunitarias.", image: "/assets/equipamientos/caseta-comunal.jpg" },
    { name: "Iglesia", icon: Church, desc: "Espacio espiritual y de fe para la comunidad.", image: "/assets/equipamientos/iglesia.jpg" },
    { name: "Parque Principal", icon: TreePine, desc: "Centro de reunión comunitaria y actividades sociales.", image: "/assets/equipamientos/parque-principal-2.jpg" },
  ];

  return (
    <PageTransition>
      {/* Immersive Hero */}
      {/* Immersive Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="w-full h-full relative"
          >
            <Image
              src={region.imageUrl}
              alt={region.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Enhanced atmospheric gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background/95" />
          <div className="absolute inset-0 bg-[#0f341b]/20 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col items-center mt-12">
          <Link href="/regiones" className="text-white/80 hover:text-white mb-10 flex items-center gap-2 transition-all bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:border-white/20 hover:-translate-y-0.5">
            <ArrowLeft className="h-5 w-5" /> <span className="font-medium tracking-wide">Volver a Consejos Comunitarios</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex mb-6 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <h2 className="text-xs md:text-sm font-bold text-emerald-300 tracking-[0.25em] uppercase">
                Fundación Afrocolombianos Unidos por la Cultura y los Derechos Humanos
              </h2>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center mb-8 w-full">
                <Skeleton className="h-20 md:h-32 lg:h-40 w-3/4 max-w-4xl bg-white/20 rounded-2xl" />
              </div>
            ) : (
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 mb-8 tracking-tighter drop-shadow-2xl leading-[0.9]">
                {region.name}
              </h1>
            )}
            
            <div className="flex items-center gap-6 text-white/80 mt-2">
              <span className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-emerald-500/60"></span>
              <p className="text-2xl md:text-3xl font-serif italic tracking-widest text-emerald-100 drop-shadow-lg">
                Legados que inspiran
              </p>
              <span className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-emerald-500/60"></span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400/70">Descubre</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-[26px] h-[42px] border-2 border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
               <div className="w-1.5 h-2.5 bg-emerald-400 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Narrative Intro: El Corazón del Territorio */}
      <section className="pt-24 md:pt-32 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
          <div className="flex justify-center items-center gap-6 text-muted-foreground mb-12">
            <span className="h-[1px] w-16 md:w-32 bg-primary/30"></span>
            <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary text-center">El Corazón del Territorio</span>
            <span className="h-[1px] w-16 md:w-32 bg-primary/30"></span>
          </div>
          <p className="text-2xl md:text-4xl font-serif text-foreground/90 leading-relaxed text-center italic mb-16">
            &quot;El territorio colectivo del Consejo Comunitario Mayor de Villa Conto, ubicado en el municipio de Río Quito (Chocó), se encuentra conformado por varias comunidades a lo largo de la cuenca del río Quito y sus afluentes.&quot;
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-loose text-center max-w-4xl mx-auto mb-16">
            Estas comunidades mantienen una estrecha relación con los ecosistemas forestales y fluviales del territorio, conservando prácticas tradicionales de ocupación, producción y aprovechamiento sostenible de los recursos naturales.
          </p>
        </div>

        {/* Full-width Image Gallery (MEDIOS DE VIDA) */}
        <div className="w-full bg-background pb-12 overflow-hidden relative">
          
          <h2 className="text-3xl md:text-5xl font-black text-center text-primary mb-10">
            El Corazón del Territorio
          </h2>

          <div 
            className="w-full relative flex items-center" 
            style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <motion.div
              className="flex gap-1"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 80, repeat: Infinity }}
              style={{ width: "fit-content" }}
            >
              {/* Duplicate array for seamless looping */}
              {[...carouselImages, ...carouselImages].map((num, i) => (
                <div 
                  key={i} 
                  className="relative h-[250px] md:h-[350px] w-[280px] md:w-[400px] shrink-0 bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImage(`/assets/medios-de-vida/medio-vida-${num}.jpg`)}
                >
                  <Image 
                    src={`/assets/medios-de-vida/medio-vida-${num}.jpg`}
                    alt={`Medio de vida ${num}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="text-center mt-6">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">MEDIOS DE VIDA</span>
          </div>
        </div>
      </section>

      {/* Scrollytelling Sidecar 1: Ubicación y Consejos Menores */}
      <section className="relative bg-muted/20 border-y">
        <div className="flex flex-col lg:flex-row relative">
          
          {/* Fixed Media (Map) */}
          <div className="lg:w-1/2 relative lg:sticky top-24 h-[50vh] lg:h-[calc(100vh-6rem)] z-10 p-6 lg:pl-12 lg:pr-8 flex flex-col justify-center">
             <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-border/50 bg-muted/30">
               <InteractiveMap />
             </div>
          </div>

          {/* Scrolling Narrative Cards */}
          <div className="lg:w-1/2 px-6 pb-20 pt-4 lg:py-32 lg:px-16 xl:px-24 flex flex-col justify-center">
            <div className="space-y-24 w-full max-w-2xl mx-auto">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-2xl border border-border/50 hover:border-primary/40 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-6 text-foreground text-center uppercase tracking-widest text-primary">Ubicación y Datos Generales</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Choco Card */}
                  <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-[#bbf7d0] p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-[#22c55e]/20 p-3 rounded-full z-10">
                       <Landmark className="h-7 w-7 text-[#166534]" />
                    </div>
                    <div className="z-10">
                      <div className="text-xs font-bold text-[#166534] uppercase tracking-wider mb-1 opacity-70">Departamento</div>
                      <div className="text-xl font-black text-[#14532d]">Chocó</div>
                    </div>
                    {/* Decorative shape */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#86efac] rounded-full opacity-40" />
                  </div>

                  {/* Rio Quito Card */}
                  <div className="bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] border border-[#bfdbfe] p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-[#3b82f6]/20 p-3 rounded-full z-10">
                       <MapPin className="h-7 w-7 text-[#1e40af]" />
                    </div>
                    <div className="z-10">
                      <div className="text-xs font-bold text-[#1e40af] uppercase tracking-wider mb-1 opacity-70">Municipio</div>
                      <div className="text-xl font-black text-[#1e3a8a]">Río Quito</div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#93c5fd] rounded-full opacity-40" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Area Card */}
                  <div className="bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border border-[#fde68a] p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-[#f59e0b]/20 p-3 rounded-full z-10">
                       <Trees className="h-7 w-7 text-[#b45309]" />
                    </div>
                    <div className="z-10">
                      <div className="text-xs font-bold text-[#b45309] uppercase tracking-wider mb-1 opacity-70">Hectáreas (Área)</div>
                      <div className="text-2xl font-black text-[#92400e]">27.521</div>
                    </div>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#fcd34d] rounded-full opacity-40" />
                  </div>

                  {/* Families Card */}
                  <div className="bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] border border-[#fecaca] p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-[#ef4444]/20 p-3 rounded-full z-10">
                       <Users className="h-7 w-7 text-[#b91c1c]" />
                    </div>
                    <div className="z-10">
                      <div className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider mb-1 opacity-70">Familias</div>
                      <div className="text-2xl font-black text-[#991b1b]">1.080</div>
                    </div>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#fca5a5] rounded-full opacity-40" />
                  </div>
                </div>

                {/* Wide Bottom Card */}
                <div className="bg-gradient-to-r from-[#14532d] to-[#166534] p-6 pb-8 rounded-2xl flex flex-col md:flex-row items-center justify-between text-white shadow-xl relative overflow-hidden">
                   <div className="flex items-center gap-4 z-10 mb-4 md:mb-0">
                     <div className="bg-white/10 p-3 rounded-full">
                        <PieChartIcon className="h-8 w-8 text-[#bbf7d0]" />
                     </div>
                     <div>
                       <div className="font-bold tracking-widest uppercase text-white text-sm mb-1">Área Total del Territorio</div>
                       <div className="text-xs text-[#86efac] font-medium uppercase">C.C. Mayor de Villa Conto</div>
                     </div>
                   </div>
                   <div className="z-10 flex items-baseline gap-2 bg-black/20 px-4 py-2 rounded-xl border border-white/10">
                     <span className="text-3xl font-black text-white">27.521</span>
                     <span className="text-lg font-bold text-[#bbf7d0]">Ha</span>
                   </div>
                   
                   {/* Decorative colorful bottom borders mimicking screenshot */}
                   <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                     <div className="w-1/4 h-full bg-[#65a30d]"></div>
                     <div className="w-1/4 h-full bg-[#0284c7]"></div>
                     <div className="w-1/4 h-full bg-[#eab308]"></div>
                     <div className="w-1/4 h-full bg-[#ea580c]"></div>
                   </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card/90 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-border/50 hover:border-primary/40 transition-colors"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-primary shadow-inner">
                  <MapIcon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-foreground">Consejos Menores</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  El territorio colectivo está subdividido en unidades organizativas menores que garantizan la gobernanza y protección de cuencas específicas.
                </p>
                <div className="space-y-3">
                  {consejosMenores.map((cm, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-background rounded-xl border border-border/50">
                      <span className="font-semibold text-foreground">{cm.name}</span>
                      <span className="text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">{cm.area}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Full Width: Equipamientos Infographic Style */}
      <section className="py-24 md:py-32 bg-[#f4f6ec] border-y border-[#dcfce7]">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f341b] tracking-tighter uppercase mb-4">
              Equipamientos de Consejo Menor de Villa Conto
            </h2>
            <div className="flex justify-center gap-2 mb-6">
               <span className="h-1.5 w-16 bg-[#166534]"></span>
               <span className="h-1.5 w-16 bg-[#86efac]"></span>
               <span className="h-1.5 w-16 bg-[#fcd34d]"></span>
            </div>
            <p className="text-lg md:text-xl text-[#166534] font-bold uppercase tracking-widest">
              Información Consejo Comunitario Mayor de Villa Conto
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {equipamientos.map((eq, i) => (
              <Card key={i} className="border-0 shadow-xl overflow-hidden group bg-white rounded-2xl flex flex-col h-full hover:shadow-2xl transition-shadow">
                {/* Top Image Area */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={eq.image} alt={eq.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 bg-[#0f341b] text-white font-black text-xl w-8 h-8 flex items-center justify-center rounded-md shadow-md z-10">
                    {i + 1}
                  </div>
                </div>
                {/* Bottom Content */}
                <CardContent className="p-5 flex flex-col items-start bg-[#fcfdfa] grow">
                  <div className="flex items-start gap-4 w-full">
                    <div className="bg-[#dcfce7] p-3 rounded-full shrink-0 border border-[#bbf7d0]">
                      <eq.icon className="h-6 w-6 text-[#166534]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#0f341b] uppercase tracking-wide leading-tight mb-2">{eq.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{eq.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom decorative bar */}
          <div className="mt-16 bg-[#0f341b] py-4 text-center rounded-full flex items-center justify-center relative overflow-visible shadow-xl">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0f341b] rounded-full flex items-center justify-center border-4 border-[#f4f6ec] z-10">
                <Leaf className="text-[#86efac] h-5 w-5" />
             </div>
             <span className="text-[#dcfce7] font-bold tracking-[0.2em] uppercase text-sm z-20">Equipamientos del Consejo Menor de Villa Conto</span>
          </div>
        </div>
      </section>

      {/* Data Visualization Section: Diagnóstico Geográfico y Ambiental */}
      <section className="py-24 md:py-32 bg-muted/30 border-y">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Diagnóstico Geográfico y Ambiental</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Fichas de caracterización que evidencian la realidad demográfica, acceso a servicios y dinámicas ambientales de los hogares.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-sm border-border/50 rounded-3xl bg-background">
              <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-lg"><Users className="h-5 w-5 text-primary" /> Demografía por Sexo</CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-[220px]">
                <PieChartWidget data={sexDemographicData} />
              </CardContent>
            </Card>

            <Card className="shadow-sm border-border/50 rounded-3xl bg-background">
              <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-lg"><Droplet className="h-5 w-5 text-primary" /> Tratamiento de Agua</CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-[220px]">
                <HorizontalBarChartWidget data={waterTreatmentData} />
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-border/50 rounded-3xl bg-background">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4 rounded-t-3xl">
              <CardTitle className="flex items-center gap-3 text-lg"><Leaf className="h-5 w-5 text-primary" /> Análisis de Coberturas</CardTitle>
              <CardDescription>Hectáreas por tipo de uso de suelo (CORINE Land Cover)</CardDescription>
            </CardHeader>
            <CardContent className="p-6 h-[300px]">
              <BarChartWidget data={landCoverData} />
            </CardContent>
          </Card>
          
          <div className="mt-12 bg-primary/10 border border-primary/20 p-8 rounded-3xl">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <ShieldAlert className="h-12 w-12 text-primary shrink-0" />
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-3">Conclusiones del Análisis de Coberturas</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  El análisis evidencia un territorio predominantemente forestal, donde el bosque denso constituye la cobertura dominante con más de 24.675 hectáreas, reflejando un alto nivel de conservación ecológica. Sin embargo, la presencia de 1.523 hectáreas de extracción minera artesanal refleja una de las principales transformaciones del paisaje, generando presiones sobre los ecosistemas.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Resumen Fichas de Caracterización - Infographic */}
      <section className="py-24 md:py-32 bg-[#f8faf8]">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
          
          {/* Header */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-8 border-b border-[#c2d6c9] pb-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-black text-[#0f341b] tracking-tighter mb-2">
                RESUMEN DE FICHAS DE CARACTERIZACIÓN
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1b5e20] mb-4 uppercase tracking-wide">
                Consejo Comunitario Mayor de Villa Conto
              </h3>
              <p className="text-lg text-muted-foreground mb-1 font-medium">
                Información verificada de las fichas de caracterización individual y de consejo.
              </p>
              <p className="text-[#1b5e20] italic font-medium">
                Caracterización ambiental y socioeconómica para la implementación de Pagos por Servicios Ambientales (PSA)
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white border border-[#c2d6c9] rounded-2xl p-4 flex items-center gap-4 shadow-sm min-w-[260px]">
                <div className="bg-[#1b5e20] p-3 rounded-full text-white">
                  <Leaf className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Territorio Considerado</div>
                  <div className="text-lg font-black text-[#0f341b]">MUY APTO</div>
                  <div className="text-sm text-muted-foreground">para PSA</div>
                </div>
              </div>
              
              <div className="bg-white border border-[#c2d6c9] rounded-2xl p-4 flex items-center gap-4 shadow-sm min-w-[200px]">
                <div className="bg-[#1b5e20] p-3 rounded-full text-white">
                  <Trees className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Zona Rural</div>
                  <div className="text-2xl font-black text-[#0f341b]">100%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            
            {/* Col 1 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#0f341b] text-white p-3 flex items-center gap-3">
                <div className="bg-white text-[#0f341b] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">1</div>
                <h4 className="font-bold text-sm tracking-wide">INFORMACIÓN GENERAL</h4>
              </div>
              <div className="p-5 space-y-6 flex-1 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Municipio:</span>
                    <span className="text-muted-foreground">Río Quito (Chocó).</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Población del Consejo:</span>
                    <span className="text-muted-foreground block"><strong className="text-[#0f341b]">1.080</strong> familias</span>
                    <span className="text-muted-foreground block"><strong className="text-[#0f341b]">4.500</strong> habitantes</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Comunidades principales:</span>
                    <ul className="text-muted-foreground list-disc list-inside mt-1 space-y-1">
                      <li>Villa Conto</li>
                      <li>Loma de los Gamboa</li>
                      <li>Chiviquidó</li>
                      <li>Chiguarandó Alto</li>
                      <li>Boca de Apartadó</li>
                      <li>Quijaradó</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-4 border-t border-border">
                  <FileText className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Figura de tenencia:</span>
                    <span className="text-muted-foreground">Territorio colectivo titulado.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#154726] text-white p-3 flex items-center gap-3">
                <div className="bg-white text-[#154726] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">2</div>
                <h4 className="font-bold text-sm tracking-wide">ORGANIZACIÓN Y GOBERNANZA</h4>
              </div>
              <div className="p-5 space-y-6 flex-1 text-sm">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Autoridad territorial:</span>
                    <span className="text-muted-foreground">Consejo Comunitario Mayor de Villa Conto.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Instancias de gobierno:</span>
                    <ul className="text-muted-foreground list-disc list-inside mt-1 space-y-1">
                      <li>Asamblea General</li>
                      <li>Junta Directiva</li>
                      <li>Consejos menores</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardList className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Instrumento de planificación:</span>
                    <span className="text-muted-foreground">Plan de Etnodesarrollo.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Participación comunitaria:</span>
                    <span className="text-muted-foreground">Información reportada por la Junta Directiva y complementada mediante caracterizaciones familiares realizadas en campo.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#1b5e20] text-white p-3 flex items-center gap-3">
                <div className="bg-white text-[#1b5e20] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">3</div>
                <h4 className="font-bold text-xs tracking-wide">RECURSO HÍDRICO Y SERVICIOS...</h4>
              </div>
              <div className="p-5 space-y-6 flex-1 text-sm">
                <div className="flex items-start gap-3">
                  <Droplet className="h-5 w-5 text-[#3b82f6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Presencia de:</span>
                    <ul className="text-muted-foreground list-disc list-inside mt-1 space-y-1">
                      <li>Río Quito</li>
                      <li>Río Pato</li>
                      <li>Quebradas y drenajes secundarios</li>
                      <li>Áreas inundables y humedales</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Servicios ecosistémicos:</span>
                    <ul className="text-muted-foreground list-disc list-inside mt-1 space-y-1">
                      <li>Regulación hídrica</li>
                      <li>Conservación de biodiversidad</li>
                      <li>Protección de suelos</li>
                      <li>Captura y almacenamiento de carbono</li>
                      <li>Servicios culturales y tradicionales</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#2e7d32] text-white p-3 flex items-center gap-3">
                <div className="bg-white text-[#2e7d32] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">4</div>
                <h4 className="font-bold text-sm tracking-wide">DIMENSIÓN SOCIAL Y CULTURAL</h4>
              </div>
              <div className="p-5 space-y-6 flex-1 text-sm">
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <span className="text-muted-foreground font-medium">Predominio de viviendas rurales afrodescendientes.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Actividades tradicionales:</span>
                    <ul className="text-muted-foreground list-disc list-inside mt-1 space-y-1">
                      <li>Pesca artesanal</li>
                      <li>Agricultura familiar</li>
                      <li>Aprovechamiento tradicional del bosque</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Conservación de prácticas culturales asociadas al territorio colectivo y al uso tradicional de los recursos naturales.</span>
                </div>
                <div className="flex items-start gap-3 pt-4 border-t border-border">
                  <Building2 className="h-5 w-5 text-[#1b5e20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#0f341b]">Equipamientos comunitarios:</span>
                    <span className="text-muted-foreground block mt-1">Institución educativa, Acueducto, Iglesia, Caseta comunal, Parque principal, Cancha deportiva.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 5 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#388e3c] text-white p-3 flex items-center gap-3">
                <div className="bg-white text-[#388e3c] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">5</div>
                <h4 className="font-bold text-sm tracking-wide">POTENCIAL PARA PSA</h4>
              </div>
              <div className="p-5 space-y-4 flex-1 text-sm">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#22c55e] shrink-0" />
                    <span className="text-muted-foreground font-medium">Alta cobertura de bosque natural.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#22c55e] shrink-0" />
                    <span className="text-muted-foreground font-medium">Conectividad ecológica regional.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#22c55e] shrink-0" />
                    <span className="text-muted-foreground font-medium">Disponibilidad de recursos hídricos.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#22c55e] shrink-0" />
                    <span className="text-muted-foreground font-medium">Gobernanza comunitaria consolidada.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#22c55e] shrink-0" />
                    <span className="text-muted-foreground font-medium">Presencia de comunidades con ocupación histórica del territorio.</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-border bg-red-50/50 p-4 rounded-xl border border-red-100">
                  <div className="flex items-center gap-2 mb-2 text-red-700 font-bold">
                    <AlertTriangle className="h-5 w-5" /> Principales presiones:
                  </div>
                  <ul className="text-red-900/80 list-disc list-inside space-y-1 text-xs">
                    <li>Minería de aluvión.</li>
                    <li>Transformación de coberturas.</li>
                    <li>Áreas degradadas asociadas a actividades extractivas.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Col 6 */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-[#1b5e20] text-white p-3 flex items-center gap-3">
                <div className="bg-white text-[#1b5e20] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">6</div>
                <h4 className="font-bold text-xs tracking-wide">DATOS DE LAS FICHAS...</h4>
              </div>
              <div className="p-5 flex-1 text-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <ClipboardList className="h-6 w-6 text-[#1b5e20] shrink-0" />
                    <div>
                      <span className="font-bold block text-[#0f341b] mb-2">Información recopilada mediante:</span>
                      <ul className="space-y-3">
                        <li className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1b5e20] shrink-0 mt-1.5"></span>
                          <span>Ficha del Consejo Comunitario: <strong className="text-[#0f341b]">1</strong></span>
                        </li>
                        <li className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1b5e20] shrink-0 mt-1.5"></span>
                          <span>Fichas Individuales a Hogares: <strong className="text-[#0f341b]">22</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-[#e8f5e9] p-4 rounded-xl border border-[#c8e6c9] flex items-center gap-4">
                  <div className="bg-[#1b5e20] text-white p-2 rounded-lg">
                    <Trees className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1b5e20] uppercase block">Total área del territorio</span>
                    <span className="text-xl font-black text-[#0f341b]">28.019 ha</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Narrative Conclusion */}
      <section className="py-24 md:py-32 bg-[#f8faf8] border-b border-[#c2d6c9]">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
          <div className="flex justify-center items-center gap-6 text-[#1b5e20]/60 mb-12">
            <span className="h-[1px] w-16 md:w-32 bg-[#1b5e20]/30"></span>
            <span className="uppercase tracking-[0.2em] text-sm font-bold text-[#0f341b] text-center">Conclusión de la Caracterización</span>
            <span className="h-[1px] w-16 md:w-32 bg-[#1b5e20]/30"></span>
          </div>
          <p className="text-2xl md:text-4xl font-serif text-[#0f341b] leading-relaxed text-center italic mb-16">
            &quot;Las fichas de caracterización del Consejo Comunitario Mayor de Villa Conto evidencian un territorio colectivo con una fuerte identidad cultural afrodescendiente, estrechamente vinculado a los ecosistemas forestales y a la red hídrica de la cuenca del río Quito.&quot;
          </p>
          <p className="text-lg md:text-xl text-[#1b5e20]/80 leading-loose text-center max-w-4xl mx-auto mb-8">
            La información reportada por la Junta Directiva y los hogares caracterizados destaca la importancia de la conservación de los bosques, el uso tradicional del territorio y la gestión comunitaria de los recursos naturales, identificando además presiones asociadas a la deforestación y la actividad minera. En conjunto, los resultados reflejan un territorio con alto potencial para la implementación de estrategias de conservación y Pagos por Servicios Ambientales (PSA), fundamentadas en el fortalecimiento del gobierno propio, la protección ambiental y el bienestar comunitario.
          </p>
        </div>
      </section>

      {/* Áreas de Cobertura y Uso de la Tierra */}
      <section className="py-24 bg-[#f8faf8]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          <h3 className="text-center mb-12 text-3xl md:text-4xl font-black text-[#0f341b] tracking-tighter">
            Resumen de áreas de cobertura y uso de la tierra
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            
            {/* Row 1 */}
            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#16a34a] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#16a34a]/10 p-4 rounded-full flex-shrink-0">
                <Trees className="h-10 w-10 text-[#16a34a]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#16a34a] font-black text-xs uppercase tracking-wide leading-tight mb-2">BOSQUE DE GALERÍA Y RIPARIO</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#16a34a]">22</span>
                    <span className="text-sm font-bold text-[#16a34a]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#16a34a]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#16a34a]/80">6794</span>
                    <span className="text-xs font-semibold text-[#16a34a]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#15803d] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#15803d]/10 p-4 rounded-full flex-shrink-0">
                <Trees className="h-10 w-10 text-[#15803d]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#15803d] font-black text-xs uppercase tracking-wide leading-tight mb-2">BOSQUE DENSO</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#15803d]">24675</span>
                    <span className="text-sm font-bold text-[#15803d]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#15803d]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#15803d]/80">832</span>
                    <span className="text-xs font-semibold text-[#15803d]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#4d7c0f] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#4d7c0f]/10 p-4 rounded-full flex-shrink-0">
                <TreePine className="h-10 w-10 text-[#4d7c0f]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#4d7c0f] font-black text-xs uppercase tracking-wide leading-tight mb-2">BOSQUE FRAGMENTADO</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#4d7c0f]">38</span>
                    <span className="text-sm font-bold text-[#4d7c0f]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#4d7c0f]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#4d7c0f]/80">7411</span>
                    <span className="text-xs font-semibold text-[#4d7c0f]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#2563eb] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#2563eb]/10 p-4 rounded-full flex-shrink-0">
                <Waves className="h-10 w-10 text-[#2563eb]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#2563eb] font-black text-xs uppercase tracking-wide leading-tight mb-2">RIOS</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#2563eb]">400</span>
                    <span className="text-sm font-bold text-[#2563eb]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#2563eb]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#2563eb]/80">4261</span>
                    <span className="text-xs font-semibold text-[#2563eb]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#dc2626] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#dc2626]/10 p-4 rounded-full flex-shrink-0">
                <Building className="h-10 w-10 text-[#dc2626]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#dc2626] font-black text-xs uppercase tracking-wide leading-tight mb-2">TEJIDO URBANO CONTINUO</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#dc2626]">27</span>
                    <span className="text-sm font-bold text-[#dc2626]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#dc2626]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#dc2626]/80">2561</span>
                    <span className="text-xs font-semibold text-[#dc2626]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#f97316] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#f97316]/10 p-4 rounded-full flex-shrink-0">
                <Home className="h-10 w-10 text-[#f97316]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#f97316] font-black text-xs uppercase tracking-wide leading-tight mb-2">TEJIDO URBANO DISCONTINUO</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#f97316]">5</span>
                    <span className="text-sm font-bold text-[#f97316]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#f97316]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#f97316]/80">5726</span>
                    <span className="text-xs font-semibold text-[#f97316]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#a16207] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#a16207]/10 p-4 rounded-full flex-shrink-0">
                <Mountain className="h-10 w-10 text-[#a16207]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#a16207] font-black text-xs uppercase tracking-wide leading-tight mb-2">TIERRAS DESNUDAS Y DEGRADADAS</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#a16207]">813</span>
                    <span className="text-sm font-bold text-[#a16207]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#a16207]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#a16207]/80">1548</span>
                    <span className="text-xs font-semibold text-[#a16207]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#9333ea] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#9333ea]/10 p-4 rounded-full flex-shrink-0">
                <Pickaxe className="h-10 w-10 text-[#9333ea]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#9333ea] font-black text-xs uppercase tracking-wide leading-tight mb-2">ZONA EXTRACCIÓN MINERA ARTESANAL</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#9333ea]">1523</span>
                    <span className="text-sm font-bold text-[#9333ea]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#9333ea]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#9333ea]/80">3003</span>
                    <span className="text-xs font-semibold text-[#9333ea]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 p-5 flex items-center gap-4 border-[#0f766e] shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0f766e]/10 p-4 rounded-full flex-shrink-0">
                <Droplets className="h-10 w-10 text-[#0f766e]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#0f766e] font-black text-xs uppercase tracking-wide leading-tight mb-2">ZONAS PANTANOSAS</h4>
                <div className="flex items-end gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#0f766e]">15</span>
                    <span className="text-sm font-bold text-[#0f766e]">Ha</span>
                  </div>
                  <div className="w-[1px] h-6 bg-[#0f766e]/30 mb-1"></div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-lg font-bold text-[#0f766e]/80">6345</span>
                    <span className="text-xs font-semibold text-[#0f766e]/80">m²</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Area Total Card */}
          <div className="bg-[#e8f5e9] rounded-xl border border-[#c2d6c9] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#0f341b] text-white p-6 md:w-1/3 flex items-center gap-4 relative overflow-hidden">
               <div className="z-10 bg-white/10 p-3 rounded-full">
                 <PieChartIcon className="h-8 w-8 text-[#86efac]" />
               </div>
               <div className="z-10">
                 <h4 className="font-bold uppercase tracking-wider text-sm leading-tight text-[#dcfce7]">Área Total</h4>
                 <div className="font-bold uppercase tracking-wider text-sm leading-tight text-white">Del Territorio</div>
               </div>
               {/* Angle decoration */}
               <div className="absolute top-0 -right-8 h-full w-16 bg-[#e8f5e9] transform skew-x-[20deg] hidden md:block"></div>
            </div>
            
            <div className="p-6 md:w-2/3 flex items-center justify-around">
               <div className="flex items-baseline gap-2">
                 <span className="text-4xl md:text-5xl font-black text-[#0f341b]">27521</span>
                 <span className="text-xl font-bold text-[#15803d]">Ha</span>
               </div>
               <div className="w-[2px] h-12 bg-[#c2d6c9]"></div>
               <div className="flex items-baseline gap-2">
                 <span className="text-4xl md:text-5xl font-black text-[#0f341b]">7823</span>
                 <span className="text-xl font-bold text-[#15803d]">m²</span>
               </div>
            </div>
          </div>

        </div>
      </section>


      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X className="h-10 w-10" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage}
                alt="Vista Ampliada"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </PageTransition>
  );
}
