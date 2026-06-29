"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image"; 
import { Suspense, useState } from "react";

// Données fictives de l'article (à remplacer plus tard par tes vraies données de l'API)
const productData = {
  name: "Robe de Soie 'Élise'",
  price: "450 €",
  images: [
    { src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600", alt: "Vue de face" },
    { src: "https://images.unsplash.com/photo-1568310323330-9b4b0e8b23f2?q=80&w=600", alt: "Détail du dos" },
    { src: "https://images.unsplash.com/photo-1572804013307-e4c1945a6c11?q=80&w=600", alt: "Vue d'ensemble" },
  ],
};

// 1. LE CONTENU DE TA PAGE (Toute la logique visuelle et les états)
function OptionsContent() {
  const searchParams = useSearchParams();
  const productIdFromUrl = searchParams.get("product") || "Général";

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Noir");
  
  // État pour savoir quelle image afficher en grand (0 = première image)
  const [mainImageIndex, setMainImageIndex] = useState(0);

  return (
    <div className="bg-white text-neutral-900 min-h-screen py-16 px-6 antialiased">
      {/* Structure en double colonne : Images à gauche, Options à droite */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* --- COLONNE DE GAUCHE : GALERIE D'IMAGES --- */}
        <div className="space-y-6">
          {/* Grande image principale */}
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-neutral-100">
            <Image
              src={productData.images[mainImageIndex].src}
              alt={productData.images[mainImageIndex].alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-w-lg) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* Liste des petites vignettes cliquables */}
          <div className="grid grid-cols-4 gap-4">
            {productData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImageIndex(index)}
                className={`relative aspect-[3/4] overflow-hidden border ${
                  mainImageIndex === index ? "border-neutral-900" : "border-neutral-100 hover:border-neutral-300"
                }`}
              >
                <Image 
                  src={image.src} 
                  alt={`Vignette ${index + 1}`} 
                  fill 
                  className="object-cover" 
                  sizes="10vw" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* --- COLONNE DE DROITE : DÉTAILS ET CONFIGURATION --- */}
        <div className="space-y-12">
          {/* En-tête de l'article */}
          <header className="border-b border-neutral-100 pb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-2">
              Référence : {productIdFromUrl}
            </span>
            <h1 className="text-4xl font-serif tracking-wide text-neutral-900">
              {productData.name}
            </h1>
            <p className="text-lg text-neutral-700 mt-2 font-medium">
              {productData.price}
            </p>
          </header>

          {/* Formulaire des choix de personnalisation */}
          <main className="space-y-12">
            
            {/* Choix 1 : La Couleur */}
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

            {/* Choix 2 : La Taille */}
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

            {/* Actions de validation */}
            <div className="pt-8 border-t border-neutral-100">
              <button className="w-full sm:w-auto px-8 py-4 bg-neutral-950 text-white text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all duration-300">
                Confirmer les options — {selectedColor} / {selectedSize}
              </button>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}

// 2. L'ENVELOPPE DE SÉCURITÉ (Ce qui valide ton build sur Vercel sans crash)
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