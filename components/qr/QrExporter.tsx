"use client";

import React, { useState } from "react";
import QRCode from "qrcode";
import JSZip from "jszip";
import { Download, QrCode, FileArchive, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { regionsMock } from "@/data/regions";

export function QrExporter() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadZip = async () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      const zip = new JSZip();
      const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

      // 1. Generate QR for Homepage
      const homeUrl = `${origin}/`;
      const homeQrBase64 = await QRCode.toDataURL(homeUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: "#0f341b", // Custom deep green color for matching brand
          light: "#ffffff",
        },
      });
      // Extract raw base64 data
      const homeBase64Data = homeQrBase64.replace(/^data:image\/png;base64,/, "");
      zip.file("00_Pagina_Principal.png", homeBase64Data, { base64: true });

      // 2. Generate QRs for each council in regionsMock
      for (let i = 0; i < regionsMock.length; i++) {
        const region = regionsMock[i];
        const url = `${origin}/regiones/${region.slug}`;
        const qrBase64 = await QRCode.toDataURL(url, {
          width: 600,
          margin: 2,
          radius: 15,
          color: {
            dark: "#0f341b",
            light: "#ffffff",
          },
        });
        const base64Data = qrBase64.replace(/^data:image\/png;base64,/, "");
        
        // Sequential filename like "01_mayor-de-villa-conto-dinamico.png"
        const prefix = String(i + 1).padStart(2, "0");
        const filename = `${prefix}_${region.slug}.png`;
        zip.file(filename, base64Data, { base64: true });
      }

      // 3. Generate ZIP blob
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // 4. Download file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = "Codigos_QR_Consejos_Funamu.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error("Error generating QR Codes ZIP:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full mt-16 bg-gradient-to-br from-[#0f341b] via-[#154625] to-[#1b552e] text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-emerald-500/20">
      {/* Decorative vector background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-emerald-300 blur-3xl animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-emerald-200 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center lg:text-left space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <QrCode className="h-3.5 w-3.5" /> Generador de Códigos QR
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Descarga el Paquete de Códigos QR
          </h3>
          <p className="text-emerald-100/80 text-sm leading-relaxed max-w-xl font-normal">
            Obtén un archivo ZIP comprimido con los códigos QR de la página de inicio y de los 20 consejos comunitarios. 
            Perfecto para impresión y colocación en cartillas físicas o carteleras territoriales.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Button
            onClick={handleDownloadZip}
            disabled={isGenerating}
            size="lg"
            className={`rounded-full h-14 px-8 text-md font-bold transition-all duration-300 shadow-xl gap-2.5 ${
              downloadSuccess
                ? "bg-emerald-400 hover:bg-emerald-400 text-[#0f341b]"
                : "bg-white hover:bg-emerald-50 text-[#0f341b]"
            }`}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-[#0f341b] border-t-transparent rounded-full" />
                Generando ZIP...
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-800" />
                ¡ZIP Descargado!
              </>
            ) : (
              <>
                <FileArchive className="h-5 w-5 text-[#0f341b]" />
                Descargar ZIP de QRs
                <Download className="h-4 w-4 text-[#0f341b] transition-transform duration-300 group-hover:translate-y-0.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
