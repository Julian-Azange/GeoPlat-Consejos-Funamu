"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] text-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-48 h-20 md:w-64 md:h-24"
            >
              <Image 
                src="/assets/funamu-logo-white.png" 
                alt="FUNAMU Loading"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            
            <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-1/2 h-full bg-emerald-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
