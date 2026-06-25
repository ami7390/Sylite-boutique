"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// 1. LE CONTENU DE TA PAGE (Là où se trouve toute ta logique)
function OptionsContent() {
  const searchParams = useSearchParams();
  
  // Exemple de récupération d'un paramètre d'URL (ex: /options?product=robe-soie)
  const productId = searchParams.get("product") || "Général";

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Noir");

  return (
    <div className="bg-white text-neutral-900 min-h-screen py-16 px-6 antialiased">
      <div className="max-w-3xl mx-auto">
        
        {/* En-tête de la page */}
        <header className="border-b border-neutral-100 pb-8 mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-2">
            Sur-mesure & Personnalisation
          </span>
          <h1 className="text-3xl font-serif tracking-wide text-neutral-900">
            Options de configuration
          </h1>
          <p className="text-xs text-neutral-500 mt-2 font-light">
            Référence produit ciblée : <span className="font-mono bg-neutral-50 px-2 py-0.5 rounded text-neutral-700">{productId}</span>
          </p>
        </header>

        {/* Formulaire d'options */}
        <main className="space-y-12">
          
          {/* Section 1 : Choix de la couleur */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-800">1. Teinte du tissu</h3>
            <div className="flex gap-3">
              {["Noir", "Ivoire", "Taupe"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-5 py-2.5 text-xs tracking-wider transition-all duration-300 border ${
                    selectedColor === color 
                      ? "border-neutral-950 bg-neutral-950 text-white font-medium" 
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </section>

          {/* Section 2 : Choix de la taille */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-800">2. Guide des tailles</h3>
            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 text-xs transition-all duration-300 border flex items-center justify-center ${
                    selectedSize === size 
                      ? "border-neutral-950 bg-neutral-950 text-white font-medium" 
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </section>

          {/* Bouton de validation d'options */}
          <div className="pt-8 border-t border-neutral-100">
            <button className="w-full sm:w-auto px-8 py-4 bg-neutral-950 text-white text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all duration-300">
              Confirmer les options — {selectedColor} / {selectedSize}
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

// 2. L'ENVELOPPE DE SÉCURITÉ (Obligatoire pour Vercel et Next.js)
export default function Options() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-xs tracking-widest text-neutral-400 uppercase animate-pulse">
            Initialisation du studio...
          </p>
        </div>
      }
    >
      <OptionsContent />
    </Suspense>
  );
}