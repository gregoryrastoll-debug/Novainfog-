// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";  // ← Icônes burger et croix
import BookingDialog from '@/components/BookingDialog'; // ← Ajout de l'import

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logols.png"
            alt="Novainfogé - Simplifiez votre IT"
            width={240}
            height={80}
            priority
            className="h-20 md:h-14 lg:h-20 w-auto object-contain max-h-full"
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-gray-700 hover:text-gray-900 transition-colors">
            Services
          </Link>
          <Link 
  href="/apropos"
  className="text-gray-700 hover:text-gray-900 transition-colors"
  onClick={() => console.log("Clic sur À propos → redirection vers /apropos")}
>
  À propos
</Link>
          

           <BookingDialog 
              triggerText="Prendre RDV"
              triggerClassName="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            />
        </div>

        {/* Bouton burger mobile */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 shadow-lg">
          <div className="flex flex-col gap-6 text-center">
            <Link href="/services" className="text-lg text-gray-800 hover:text-blue-600 transition-colors" onClick={closeMenu}>
              Services
            </Link>
            <Link href="/about" className="text-lg text-gray-800 hover:text-blue-600 transition-colors" onClick={closeMenu}>
              À propos
            </Link>
            
            <BookingDialog 
              triggerText="Prendre RDV"
              triggerClassName="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 text-lg"
            />
           
          </div>
        </div>
      )}
    </nav>
  );
}