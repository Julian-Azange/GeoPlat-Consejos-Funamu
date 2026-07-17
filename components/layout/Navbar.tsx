"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Map, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/regiones", label: "Consejos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-none bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-12 lg:px-24">
        {/* Left: Logo and Links */}
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Map className="h-6 w-6 text-primary shrink-0" />
            <span className="text-xl font-bold tracking-tight hidden sm:block">GeoPlat</span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: FUNAMU text */}
        <div className="flex-1 flex justify-center">
          <span className="font-bold text-xl sm:text-2xl tracking-widest text-[#0f341b] dark:text-emerald-400">FUNAMU</span>
        </div>

        {/* Right: Theme Toggle */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md px-6 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-2 text-lg font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
