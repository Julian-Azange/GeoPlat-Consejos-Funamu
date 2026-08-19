"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Info } from "lucide-react";

interface SpeciesItem {
  name: string;
  scientificName?: string;
  backDescription: string;
  imageUrl: string;
}

interface SpeciesFlipGridProps {
  category: "aves" | "mamíferos" | "peces" | "flora" | string;
  species: SpeciesItem[];
}

export function SpeciesFlipGrid({ category, species }: SpeciesFlipGridProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setFlippedIndex(flippedIndex === idx ? null : idx);
  };

  return (
    <div className="w-full my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/10 text-emerald-500 p-2.5 rounded-full border border-emerald-500/20">
          <Leaf className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">
            Biodiversidad Local
          </span>
          <h4 className="text-xl font-bold text-foreground capitalize">
            Fichas de {category}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {species.map((item, idx) => {
          const isFlipped = flippedIndex === idx;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -3 }}
              onClick={() => handleCardClick(idx)}
              className="relative w-full h-[320px] cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Card Container for 3D flip */}
              <div
                className="w-full h-full relative transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT SIDE */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-border shadow-sm flex flex-col bg-card"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Photo area */}
                  <div className="relative w-full grow bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white">
                      <Info className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Name area */}
                  <div className="p-5 border-t border-border bg-card">
                    <h5 className="font-black text-sm text-foreground uppercase tracking-wide leading-tight mb-1">
                      {item.name}
                    </h5>
                    {item.scientificName && (
                      <p className="text-xs text-muted-foreground italic font-serif">
                        {item.scientificName}
                      </p>
                    )}
                  </div>
                </div>

                {/* BACK SIDE (Rotated 180 degrees) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-border shadow-lg p-6 bg-gradient-to-br from-emerald-900 to-[#0f341b] text-white flex flex-col justify-between"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="grow flex flex-col justify-center">
                    <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center mb-4">
                      <Leaf className="h-4 w-4 text-emerald-300" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block mb-2">
                      Detalle y Uso Comunitario
                    </span>
                    <h5 className="font-black text-base uppercase tracking-wide leading-tight mb-3">
                      {item.name}
                    </h5>
                    <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                      {item.backDescription}
                    </p>
                  </div>

                  <div className="text-[10px] text-emerald-300/60 uppercase tracking-wider text-right">
                    Toca para volver
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
