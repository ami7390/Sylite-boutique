"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
// Importation du catalogue dynamique partagé
import { allProducts } from '../../data/products';

// 1. Correction de l'interface pour inclure les options facultatives de votre catalogue
interface Product {
  id: number;
  name: string;
  price: number | string;
  category: string;
  tag?: string;
  badge?: string;
  image: string;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

function OptionsContent() {
  const searchParams = useSearchParams();
  const productIdFromUrl = searchParams.get("id");

  // Récupération dynamique et normalisation de l'article ciblé
  const product = useMemo(() => {
    if (!productIdFromUrl) return null;
    const found = allProducts.find(p => p.id === Number(productIdFromUrl)) as Product | undefined;
    if (!found) return null;

    const formattedPrice = typeof found.price === 'string' 
      ? found.price 
      : `${Number(found.price || 0).toLocaleString('fr-FR')} FCFA`;

    return {
      ...found,
      displayPrice: formattedPrice,
      colors: found.colors || ["Standard", "Noir", "Ivoire", "Rose Poudré"],
      sizes: found.sizes || ["XS", "S", "M", "L", "XL"]
    };
  }, [productIdFromUrl]);

  // États locaux pour les choix de l'utilisateur
  const [selectedColor, setSelectedColor] = useState<string>("Standard");
  const [selectedSize, setSelectedSize] = useState<string>("M");

  // 2. CORRECTION : Remplacement de useMemo par useEffect pour mettre à jour les choix par défaut
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Fonction utilitaire pour uniformiser le texte des catégories
  const cleanCategoryName = (cat: string): string => {
    if (!cat) return "";
    const trimmed = cat.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  // Extraction automatique des produits de la même catégorie
  const similarProducts = useMemo(() => {
    if (!product) return [];
    const currentCategory = cleanCategoryName(product.category || "");
    
    return allProducts
      .filter(p => cleanCategoryName(p.category || "") === currentCategory && p.id !== product.id)
      .map(p => ({
        ...p,
        displayPrice: typeof p.price === 'string' ? p.price : `${Number(p.price || 0).toLocaleString('fr-FR')} FCFA`
      }));
  }, [product]);

  // Redirection personnalisée vers WhatsApp
  const handleWhatsAppOrder = () => {
    if (!product) return;
    const WHATSAPP_NUMBER = "22394939380";
    
    const message = `Bonjour SYLITE, je souhaite commander l'article suivant avec ces options :
    
- *Produit :* ${product.name}
- *Prix :* ${product.displayPrice}
- *Couleur sélectionnée :* ${selectedColor}
- *Taille sélectionnée :* ${selectedSize}

L'article est-il bien disponible pour une livraison ?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-xs antialiased">
        <div className="text-center max-w-sm space-y-4 border border-neutral-100 p-8 rounded-2xl">
          <div className="text-2xl">🛍️</div>
          <h2 className="font-bold text-neutral-800 uppercase tracking-wider">Aucun modèle sélectionné</h2>
          <p className="text-neutral-500 font-light">Retournez sur le catalogue de votre boutique pour configurer vos options.</p>
          <a href="/" className="inline-block px-5 py-2.5 bg-neutral-950 text-white font-semibold rounded-xl hover:bg-purple-600 transition-colors">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-neutral-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 antialiased text-xs">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* COLONNE DE GAUCHE : IMAGE */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-neutral-100 bg-neutral-50 rounded-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-102"
                sizes="(max-w-lg) 100vw, 50vw"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="bg-neutral-900/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg border border-neutral-800">Épuisé</span>
                </div>
              )}
            </div>
          </div>

          {/* COLONNE DE DROITE : CONFIGURATION */}
          <div className="space-y-8 lg:py-2">
            <header className="border-b border-neutral-100 pb-6 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md inline-block">
                {cleanCategoryName(product.category)}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif tracking-wide text-neutral-900 font-medium">
                {product.name}
              </h1>
              <p className="text-base sm:text-lg text-neutral-900 font-bold pt-1">
                {product.displayPrice}
              </p>
            </header>

            <main className="space-y-8">
              {/* Choix 1 : La Couleur */}
              <section className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">1. Teinte disponible en stock</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs transition-all duration-200 border rounded-xl font-semibold ${
                        selectedColor === color 
                          ? "border-neutral-950 bg-neutral-950 text-white shadow-sm" 
                          : "border-neutral-200 text-neutral-600 bg-white hover:border-neutral-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </section>

              {/* Choix 2 : La Taille */}
              <section className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">2. Guide des tailles</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 transition-all duration-200 border flex items-center justify-center rounded-xl font-bold ${
                        selectedSize === size 
                          ? "border-neutral-950 bg-neutral-950 text-white shadow-sm" 
                          : "border-neutral-200 text-neutral-600 bg-white hover:border-neutral-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>

              {/* Action : Redirection WhatsApp */}
              <div className="pt-6 border-t border-neutral-100 space-y-3">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-emerald-600 text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-emerald-500 transition-all shadow-sm shadow-emerald-600/10"
                >
                  <span>🛍️</span> Commander via WhatsApp
                </button>
                <p className="text-[10px] text-center text-neutral-400 font-light">
                  Votre sélection (*{selectedColor}* en taille *{selectedSize}*) sera partagée automatiquement dans la discussion.
                </p>
              </div>
            </main>
          </div>

        </div>

        {/* SECTION RECOMMANDATIONS */}
        <section className="border-t border-neutral-100 pt-12 space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-base font-serif font-bold text-neutral-900">
              Dans l'univers {cleanCategoryName(product.category)}
            </h2>
            <p className="text-neutral-400 font-light">Explorez les autres créations et déclinaisons de cette collection</p>
          </div>

          {similarProducts.length === 0 ? (
            <p className="text-neutral-400 italic font-light py-2">Aucun autre modèle n'est disponible dans cette section pour le moment.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map((simProduct) => (
                <a 
                  key={simProduct.id} 
                  href={`/options?id=${simProduct.id}`}
                  className="bg-white p-2.5 rounded-2xl border border-neutral-200/40 shadow-sm hover:shadow-md hover:border-purple-100 transition-all flex flex-col group"
                >
                  <div className="relative aspect-square rounded-xl bg-neutral-50 overflow-hidden mb-3">
                    <Image 
                      src={simProduct.image} 
                      alt={simProduct.name} 
                      fill 
                      className="group-hover:scale-102 transition-transform duration-300 object-cover" 
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between space-y-1">
                    <h4 className="font-semibold text-neutral-800 line-clamp-1 group-hover:text-purple-700 transition-colors">
                      {simProduct.name}
                    </h4>
                    <div className="flex items-center justify-between pt-1 border-t border-neutral-50">
                      <span className="font-bold text-neutral-900">{simProduct.displayPrice}</span>
                      <span className="text-[10px] font-medium text-purple-600 group-hover:translate-x-0.5 transition-transform">Voir ›</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

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