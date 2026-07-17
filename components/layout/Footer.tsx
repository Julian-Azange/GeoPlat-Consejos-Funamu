import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-0 bg-[#09090b] text-zinc-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Col 1: Logo & Info */}
          <div className="space-y-6">
            <div className="relative h-20 w-48">
              <Image 
                src="/assets/funamu-logo-white.png" 
                alt="Fundación FUNAMU" 
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Trabajamos con esperanza por la Cultura y los Derechos Humanos de las Comunidades Negras y Afrodescendientes. Promovemos la dignidad y el liderazgo territorial.
            </p>
          </div>

          {/* Col 2: Plataforma Links */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Plataforma</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link></li>
              <li><Link href="/regiones" className="hover:text-emerald-400 transition-colors">Explorar Consejos</Link></li>
              <li><Link href="/datos" className="hover:text-emerald-400 transition-colors">Datos Abiertos</Link></li>
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contacto</h3>
            <ul className="space-y-5 text-sm text-zinc-400">
              <li className="flex items-start gap-4">
                <div className="bg-zinc-800/50 p-2 rounded-lg shrink-0">
                  <MapPin className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <span className="block font-bold text-zinc-200 mb-0.5">Nuestra Sede</span>
                  Florencia - Caquetá,<br/>Calle 3B # 14 - 18 B/ Versalles.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-zinc-800/50 p-2 rounded-lg shrink-0">
                  <Mail className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <span className="block font-bold text-zinc-200 mb-0.5">Nuestro Correo</span>
                  fundacionfunamu@gmail.com
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-zinc-800/50 p-2 rounded-lg shrink-0">
                  <Phone className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <span className="block font-bold text-zinc-200 mb-0.5">Llámanos</span>
                  (+57) 313 833 4513
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-zinc-800/50 p-2 rounded-lg shrink-0">
                  <MessageCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <span className="block font-bold text-zinc-200 mb-0.5">Charla con Nosotros</span>
                  (+57) 320 845 6306
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Fundación FUNAMU. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/terminos" className="hover:text-zinc-300 transition-colors">Términos de uso</Link>
            <Link href="/privacidad" className="hover:text-zinc-300 transition-colors">Política de privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
