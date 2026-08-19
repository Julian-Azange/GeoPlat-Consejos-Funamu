"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Folder, QrCode, ExternalLink, Info } from "lucide-react";
import * as Icons from "lucide-react";

// Helper to resolve dynamic icons
const DynamicIcon = ({ name, className = "h-5 w-5" }: { name: string; className?: string }) => {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
};

/* ==========================================================================
   1. MediaBentoGrid
   ========================================================================== */
interface BentoImage {
  url: string;
  caption?: string;
  alt?: string;
  spanClass?: string; // e.g. "md:col-span-2 md:row-span-2"
}

interface MediaBentoGridProps {
  title?: string;
  images: BentoImage[];
}

export function MediaBentoGrid({ title, images }: MediaBentoGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full my-12">
      {title && (
        <h3 className="text-2xl md:text-3xl font-black mb-6 text-foreground tracking-tight text-center md:text-left">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {images.map((img, index) => {
          const span = img.spanClass || "md:col-span-1 md:row-span-1";
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(img.url)}
              className={`relative overflow-hidden rounded-3xl border border-border bg-muted cursor-pointer group shadow-sm hover:shadow-md transition-shadow ${span}`}
            >
              <Image
                src={img.url}
                alt={img.alt || img.caption || "Bento image"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />
              {img.caption && (
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.caption}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Zoomed view"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   2. MediaImageCompareSlider
   ========================================================================== */
interface CompareImage {
  url: string;
  label?: string;
}

interface MediaImageCompareSliderProps {
  imageLeft: CompareImage;
  imageRight: CompareImage;
  aspectRatio?: string; // e.g. "16/9"
}

export function MediaImageCompareSlider({
  imageLeft,
  imageRight,
  aspectRatio = "16/9",
}: MediaImageCompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Convert "16/9" into tailwind style percentage or dynamic style
  const arStyle = aspectRatio === "16/9" ? "aspect-video" : "aspect-auto h-[400px]";

  return (
    <div className="w-full my-8">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className={`relative w-full overflow-hidden rounded-3xl border border-border shadow-md select-none cursor-ew-resize ${arStyle}`}
      >
        {/* Right Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={imageRight.url}
            alt={imageRight.label || "Right Side"}
            fill
            className="object-cover"
            draggable={false}
          />
          {imageRight.label && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl">
              {imageRight.label}
            </div>
          )}
        </div>

        {/* Left Image (Clip Overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <Image
            src={imageLeft.url}
            alt={imageLeft.label || "Left Side"}
            fill
            className="object-cover"
            draggable={false}
          />
          {imageLeft.label && (
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl">
              {imageLeft.label}
            </div>
          )}
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200 flex items-center justify-center text-xs font-black select-none">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. MediaHotspotViewer
   ========================================================================== */
interface Hotspot {
  id: string | number;
  x: number; // Percent from left (0-100)
  y: number; // Percent from top (0-100)
  title: string;
  description: string;
  icon?: string;
}

interface MediaHotspotViewerProps {
  bgImageUrl: string;
  hotspots: Hotspot[];
}

export function MediaHotspotViewer({ bgImageUrl, hotspots }: MediaHotspotViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="w-full my-8">
      <div className="relative w-full aspect-video rounded-3xl border border-border overflow-hidden shadow-md">
        <Image
          src={bgImageUrl}
          alt="Territorio Hotspots"
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* Hotspots layer */}
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            className="absolute z-10"
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <button
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
              className="relative w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg border border-white hover:scale-110 transition-transform active:scale-95 group focus:outline-none"
            >
              {/* Pulse animation ring */}
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
              {spot.icon ? (
                <DynamicIcon name={spot.icon} className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}

        {/* Hover card / Detail overlay */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-background/95 dark:bg-card/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-border z-20"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 p-2 rounded-full border border-emerald-500/20 text-emerald-500">
                    {activeHotspot.icon ? (
                      <DynamicIcon name={activeHotspot.icon} className="h-5 w-5" />
                    ) : (
                      <Info className="h-5 w-5" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{activeHotspot.title}</h4>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeHotspot.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. MediaFolderQRCard
   ========================================================================== */
interface GalleryFile {
  url: string;
  description: string;
}

interface MediaFolderQRCardProps {
  folderName: string;
  qrCodeUrl: string;
  externalLink: string;
  fileCount: number;
  files: GalleryFile[];
}

export function MediaFolderQRCard({
  folderName,
  qrCodeUrl,
  externalLink,
  fileCount,
  files,
}: MediaFolderQRCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full my-8">
      <div className="bg-card dark:bg-muted/10 border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Icon / Folder representation */}
          <div className="bg-primary/10 dark:bg-primary/20 p-5 rounded-full border border-primary/20 text-primary flex items-center justify-center shrink-0">
            <Folder className="h-10 w-10 animate-pulse" />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest block mb-1">
              Recursos Complementarios
            </span>
            <h4 className="text-xl font-bold text-foreground mb-2">{folderName}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Contiene galerías de fotos y videos tomados durante el levantamiento predial en campo ({fileCount} archivos).
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                Abrir Galería ({fileCount})
              </button>
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border hover:bg-accent text-foreground font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                Ver Carpeta Drive <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center border border-border rounded-2xl p-4 bg-background dark:bg-card shrink-0 shadow-sm max-w-[160px]">
            <div className="relative w-24 h-24 mb-2">
              <Image
                src={qrCodeUrl}
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <QrCode className="h-3.5 w-3.5" /> Escanear QR
            </span>
          </div>
        </div>
      </div>

      {/* Drawer / Gallery Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-background dark:bg-card border border-border w-full max-w-4xl max-h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl text-foreground">{folderName}</h3>
                  <p className="text-xs text-muted-foreground">Explora las fotografías adjuntas a esta sección</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="p-6 overflow-y-auto grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(file.url)}
                    className="relative group rounded-2xl overflow-hidden border border-border bg-muted cursor-pointer aspect-video shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={file.url}
                      alt={file.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-xs leading-normal">{file.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-accent/30 text-center">
                <span className="text-xs text-muted-foreground">Mostrando {files.length} de {fileCount} fotos</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Gallery images */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   5. MediaInfiniteScrollGallery
   ========================================================================== */
interface MediaInfiniteScrollGalleryProps {
  title?: string;
  subtitle?: string;
  images: string[];
}

export function MediaInfiniteScrollGallery({
  title,
  subtitle = "MEDIOS DE VIDA",
  images,
}: MediaInfiniteScrollGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full bg-background py-12 overflow-hidden relative">
      {title && (
        <h2 className="text-3xl md:text-5xl font-black text-center text-primary mb-10 tracking-tight">
          {title}
        </h2>
      )}

      <div
        className="w-full relative flex items-center"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 80, repeat: Infinity }}
          style={{ width: "fit-content" }}
        >
          {/* Duplicate array for seamless looping */}
          {[...images, ...images].map((url, i) => (
            <div
              key={i}
              className="relative h-[250px] md:h-[350px] w-[280px] md:w-[400px] shrink-0 bg-muted cursor-pointer hover:opacity-80 transition-opacity rounded-2xl overflow-hidden border border-border"
              onClick={() => setSelectedImage(url)}
            >
              <Image
                src={url}
                alt={`Gallery image ${i}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {subtitle && (
        <div className="text-center mt-6">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.25em]">
            {subtitle}
          </span>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Zoomed view"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
