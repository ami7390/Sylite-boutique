"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseclient';

interface DbProduct {
  id: number | string;
  name?: string;
  category?: string;
  image_url?: string;
  image?: string;
  price?: number | string;
  description?: string; 
  tag?: string;
  badge?: string;
  inStock?: boolean;
}

function OptionsDbPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const defaultSizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    setIsMounted(true);
    
    const fetchProductDetails = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", Number(productId))
          .single();

        if (!error && data) {
          setProduct(data as DbProduct);
        } else {
          console.error("Produit introuvable ou erreur Supabase:", error?.message);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du produit :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const displayPrice = product?.price
    ? typeof product.price === 'string' && product.price.includes("FCFA")
      ? product.price
      : `${Number(product.price).toLocaleString('fr-FR')} FCFA`
    : "Prix non disponible";

  // Fonction générant le lien WhatsApp lié au 94939380
  const getWhatsAppLink = () => {
    if (!product) return "#";
    
    const message = `Bonjour Sylite, je souhaite commander l'article suivant :
• *Nom* : ${product.name}
• *Catégorie* : ${product.category || 'Non spécifiée'}
• *Prix* : ${displayPrice}
• *Taille choisie* : ${selectedSize || 'Non spécifiée'}
• *Quantité* : ${quantity}
• *Lien* : ${window.location.href}`;

    return `https://wa.me/22394939380?text=${encodeURIComponent(message)}`;
  };

  if (!isMounted) {
    return <div className="bg-neutral-50 min-h-screen animate-pulse" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50/60 flex items-center justify-center text-xs text-neutral-400">
        Chargement des détails uniques du produit...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50/60 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="text-3xl">📭</div>
        <h1 className="text-sm font-bold text-neutral-800">Produit introuvable</h1>
        <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
          Ce modèle n'existe pas ou a été retiré de notre catalogue en ligne.
        </p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold rounded-xl">
          Retour au catalogue
        </button>
      </div>
    );
  }

  const productImage = product.image_url || product.image || '';

  return (
    <div className="bg-neutral-50/60 min-h-screen pb-16 text-xs">
      
      <nav className="bg-white border-b border-neutral-200/80 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 font-medium">
            ‹ Retour au catalogue
          </button>
          <span className="text-neutral-400 font-mono tracking-wider uppercase text-[10px] hidden sm:inline">
            Fiche Produit Personnalisée
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-8">
          
          {/* ZONE DE L'IMAGE */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] w-full bg-neutral-100 rounded-xl overflow-hidden group border border-neutral-100">
              {productImage ? (
                <Image 
                  src={productImage} 
                  alt={product.name || "Produit"} 
                  fill 
                  className="object-cover object-center"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  Aucun visuel disponible
                </div>
              )}

              {(product.tag || product.badge) && (
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm z-10 uppercase tracking-wide">
                  {product.tag || product.badge}
                </span>
              )}
            </div>
          </div>

          {/* ZONE DES OPTIONS ET DÉTAILS */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-purple-600 font-bold block uppercase tracking-wider mb-1">
                  {product.category || "Collection Sylite"}
                </span>
                <h1 className="text-xl sm:text-2xl font-serif text-neutral-900 tracking-wide font-medium">
                  {product.name}
                </h1>
              </div>

              <div className="text-lg sm:text-xl font-bold text-neutral-900 bg-neutral-50 px-3 py-2 rounded-xl inline-block">
                {displayPrice}
              </div>

              {/* DESCRIPTION UNIQUE DU PRODUIT */}
              <div className="space-y-1.5 pt-4 border-t border-neutral-100">
                <h3 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">
                  Description du produit
                </h3>
                <p className="text-neutral-600 leading-relaxed font-light text-xs whitespace-pre-line">
                  {product.description && product.description.trim() !== "" 
                    ? product.description 
                    : "Ce modèle exclusif fait partie de notre nouvelle sélection. Conçu avec soin pour vous offrir un style unique et un confort optimal au quotidien."
                  }
                </p>
              </div>

              {/* Sélection des tailles */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Sélectionner une Taille</h3>
                <div className="flex flex-wrap gap-2">
                  {defaultSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 w-12 font-bold rounded-lg border transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                          : "border-neutral-200 text-neutral-700 bg-white hover:border-neutral-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélection de la quantité */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Quantité</h3>
                <div className="flex items-center gap-1 border border-neutral-200 rounded-lg w-28 bg-white overflow-hidden shadow-sm">
                  <button 
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(prev => prev - 1)}
                    className="w-8 h-8 font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-grow text-center font-bold text-neutral-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-8 h-8 font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* LE BOUTON WHATSAPP INTEGRÉ AU NUMÉRO 94939380 */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-neutral-950 text-white hover:bg-purple-600 transition-all font-bold uppercase tracking-wider rounded-xl text-center shadow-md flex items-center justify-center gap-2 text-xs"
              >
                <span>🛍️</span> Confirmer l'achat sur WhatsApp
              </a>
              <Link href="/collection" className="w-full py-3 border border-neutral-200 text-neutral-700 font-medium rounded-xl text-center hover:bg-neutral-50 transition-all block text-xs">
                Continuer mes achats
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function OptionsDbPage() {
  return <Suspense fallback={null}><OptionsDbPageContent /></Suspense>;
}
