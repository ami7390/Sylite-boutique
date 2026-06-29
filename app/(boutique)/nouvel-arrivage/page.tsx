"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function NouveauArrivage() {
  // CONFIGURATION INTERNATIONALE DE VOTRE NUMÉRO WHATSAPP
  const WHATSAPP_NUMBER = "22394939380"; 

  // =========================================================================
  // CATALOGUE LOGIQUE, CENTRALISÉ ET ENRICHIT DES NOUVELLES VARIANTES
  // =========================================================================
  const allProducts = [
    { 
      id: 1, 
      name: "Ensemble Femme Chic et Tendance", 
      price: "75.000 FCFA", 
      category: "Ensemble", 
      badge: "Tendance", 
      image: "/ensemble-fleuri.jpg",
      isNew: true
    },
    { 
      id: 2, 
      name: "Nuisette en 100% cotton", 
      price: "45.000 FCFA", 
      category: "Nuisette", 
      badge: "Incontournable", 
      image: "/nusette.jpg",
      isNew: false
    },
    { 
      id: 3, 
      name: "Gaine Amincissante Ventre Plat Invisible", 
      price: "7.000 FCFA", 
      category: "Gaines", 
      badge: "Populaire", 
      image: "/gaine-ceinture-7000.jpg",
      isNew: false
    },
    { 
      id: 4, 
      name: "Body String Échancré Dos Nu Noir", 
      price: "2.000 FCFA", 
      category: "Body", 
      badge: "Nouveau", 
      image: "/body 2000.jpg",
      isNew: true
    },
    { 
      id: 5, 
      name: "Diffuseur d'Huiles Essentielles Ultrasonique", 
      price: "22.500 FCFA", 
      category: "Bien-être", 
      badge: "Ambiance", 
      image: "/diffuseur 8000.jpg",
      isNew: true
    },
    { 
      id: 52, 
      name: "Diffuseur d'Huiles Essentielles Small", 
      price: "8.000 FCFA", 
      category: "Bien-être", 
      badge: "Compact", 
      image: "/humidificateur 20000.png",
      isNew: true
    },
    { 
      id: 53, 
      name: "Diffuseur d'Huiles Essentielles Mini", 
       category: "Bien-être", 
      badge: "Discret", 
      image: "/humidificateur-7500.jpg",
      isNew: true
    },
    { 
      id: 54, 
      name: "Diffuseur d'Huiles Essentielles Premium", 
      price: "20.000 FCFA", 
      category: "Bien-être", 
      badge: "Luxe", 
      image: "/diffuseur-8000.jpg",
      isNew: true
    },
    { 
      id: 6, 
      name: "Accessoire de Tête - Epingle", 
      price: "1.000 FCFA", 
      category: "Accessoire de tête", 
      badge: "Exclusif", 
      image: "/boite-epingles-pour-hijab.jpg",
      isNew: false
    },
    { 
      id: 62, 
      name: "Barette Stylisée en Cristal", 
      price: "1.000 FCFA", 
      category: "Accessoire de tête", 
      badge: "Élégant", 
      image: "/barette-500.jpg",
      isNew: true
    },
    { 
      id: 63, 
      name: "Bonnet de Maintien Confort", 
      price: "1.500 FCFA", 
      category: "Accessoire de tête", 
      badge: "Maintien", 
      image: "/bonet-500.jpg",
      isNew: true
    },
    { 
      id: 7, 
      name: "Foulard en Soie Imprimé Satiné Luxe", 
      price: "2.000 FCFA", 
      category: "Foulards", 
      badge: "Must-Have", 
      image: "/foulard habiba.jpg",
      isNew: false
    },
    { 
      id: 8, 
      name: "Voile en Mousseline Premium Haute Qualité", 
      price: "2.000 FCFA", 
      category: "Voiles", 
      badge: "Nouveau", 
      image: "/muslim 2000.jpg",
      isNew: true
    },
    { 
      id: 82, 
      name: "Voile Fluide Taille 3XL", 
      price: "3.500 FCFA", 
      category: "Voiles", 
      badge: "Large", 
      image: "/voile-3xl.png",
      isNew: true
    },
    { 
      id: 83, 
      name: "Voile Fluide Taille 5XL", 
      price: "5.000 FCFA", 
      category: "Voiles", 
      badge: "Maxi XL", 
      image: "/voile 5xl.jpg",
      isNew: true
    },
    { 
      id: 84, 
      name: "Robe de Prière Soyeuse", 
      price: "12.000 FCFA", 
      category: "Voiles", 
      badge: "Tradition", 
      image: "/khimar complet 12000.jpg",
      isNew: true
    },
    { 
      id: 85, 
      name: "Robe de Prière Fluide (Édition Classique)", 
      price: "6.000 FCFA", 
      category: "Voiles", 
      badge: "Essentiel", 
      image: "/hidjab.jpg",
      isNew: false
    },
    { 
      id: 86, 
      name: "Robe de Prière Premium Confort Plus", 
      price: "12.000 FCFA", 
      category: "Voiles", 
      badge: "Prestige", 
      image: "/khimar-complet.jpg",
      isNew: true
    },
    { 
      id: 9, 
      name: "Collant Opaque Extensible Noir Confort", 
      price: "6.000 FCFA", 
      category: "Collant", 
      badge: "Essentiel", 
      image: "/collant.png",
      isNew: false
    },
    { 
      id: 10, 
      name: "Kit Soin et Méditation - bain de pieds", 
      price: "10.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Zen", 
      image: "/bain-de-pied-10000.jpg",
      isNew: true
    },
    { 
      id: 102, 
      name: "Soin Détox Intime Végétal", 
      price: "8.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Pureté", 
      image: "/yoni-detox-6000.jpg",
      isNew: true
    },
    { 
      id: 103, 
      name: "Chapelet de Méditation Artisanal", 
      price: "2.500 FCFA", 
      category: "Soin et méditation", 
      badge: "Spiritualité", 
      image: "/chapelet.jpg",
      isNew: false
    },
    { 
      id: 104, 
      name: "Serviette de Bain Douceur Absolue", 
      price: "6.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Confort", 
      image: "/serviette-bain.jpg",
      isNew: false
    },
    { 
      id: 105, 
      name: "Bain de Pied électrique Hydromassant", 
      price: "6.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Thérapie", 
      image: "/bain-electrique.jpg",
      isNew: true
    },
     { 
      id: 106, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confornt", 
      image: "/collant-court.jpg",
      isNew: true
    },
     { 
      id: 107, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/collant-court1.jpg",
      isNew: true
    },
     { 
      id: 108, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/collant-court3.jpg",
      isNew: true
    },
     { 
      id: 109, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/collant-court6.jpg",
      isNew: true
    },
     { 
      id: 110, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/ensemble-colant.jpg",
      isNew: true
    },
     { 
      id: 111, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/ensemble-colant1.jpg",
      isNew: true
    },
     { 
      id: 112, 
      name: "Culotte Gainante-Ventre Plat ", 
      price: "4.000 FCFA", 
      category: "gaine", 
      badge: "Belle-Forme", 
      image: "/gaine-2-4000.jpg",
      isNew: true
    },
     { 
      id: 113, 
      name: "Corset Gainant ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-abdo.png",
      isNew: true
    },
    { 
      id: 114, 
      name: "Gaine Body ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-body 15000.jpg",
      isNew: true
    },
     { 
      id: 115, 
      name: "Gaine Body ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-body.jpg",
      isNew: true
    },
     { 
      id: 116, 
      name: "Gaine galbant Scuptante-Forme ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/chifoni.jpg",
      isNew: true
    },
    { 
      id: 117, 
      name: "Gaine galbant Scuptante-Forme Transparente ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-transparent.png",
      isNew: true
    },
    { 
      id: 118, 
      name: "Corset Beige ", 
      price: "7.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-ceinture.png",
      isNew: true
    },
    { 
      id: 119, 
      name: "Culotte Gainante", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-4000.jpg",
      isNew: true
    },
    { 
      id: 120, 
      name: "Culotte Gainante ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-2.jpg",
      isNew: true
    },
    { 
      id: 121, 
      name: "Culotte Gainante Remontant Fessier  ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-6.jpg",
      isNew: true
    },
    { 
      id: 122, 
      name: "Culotte Gainante Remontant Fessier", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-7.jpg",
      isNew: true
    },
    { 
      id: 123, 
      name: "Culotte Gainante Galbant ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-8.jpg",
      isNew: true
    },
    { 
      id: 124, 
      name: "Culotte Gainante scuptante-Ventre Plat ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-9.jpg",
      isNew: true
    },
    { 
      id: 125, 
      name: "Culotte Gainante Galtante-Ventre Plat ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-1.jpg",
      isNew: true
    },
    { 
      id: 126, 
      name: "Culotte Gainante Galtante Scuptante ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-culotte.jpg",
      isNew: true
    },
    { 
      id: 127, 
      name: "Culotte Gainante Ventre Plat Scuptant Fessier ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-culotte-bege.jpg",
      isNew: true
    },
    { 
      id: 128, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long.jpg",
      isNew: true
    },
    { 
      id: 129, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long-0.jpg",
      isNew: true
    },
    { 
      id: 130, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long1.jpg",
      isNew: true
    },
    { 
      id: 131, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long2.jpg",
      isNew: true
    },
    { 
      id: 132, 
      name: "Gaine Ceinture-Ventre Plat ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long3.jpg",
      isNew: true
    },
     { 
      id: 133, 
      name: "Gaine Ceinture-Ventre Plat ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long-5.jpg",
      isNew: true
    },
     { 
      id: 134, 
      name: "Gaine Culotte Galbante-Ventre Plat sans trace ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-sculptante.jpg",
      isNew: true
    },
     { 
      id: 135, 
      name: "Gaine Culotte Galbante-Ventre Plat sans trace ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-sculptante-silhouette.jpg",
      isNew: true
    },
     { 
      id: 136, 
      name: "Gaine Culotte Galbante-Ventre Plat sans trace ", 
      price: "6.000 FCFA", 
      category: "nuisette", 
      badge: "Belle-forme", 
      image: "/gaine-sculptante-silhouette.jpg",
      isNew: true
    },
    {
      id: 11,
      name: "Robot Domestique Intuitif & Électroménager Connecté",
      price: "Sur Devis",
      category: "Électroménager",
      badge: "Technologie",
      image: "/electro.jpg",
      isNew: true
    }
  ];

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
                    layout="fill"
                    objectFit="cover"
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
                <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
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
              <div key={i} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between">
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