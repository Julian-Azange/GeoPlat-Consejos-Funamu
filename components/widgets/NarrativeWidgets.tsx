"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Landmark, MessageSquare } from "lucide-react";
import * as Icons from "lucide-react";

// Helper to resolve dynamic icons
const DynamicIcon = ({ name, className = "h-5 w-5" }: { name: string; className?: string }) => {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
};

/* ==========================================================================
   1. HeroPortada
   ========================================================================== */
interface HeroPortadaProps {
  title: string;
  subtitle: string;
  convenioText: string;
  bgImageUrl: string;
  logos?: string[];
}

export function HeroPortada({ title, subtitle, convenioText, bgImageUrl, logos = [] }: HeroPortadaProps) {
  return (
    <section className="relative h-[85vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="w-full h-full relative"
        >
          <Image
            src={bgImageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Dark overlays to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background/95" />
        <div className="absolute inset-0 bg-[#0f341b]/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto flex flex-col items-center mt-12">
        {/* Back Link */}
        <Link
          href="/regiones"
          className="text-white/80 hover:text-white mb-8 flex items-center gap-2 transition-all bg-white/5 hover:bg-white/10 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 hover:border-white/20 hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-semibold text-xs tracking-wider uppercase">Volver a Consejos</span>
        </Link>

        {/* Institution Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex mb-6 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        >
          <span className="text-[10px] md:text-xs font-bold text-emerald-300 tracking-[0.2em] uppercase text-center">
            {convenioText}
          </span>
        </motion.div>

        {/* Title & Subtitle */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl lg:text-[6.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 mb-6 tracking-tighter drop-shadow-2xl leading-[0.95]"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4 text-white/80 mt-2"
        >
          <span className="h-[1px] w-12 md:w-16 bg-gradient-to-r from-transparent to-emerald-500/50"></span>
          <p className="text-lg md:text-2xl font-serif italic tracking-widest text-emerald-100 drop-shadow-lg">
            {subtitle}
          </p>
          <span className="h-[1px] w-12 md:w-16 bg-gradient-to-l from-transparent to-emerald-500/50"></span>
        </motion.div>

        {/* Logos container */}
        {logos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mt-12 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md"
          >
            {logos.map((logo, idx) => (
              <div key={idx} className="relative w-20 h-10 md:w-28 md:h-12 opacity-85 hover:opacity-100 transition-opacity">
                <Image
                  src={logo}
                  alt={`Logo partner ${idx}`}
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-emerald-400">Descubre</span>
        <div className="w-[20px] h-[34px] border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-2 bg-emerald-400 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   2. NarrativeTimelineSteps
   ========================================================================== */
interface Step {
  stepNumber: number | string;
  title: string;
  description: string;
  imageUrl?: string;
  icon?: string;
}

interface NarrativeTimelineStepsProps {
  steps: Step[];
}

export function NarrativeTimelineSteps({ steps }: NarrativeTimelineStepsProps) {
  return (
    <div className="w-full my-12 max-w-4xl mx-auto px-4">
      <div className="relative border-l-2 border-primary/20 pl-8 ml-4 space-y-12">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="relative"
          >
            {/* Number Indicator Node */}
            <div className="absolute -left-[50px] top-1.5 bg-primary text-primary-foreground font-black text-xs w-9 h-9 flex items-center justify-center rounded-full border-4 border-background shadow-md">
              {step.stepNumber}
            </div>

            {/* Content card */}
            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                {step.icon && (
                  <div className="bg-primary/10 text-primary p-2 rounded-xl">
                    <DynamicIcon name={step.icon} className="h-5 w-5" />
                  </div>
                )}
                <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>

              {step.imageUrl && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted border border-border">
                  <Image
                    src={step.imageUrl}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   3. NarrativeOralHeritageQuote
   ========================================================================== */
interface NarrativeOralHeritageQuoteProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatarUrl?: string;
  highlightColor?: string; // e.g. "emerald" | "amber" | "blue"
}

export function NarrativeOralHeritageQuote({
  quote,
  authorName,
  authorRole,
  authorAvatarUrl,
  highlightColor = "emerald",
}: NarrativeOralHeritageQuoteProps) {
  
  const colorMap = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  const selectedColor = colorMap[highlightColor as keyof typeof colorMap] || colorMap.emerald;

  return (
    <div className="w-full my-12 max-w-4xl mx-auto px-4">
      <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
        
        {/* Giant quotation mark decoration */}
        <span className="absolute -top-10 -left-6 text-[15rem] font-serif text-muted/15 select-none pointer-events-none">
          “
        </span>

        {/* Message bubble helper */}
        <div className="relative z-10">
          <blockquote className="text-xl md:text-3xl font-serif text-foreground/90 leading-relaxed italic mb-8 relative">
            &quot;{quote}&quot;
          </blockquote>

          {/* Author Details */}
          <div className="flex items-center gap-4 border-t border-border/60 pt-6">
            {authorAvatarUrl ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border shrink-0 bg-muted">
                <Image
                  src={authorAvatarUrl}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 border border-border">
                <MessageSquare className="h-5 w-5" />
              </div>
            )}
            <div>
              <span className="font-bold text-sm block text-foreground">{authorName}</span>
              <span className="text-xs text-muted-foreground block">{authorRole}</span>
            </div>
            
            {/* Tag/Badge for Identity */}
            <div className={`ml-auto hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${selectedColor}`}>
              <Landmark className="h-3.5 w-3.5" /> Sabiduría Ancestral
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. NarrativeIntroQuote
   ========================================================================== */
interface NarrativeIntroQuoteProps {
  eyebrow: string;
  quote: string;
}

export function NarrativeIntroQuote({ eyebrow, quote }: NarrativeIntroQuoteProps) {
  return (
    <div className="w-full my-8 max-w-4xl mx-auto text-center px-4">
      <div className="flex justify-center items-center gap-6 text-muted-foreground mb-10">
        <span className="h-[1px] w-16 md:w-32 bg-primary/30"></span>
        <span className="uppercase tracking-[0.2em] text-xs md:text-sm font-bold text-primary text-center">
          {eyebrow}
        </span>
        <span className="h-[1px] w-16 md:w-32 bg-primary/30"></span>
      </div>
      <p className="text-xl md:text-3xl font-serif text-foreground/90 leading-relaxed italic mb-8">
        &quot;{quote}&quot;
      </p>
    </div>
  );
}

/* ==========================================================================
   5. NarrativeParagraph
   ========================================================================== */
interface NarrativeParagraphProps {
  text: string;
}

export function NarrativeParagraph({ text }: NarrativeParagraphProps) {
  return (
    <div className="w-full my-6 max-w-4xl mx-auto text-center px-4">
      <p className="text-base md:text-lg text-muted-foreground leading-loose max-w-3xl mx-auto">
        {text}
      </p>
    </div>
  );
}

/* ==========================================================================
   6. TitleH1, TitleH2, TitleH3 (Hierarchy Title Components)
   ========================================================================== */
interface TitleH1Props {
  text: string;
  mt?: string; // Margin Top e.g. "mt-8"
  mb?: string; // Margin Bottom e.g. "mb-4"
  align?: "left" | "center" | "right";
  showLine?: boolean;
}

export function TitleH1({ text, mt = "mt-8", mb = "mb-4", align = "center", showLine = true }: TitleH1Props) {
  const alignClass = align === "left" ? "text-left justify-start items-start" : align === "right" ? "text-right justify-end items-end" : "text-center justify-center items-center";
  return (
    <div className={`w-full max-w-4xl mx-auto px-4 ${mt} ${mb} flex flex-col ${alignClass}`}>
      <h1 className="text-2xl md:text-3xl font-black text-[#0f341b] tracking-tight uppercase leading-tight">
        {text}
      </h1>
      {showLine && (
        <div className={`flex gap-1.5 mt-3 ${alignClass}`}>
          <span className="h-1 w-12 rounded-full bg-[#16a34a]" />
          <span className="h-1 w-4 rounded-full bg-[#16a34a]/40" />
          <span className="h-1 w-2 rounded-full bg-[#16a34a]/20" />
        </div>
      )}
    </div>
  );
}

interface TitleH2Props {
  text: string;
  mt?: string;
  mb?: string;
  align?: "left" | "center" | "right";
}

export function TitleH2({ text, mt = "mt-6", mb = "mb-3", align = "center" }: TitleH2Props) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <div className={`w-full max-w-4xl mx-auto px-4 ${mt} ${mb} ${alignClass}`}>
      <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-wide uppercase leading-snug">
        {text}
      </h2>
    </div>
  );
}

interface TitleH3Props {
  text: string;
  mt?: string;
  mb?: string;
  align?: "left" | "center" | "right";
}

export function TitleH3({ text, mt = "mt-4", mb = "mb-2", align = "center" }: TitleH3Props) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <div className={`w-full max-w-4xl mx-auto px-4 ${mt} ${mb} ${alignClass}`}>
      <h3 className="text-xs md:text-sm font-bold text-[#16a34a] tracking-[0.2em] uppercase">
        {text}
      </h3>
    </div>
  );
}
