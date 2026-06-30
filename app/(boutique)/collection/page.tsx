"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
// Importation du catalogue dynamique partagé
import { allProducts } from '../../data/products';

// Interface produit standardisée
interface Product {
  id: number;
  name: string;
  price: number | string; // Supporte le format numérique ou textuel (ex: "75.000 FCFA")
  formattedPrice?: string;
  category: string;
  tag?: string;
  badge?: string;
  image: string;
  inStock: boolean;
}

interface NormalizedProduct extends Product {
  cleanPrice: number;
  displayPrice: string;
}

export default function CollectionPage() {
  // =========================================================================
  // ÉTATS DE NAVIGATION, FILTRES ET AFFICHAGE
  // =========================================================================
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [priceFilter, setPriceFilter] = useState<string>("Tous");
  const [stockFilter, setStockFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewCols, setViewCols] = useState<number>(3); 
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // État pour la section interactive des favoris
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // =========================================================================
  // CATALOGUE LOGIQUE CENTRALISÉ ET NORMALISÉ
  // =========================================================================
  
  // Fonction utilitaire pour uniformiser le texte des catégories, supprimer les doublons et fusionner le contenu
  const cleanCategoryName = (cat: string): string => {
    if (!cat) return "";
    const trimmed = cat.trim().toLowerCase();
    
    // Fusion explicite des catégories cibles
    if (trimmed.includes("soin") || trimmed.includes("meditation") || trimmed.includes("méditation")) {
      return "Soin et méditation";
    }
    if (trimmed.startsWith("gaine")) {
      return "Gaines";
    }

    // Uniformisation standard par défaut
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  // Génération dynamique des catégories uniques propres et fusionnées
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      allProducts.map(p => cleanCategoryName(p.category || ""))
    );
    return ["Tous", ...Array.from(uniqueCategories).filter(Boolean)];
  }, []);

  // Normalisation des prix à la volée et uniformisation des catégories pour le filtrage
  const normalizedCatalog = useMemo<NormalizedProduct[]>(() => {
    return allProducts.map((p: any) => {
      const numericPrice = typeof p.price === 'string' 
        ? parseInt(p.price.replace(/[^0-9]/g, ''), 10) 
        : (typeof p.price === 'number' ? p.price : 0);

      const formattedPrice = typeof p.price === 'string' 
        ? p.price 
        : `${Number(p.price || 0).toLocaleString('fr-FR')} FCFA`;

      return {
        ...p,
        id: p.id,
        name: p.name || '',
        category: cleanCategoryName(p.category || ''), // Catégorie nettoyée et fusionnée appliquée au produit
        image: p.image || '',
        cleanPrice: numericPrice,
        displayPrice: formattedPrice,
        tag: p.tag || '',
        badge: p.badge || '',
        inStock: p.inStock !== undefined ? p.inStock : true
      };
    });
  }, []);

  // Sélection automatique des 4 premiers articles du catalogue global pour les recommandations
  const premiumRecommendations = useMemo(() => {
    return normalizedCatalog.slice(0, 4);
  }, [normalizedCatalog]);

  // Moteur de filtrage et de tri appliqué sur le catalogue global dynamique
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...normalizedCatalog];

    // 1. Filtrage par catégorie unique et nettoyée
    if (selectedCategory !== "Tous") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Filtrage par tranche de budget
    if (priceFilter === "under-5000") {
      result = result.filter(p => p.cleanPrice < 5000);
    } else if (priceFilter === "5000-25000") {
      result = result.filter(p => p.cleanPrice >= 5000 && p.cleanPrice <= 25000);
    } else if (priceFilter === "over-25000") {
      result = result.filter(p => p.cleanPrice > 25000);
    }

    // 3. Filtrage par stock
    if (stockFilter) {
      result = result.filter(p => p.inStock);
    }

    // 4. Tri des données
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.cleanPrice - b.cleanPrice);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.cleanPrice - a.cleanPrice);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [normalizedCatalog, selectedCategory, priceFilter, stockFilter, sortBy]);

  return (
    <div className="bg-neutral-50/60 min-h-screen selection:bg-purple-500 selection:text-white">
      
      {/* ================= EN-TÊTE DE COLLECTION AVEC IMAGE COMPLÈTE EN ARRIÈRE-PLAN ================= */}
      <header className="relative bg-neutral-900 text-white min-h-[380px] sm:min-h-[460px] flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/shopping-removebg-preview.png" 
            alt="Fond collection permanente textile, lingerie et bien-être"
            fill
            className="opacity-25 filter brightness-75 contrast-125 select-none pointer-events-none transform scale-105 object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/60 to-neutral-950/90" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 text-center space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20 inline-block">
            Vestiaire Iconique & Soins
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-wide text-white font-light">
            Le Catalogue Permanent
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Parcourez notre vestiaire premium : des silhouettes fluides, de la lingerie de nuit délicate, des gaines amincissantes invisibles et des indispensables bien-être conçus pour sublimer votre quotidien.
          </p>
        </div>
      </header>

      {/* ================= BARRE DE FILTRES ET TRI STICKY ================= */}
      <section className="bg-white border-y border-neutral-200/80 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => Math.max(0, 1) && setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 font-bold text-neutral-800 border border-neutral-200 px-3 py-1.5 rounded-lg active:bg-neutral-50"
            >
              <span>🎛️</span> Filtrer et Trier
            </button>
            <div className="hidden lg:flex items-center gap-1.5 text-neutral-500 font-medium">
              <span>📊</span> <span className="text-neutral-800 font-bold">{filteredAndSortedProducts.length}</span> modèles trouvés
            </div>
          </div>

          {/* FILTRE HORIZONTAL SUPPRIMÉ D'ICI - LE DESIGN NE BOUGE PAS */}

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 border-r border-neutral-200 pr-4 text-neutral-400">
              {[2, 3, 4].map((cols) => (
                <button 
                  key={cols}
                  onClick={() => setViewCols(cols)} 
                  className={`p-1.5 font-mono text-sm rounded ${viewCols === cols ? "text-neutral-800 bg-neutral-100 font-bold" : "hover:text-neutral-600"}`}
                >
                  {cols}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 hidden sm:inline">Trier par :</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-neutral-800 focus:outline-none cursor-pointer py-1"
              >
                <option value="featured">Sélection Sylite</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="name-asc">Nom (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LAYOUT PRINCIPAL DE LA GRILLE ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 items-start">
          
          {/* PANNEAU LATÉRAL DE FILTRES (DESKTOP) */}
          <aside className="w-64 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm sticky top-20 hidden lg:block space-y-6 text-xs">
            <div>
              <h3 className="font-bold text-neutral-900 uppercase tracking-wider mb-3 pb-2 border-b border-neutral-100">Catégories</h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setVisibleCount(8); }}
                    className={`w-full text-left py-1 px-2 rounded-md font-medium flex justify-between items-center ${
                      selectedCategory === cat ? "bg-purple-50 text-purple-700 font-bold" : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-neutral-900 uppercase tracking-wider mb-3 pb-2 border-b border-neutral-100">Budget (FCFA)</h3>
              <div className="space-y-2 text-neutral-600 font-medium">
                {[
                  { label: "Tous les prix", val: "Tous" },
                  { label: "Moins de 5.000 FCFA", val: "under-5000" },
                  { label: "5.000 - 25.000 FCFA", val: "5000-25000" },
                  { label: "Plus de 25.000 FCFA", val: "over-25000" }
                ].map((pOpt) => (
                  <label key={pOpt.val} className="flex items-center gap-2.5 cursor-pointer hover:text-neutral-900">
                    <input type="radio" name="price" checked={priceFilter === pOpt.val} onChange={() => setPriceFilter(pOpt.val)} className="accent-purple-600 h-3.5 w-3.5" />
                    <span>{pOpt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-neutral-900 uppercase tracking-wider mb-3 pb-2 border-b border-neutral-100">Disponibilité</h3>
              <label className="flex items-center gap-2.5 cursor-pointer text-neutral-600 font-medium hover:text-neutral-900">
                <input type="checkbox" checked={stockFilter} onChange={(e) => setStockFilter(e.target.checked)} className="accent-purple-600 h-4 w-4 rounded" />
                <span>Masquer les articles épuisés</span>
              </label>
            </div>
          </aside>

          {/* LA GRILLE DE PRODUITS */}
          <div className="flex-grow">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200/60 p-16 text-center max-w-xl mx-auto my-10 space-y-4">
                <div className="text-3xl">🔍</div>
                <h3 className="text-base font-bold text-neutral-800">Aucun modèle ne correspond à vos filtres</h3>
                <button onClick={() => { setSelectedCategory("Tous"); setPriceFilter("Tous"); setStockFilter(false); }} className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-2 ${viewCols === 2 ? 'md:grid-cols-2' : viewCols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 sm:gap-6 lg:gap-8`}>
                {filteredAndSortedProducts.slice(0, visibleCount).map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-200/40 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-300 group flex flex-col relative">
                    
                    {/* Bouton Like Interactif */}
                    <button 
                      onClick={() => toggleLike(product.id)}
                      className="absolute top-2.5 right-2.5 z-20 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-all text-xs"
                    >
                      {likedProducts.includes(product.id) ? "❤️" : "🤍"}
                    </button>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] flex items-center justify-center z-20 pointer-events-none">
                        <span className="bg-neutral-900/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg border border-neutral-800 shadow-lg">Épuisé</span>
                      </div>
                    )}
                    <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                      <Image src={product.image} alt={product.name} fill className="group-hover:scale-102 transition-transform duration-500 object-cover" />
                      {(product.tag || product.badge) && (
                        <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm z-10 uppercase tracking-wide">{product.tag || product.badge}</span>
                      )}
                    </div>
                    <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-neutral-400 font-semibold block mb-0.5 uppercase tracking-wide">{product.category}</span>
                        <h2 className="font-semibold text-neutral-800 line-clamp-2 mb-1 sm:mb-2 group-hover:text-purple-700 transition-colors text-xs sm:text-sm">{product.name}</h2>
                      </div>
                      <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="text-sm sm:text-base font-bold text-neutral-900">{product.displayPrice}</div>
                        <a href={`/options?id=${product.id}`} className="inline-flex justify-center items-center px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg bg-neutral-950 text-white hover:bg-purple-600 transition-all shadow-sm z-10 relative">Options</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CHARGER PLUS D'ARTICLES */}
            {filteredAndSortedProducts.length > visibleCount && (
              <div className="mt-12 text-center border-t border-neutral-200/60 pt-8 space-y-3">
                <p className="text-[11px] text-neutral-400 font-medium">Affichage de <span className="text-neutral-800 font-bold">{visibleCount}</span> sur <span className="text-neutral-800 font-bold">{filteredAndSortedProducts.length}</span> modèles</p>
                <button onClick={() => setVisibleCount(prev => prev + 4)} className="px-6 py-3 border border-neutral-300 text-neutral-800 font-bold text-xs uppercase tracking-wider rounded-xl bg-white hover:bg-neutral-50 transition-all shadow-sm inline-block">
                  Charger plus d'articles
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ================= SELECTION 1 : BANDEAU D'INSPIRATION CHIC (SHOP THE LOOK) ================= */}
      <section className="bg-neutral-900 text-white py-16 my-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">Inspiration Style</span>
            <h3 className="text-2xl sm:text-4xl font-serif tracking-wide">Achetez la Silhouette Complète</h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Ne cherchez plus les associations parfaites. Nos stylistes ont assemblé l'élégance intemporelle de nos ensembles raffinés avec la fluidité et le tombé soyeux de nos foulards premium.
            </p>
            <div className="pt-2">
              <a href="https://wa.me/22394939380?text=Bonjour%20Sylite,%20je%20souhaite%20commander%20le%20look%20complet%20Ensemble%20Chic%20%2B%20Foulard%20en%20Soie." target="_blank" rel="noopener noreferrer" className="inline-flex py-3 px-6 bg-purple-600 hover:bg-purple-500 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md">
                🛍️ Réserver le Look Complet
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800 flex items-center gap-4">
              <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="/ensemble-fleuri.jpg" alt="Ensemble Chic" fill className="object-cover" />
              </div>
              <div className="text-xs"><h4 className="font-semibold text-neutral-200 line-clamp-1">Ensemble Femme Chic</h4><p className="text-neutral-400 mt-0.5">75.000 FCFA</p></div>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800 flex items-center gap-4">
              <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="/foulard habiba.jpg" alt="Foulard Soie" fill className="object-cover" />
              </div>
              <div className="text-xs"><h4 className="font-semibold text-neutral-200 line-clamp-1">Foulard en Soie Imprimé</h4><p className="text-emerald-400 font-medium mt-0.5">2.000 FCFA</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SELECTION 2 : PREUVE SOCIALE COMMUNAUTAIRE (SYLITE & ME) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">Communauté Instagram & TikTok</span>
          <h3 className="text-2xl font-serif font-bold text-neutral-900">Porté par Vous, Inspiré pour Vous</h3>
          <p className="text-xs text-neutral-500 font-light">Partagez votre éclat avec le hashtag <span className="font-semibold text-purple-600">#SyliteMali</span></p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["/ensemble-fleuri.jpg", "/nusette.jpg", "/gaine-ceinture-7000.jpg", "/body 2000.jpg"].map((src, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 group border border-neutral-200/40">
              <Image src={src} alt="Avis cliente photo communauté" fill className="group-hover:scale-105 transition-transform duration-500 filter brightness-95 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                ✨ @Sylite_Customer_{i+1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SELECTION RECOMMANDATIONS DYNAMIQUES DU DRESSING ================= */}
      <section className="bg-purple-50/40 border-y border-purple-100/60 py-16 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-center sm:text-left gap-2">
            <div>
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">Inspiré de vos sessions</span>
              <h3 className="text-2xl font-serif font-bold text-neutral-900">Sélectionnés pour Compléter votre Dressing</h3>
            </div>
            <p className="text-xs text-neutral-400 font-light max-w-xs">Les articles les plus consultés et réservés cette semaine à Bamako.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {premiumRecommendations.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-2.5 border border-neutral-200/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-xs relative group">
                <button 
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-[10px]"
                >
                  {likedProducts.includes(product.id) ? "❤️" : "🤍"}
                </button>
                
                <div>
                  <div className="relative aspect-square rounded-xl bg-neutral-50 overflow-hidden mb-3">
                    <Image src={product.image} alt={product.name} fill className="group-hover:scale-102 transition-transform duration-300 object-cover" />
                  </div>
                  <span className="text-[9px] text-purple-600 font-bold uppercase tracking-wider block mb-0.5">{product.category}</span>
                  <h4 className="font-semibold text-neutral-800 line-clamp-1 group-hover:text-purple-700 transition-colors mb-1">{product.name}</h4>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                  <span className="font-bold text-neutral-900">{product.displayPrice}</span>
                  <span className="text-[10px] font-medium text-purple-600 group-hover:translate-x-0.5 transition-transform">Voir ›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODULE DE CONFIANCE ET LOGISTIQUE ================= */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-center md:text-left">
          <div className="space-y-2 p-2">
            <div className="text-xl text-purple-600">⚡</div>
            <h4 className="font-bold text-neutral-800 uppercase tracking-wider">Livraison Bamako Express</h4>
            <p className="text-neutral-500 leading-relaxed font-light">Vos ensembles vestimentaires et lingerie livrés à domicile sous 24h maximum.</p>
          </div>
          <div className="space-y-2 p-2">
            <div className="text-xl text-purple-600">📦</div>
            <h4 className="font-bold text-neutral-800 uppercase tracking-wider">Expédition Provinces 48h</h4>
            <p className="text-neutral-500 leading-relaxed font-light">Envois sécurisés via compagnies de transport vers Ségou, Sikasso, Kayes et Mopti.</p>
          </div>
          <div className="space-y-2 p-2">
            <div className="text-xl text-purple-600">💬</div>
            <h4 className="font-bold text-neutral-800 uppercase tracking-wider">Conseil WhatsApp Continu</h4>
            <p className="text-neutral-500 leading-relaxed font-light">Nos conseillers vous valident la taille idéale en stock par message avant l'envoi.</p>
          </div>
          <div className="space-y-2 p-2">
            <div className="text-xl text-purple-600">🤝</div>
            <h4 className="font-bold text-neutral-800 uppercase tracking-wider">Paiement Serein</h4>
            <p className="text-neutral-500 leading-relaxed font-light">Réglez en toute sécurité en espèces lors de la livraison ou par Orange/Moov Money.</p>
          </div>
        </div>
      </section>

      {/* MODAL FILTRES MOBILE */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto text-xs space-y-6 z-10">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Filtres de recherche</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-lg font-light p-1">✕</button>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-neutral-900 uppercase tracking-wide">Par Univers</h3>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setVisibleCount(8); }}
                    className={`px-3 py-1.5 font-semibold rounded-lg border ${
                      selectedCategory === cat ? "bg-purple-600 text-white border-purple-600" : "text-neutral-600 border-neutral-200 bg-neutral-50/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-neutral-900 uppercase tracking-wide">Budget Max (FCFA)</h3>
              <div className="space-y-2 text-neutral-600 font-medium">
                {["Tous", "under-5000", "5000-25000", "over-25000"].map((option) => (
                  <label key={option} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input type="radio" name="mobilePrice" checked={priceFilter === option} onChange={() => setPriceFilter(option)} className="accent-purple-600 h-4 w-4" />
                    <span>
                      {option === "Tous" && "Tous les budgets"}
                      {option === "under-5000" && "Moins de 5.000 FCFA"}
                      {option === "5000-25000" && "5.000 - 25.000 FCFA"}
                      {option === "over-25000" && "Plus de 25.000 FCFA"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button onClick={() => setIsMobileFilterOpen(false)} className="w-full py-3.5 bg-purple-600 text-white font-bold uppercase tracking-wider rounded-xl mt-auto text-center shadow-md">
              Afficher les articles
            </button>
          </div>
        </div>
      )}

    </div>
  );
}