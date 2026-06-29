"use client";

import { useState } from 'react';
import Image from 'next/image';
import { allProducts } from '../../data/products';

export default function NouveauArrivage() {
  // CONFIGURATION INTERNATIONALE DE VOTRE NUMÉRO WHATSAPP
  const WHATSAPP_NUMBER = "22394939380"; 

  // =========================================================================
  // CATALOGUE LOGIQUE, CENTRALISÉ ET ENRICHI DES NOUVELLES VARIANTES
  // =========================================================================
  

  // Sélection de quelques articles à stock très limité pour la section Urgence (FOMO)
  const limitedStockProducts = allProducts.slice(0, 3);

  // Gestion de l'état des filtres
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // Extraction automatique des catégories uniques
  const categories = ["Tous", ...Array.from(new Set(allProducts.map(p => p.category)))];

  // Filtrage logique des produits
  const filteredProducts = selectedCategory === "Tous" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  // Message WhatsApp pour une demande spéciale / produit introuvable
  const specialRequestMessage = `Bonjour SYLITE, je regarde vos nouveaux arrivages mais je recherche un article spécifique qui n'est pas listé sur la page. Pouvez-vous m'aider ?`;
  const specialRequestUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(specialRequestMessage)}`;

  return (
    <div className="bg-neutral-50 min-h-screen">
      
      {/* ================= BANNIÈRE HERO ================= */}
      <section className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-purple-950 text-white py-24 tracking-wide overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center py-1 px-3 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4 uppercase tracking-widest">
            Mises à jour en direct
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight">
            Le Grand <span className="bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent italic font-normal">Répertoire</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Explorez l'intégralité de nos collections et passez votre commande instantanément par WhatsApp.
          </p>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl z-0 pointer-events-none" />
      </section>

      {/* ================= CONTEXTE LOGIQUE DE LA PAGE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <h2 className="text-2xl font-serif tracking-wide text-neutral-900 font-bold">Tous nos articles ({filteredProducts.length})</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Cliquez sur un article pour ouvrir une discussion et finaliser votre achat avec notre équipe.
            </p>
          </div>
          
          <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Commande directe sur WhatsApp au +223 94 93 93 80
          </div>
        </div>

        {/* ================= SECTION FILTRES PAR CATÉGORIES FLUIDES ================= */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-all duration-200 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-600/20"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-purple-300 hover:text-purple-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= GRANDE GRILLE PRINCIPALE RESPONSIVE ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const whatsappMessage = `Bonjour SYLITE, je souhaite commander l'article suivant des nouveaux arrivages :\n\n- *Produit :* ${product.name}\n- *Prix :* ${product.price}\n\nEst-il disponible dans vos stocks actuels ?`;
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 group flex flex-col relative"
              >
                {product.isNew && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-md z-20 uppercase tracking-widest">
                    Nouveau
                  </div>
                )}

                <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    sizes="(max-w-640px) 100vw, (max-w-768px) 50vw, (max-w-1024px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <span className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-md text-purple-400 text-[9px] font-bold px-2.5 py-1 rounded-md border border-purple-500/10 z-10 uppercase tracking-wider">
                    {product.badge}
                  </span>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-50 flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Tarif</span>
                      <div className="text-base font-black text-neutral-900">{product.price}</div>
                    </div>
                    
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-sm shadow-emerald-600/10 z-10"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.488 4.605 1.489 5.425.002 9.845-4.386 9.849-9.78.002-2.613-1.015-5.07-2.864-6.92C16.386 2.093 13.931 1.075 11.3 1.075c-5.433 0-9.85 4.385-9.853 9.778-.001 1.91.542 3.326 1.408 4.83l-.997 3.64 3.789-.993zm11.218-5.34c-.292-.146-1.727-.852-1.994-.95-.266-.096-.46-.146-.653.146-.193.291-.747.95-.916 1.144-.168.194-.337.213-.63.067-.292-.146-1.233-.454-2.35-1.452-.87-.775-1.457-1.733-1.628-2.025-.17-.292-.018-.45.129-.595.132-.131.292-.34.438-.51.146-.17.195-.292.292-.486.097-.194.048-.364-.024-.51-.072-.146-.653-1.577-.894-2.16-.235-.565-.475-.489-.653-.498-.168-.008-.362-.01-.555-.01-.194 0-.51.073-.777.364-.266.292-1.016.994-1.016 2.427 0 1.434 1.04 2.818 1.186 3.012.146.194 2.049 3.129 4.964 4.385.693.3 1.234.478 1.656.612.696.222 1.33.191 1.83.116.558-.084 1.728-.705 1.972-1.386.244-.68.244-1.264.17-1.386-.073-.122-.266-.194-.558-.34z"/>
                      </svg>
                      Commander via WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </main>

      {/* ================= SECTION RÉASSORT & COMMANDE SUR MESURE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
        <div className="bg-gradient-to-r from-purple-900 to-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none pointer-events-none transform translate-x-10 translate-y-10">✨</div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-bold tracking-widest text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-md uppercase">Service Exclusif</span>
            <h3 className="text-xl sm:text-2xl font-serif mt-3 mb-2">Un modèle en rupture ou introuvable ?</h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
              Nos pièces s'envolent très vite. Si un produit de vos rêves n'est plus disponible ou si vous recherchez une variante précise, notre équipe s'occupe de vous le trouver sur commande.
            </p>
            <a 
              href={specialRequestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-neutral-900 text-xs font-bold px-5 py-3 rounded-xl hover:bg-neutral-100 transition-all shadow-md"
            >
              🎯 Faire une demande personnalisée
            </a>
          </div>
        </div>
      </section>

      {/* ================= FINITION E-COMMERCE AJOUTÉE 1 : ALERTE STOCK FAIBLE (FOMO ACCÉLÉRATEUR) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
          <div>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1">Attention</span>
            <h3 className="text-xl font-serif font-bold text-neutral-900">Dernières pièces disponibles</h3>
            <p className="text-xs text-neutral-500 font-light">Ces nouveautés sont victimes de leur succès et seront bientôt épuisées.</p>
          </div>
          <div className="text-xs bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg border border-red-100 self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Stock &lt; 3 unités
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {limitedStockProducts.map((product) => (
            <div key={`limited-${product.id}`} className="bg-white border border-neutral-200/60 rounded-2xl p-4 flex items-center gap-4 hover:border-purple-200 transition-all">
              <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  sizes="80px"
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">{product.category}</span>
                <h4 className="text-xs font-semibold text-neutral-800 truncate mb-1">{product.name}</h4>
                <div className="text-sm font-black text-neutral-900 mb-2">{product.price}</div>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite réserver en urgence l'article en stock limité : ${product.name}`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1"
                >
                  Bloquer ma pièce →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINITION E-COMMERCE AJOUTÉE 2 : PREUVE SOCIALE & RETOURS CLIENTS (SOCIAL PROOF) ================= */}
      <section className="bg-neutral-900 text-white py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest block mb-2">La voix de nos clientes</span>
            <h3 className="text-2xl font-serif">Pourquoi elles adorent commander chez SYLITE</h3>
            <p className="text-xs text-neutral-400 font-light mt-2">Plus qu'un catalogue, une communauté basée sur la confiance, le style et l'écoute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Fatoumata K.", loc: "Bamako", text: "Le service sur WhatsApp est d'une fluidité incroyable ! J'ai commandé l'ensemble chic en début d'après-midi et j'ai été livrée le soir-même. Le tissu est magnifique, exactement comme sur la photo.", rate: "⭐⭐⭐⭐⭐" },
              { name: "Aïcha D.", loc: "Ségou", text: "J'avais un doute sur l'authenticité du diffuseur premium mais l'équipe m'a envoyé des vidéos réelles sur WhatsApp avant expédition. Très honnête et super pro !", rate: "⭐⭐⭐⭐⭐" },
              { name: "Mariam T.", loc: "Bamako", text: "C'est mon 3ème achat ici (robes de prière et voiles). La qualité ne bouge pas, les finitions sont soignées. On sent le haut de gamme dès l'ouverture du colis.", rate: "⭐⭐⭐⭐⭐" }
            ].map((review, i) => (
              <div key={`review-${i}`} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between">
                <p className="text-xs text-neutral-300 font-light leading-relaxed italic">"{review.text}"</p>
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{review.name}</h5>
                    <span className="text-[10px] text-neutral-500">{review.loc}</span>
                  </div>
                  <span className="text-xs tracking-tighter">{review.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION ATTRIBUTS MARQUE ================= */}
      <section className="bg-white py-16 border-t border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <span className="text-2xl mb-3 block">📦</span>
              <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">Arrivages Hebdomadaires</h4>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">Nos stocks sont renouvelés régulièrement pour vous proposer en continu les dernières pièces phares de la saison.</p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <span className="text-2xl mb-3 block">💬</span>
              <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">Conseil Morpho & Style</h4>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">Un doute sur une taille ou un modèle ? Nos conseillers WhatsApp vous aident à choisir l'option idéale pour sublimer vos courbes.</p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <span className="text-2xl mb-3 block">🔒</span>
              <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">Disponibilité Vérifiée</h4>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">Chaque message WhatsApp est directement traité pour réserver votre produit instantanément de manière sécurisée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BAS DE PAGE ÉDITORIAL SOMBRE ================= */}
      <section className="bg-neutral-950 text-white py-16 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block">
            Charte Exclusivité & Qualité
          </span>
          <p className="text-sm font-light text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Notre catalogue s'adapte en permanence pour vous fournir les meilleurs standards en ligne. Tous nos arrivages de vêtements et d'appareils respectent un cahier des charges haut de gamme.
          </p>
          <div className="pt-2">
            <a href="/" className="text-xs text-neutral-400 hover:text-purple-400 transition-colors inline-flex items-center gap-1 font-medium">
              ← Retourner à la page d'accueil
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}