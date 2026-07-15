"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  // =========================================================================
  // CONFIGURATION CONSTANTES & ÉTATS DYNAMIQUES
  // =========================================================================
  const WHATSAPP_NUMBER = "22394939380";
  
  // État pour le guide des tailles
  const [activeTabSize, setActiveTabSize] = useState<string>("gaines");
  
  // État du compte à rebours pour la Vente Flash
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 34, seconds: 12 }; // Reset automatique
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // =========================================================================
  // ACCÈS CATALOGUE LOGIQUE CENTRALISÉ
  // =========================================================================
  const featuredCollection = [
    { 
      id: 1, 
      name: "Ensemble Femme Chic et Tendance", 
      price: "10.000 FCFA", 
      category: "Ensemble", 
      tag: "Tendance", 
      image: "/ensemble-fleuri.jpg"
    },
    { 
      id: 2, 
      name: "Nuisette en 100% cotton", 
      price: "7.500 FCFA", 
      category: "Nuisette", 
      tag: "Incontournable", 
      image: "/nusette.jpg"
    },
    { 
      id: 3, 
      name: "Gaine Amincissante Ventre Plat Invisible", 
      price: "7.000 FCFA", 
      category: "Gaines", 
      tag: "Populaire", 
      image: "/gaine-ceinture-7000.jpg"
    },
    { 
      id: 4, 
      name: "Body String Échancré Dos Nu Noir", 
      price: "2.000 FCFA", 
      category: "Body", 
      tag: "Nouveau", 
      image: "/body 2000.jpg"
    },
  ];

  const trendingModels = [
    { 
      id: 5, 
      name: "Diffuseur d'Huiles Essentielles Ultrasonique", 
      price: "22.500 FCFA", 
      category: "Humidificateur et diffuseur", 
      badge: "Bien-être", 
      image: "/diffuseur.png"
    },
    { 
      id: 6, 
      name: "Accessoire de Tête - Epingle", 
      price: "1.000 FCFA", 
      category: "Accessoire de tête", 
      badge: "Exclusif", 
      image: "/boite-epingles-pour-hijab.jpg"
    },
    { 
      id: 7, 
      name: "Foulard en Soie Imprimé Satiné Luxe", 
      price: "2.000 FCFA", 
      category: "Foulards", 
      badge: "Must-Have", 
      image: "/foulard habiba.jpg"
    },
    { 
      id: 8, 
      name: "Voile en Mousseline Premium Haute Qualité", 
      price: "2.000 FCFA", 
      category: "Voiles", 
      badge: "Nouveau", 
      image: "/muslim 2000.jpg"
    },
    { 
      id: 9, 
      name: "Collant Opaque Extensible Noir Confort", 
      price: "6.000 FCFA", 
      category: "Collant", 
      badge: "Essentiel", 
      image: "/collant.png"
    },
    { 
      id: 10, 
      name: "Kit Soin et Méditation - bain de pieds", 
      price: "10.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Zen", 
      image: "/bain-de-pied-10000.jpg"
    },
  ];

  return (
    <div className="bg-neutral-50/60 min-h-screen selection:bg-purple-500 selection:text-white">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-purple-950 text-white overflow-visible py-24 sm:py-32 lg:pb-0 lg:pt-32">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl lg:max-w-none pb-12 lg:pb-32 text-center lg:text-left">
            <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4 tracking-wide uppercase">
              Nouvelle Collection Disponible
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif tracking-wide text-white mb-6 leading-tight">
               Élégance Moderne.<br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent italic">Définie.</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Révélez votre éclat unique. Découvrez nos ensembles chic, lingerie sculptante, voiles de haute qualité et essentiels bien-être pensés exclusivement pour la femme moderne.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="/collection" className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 z-20 relative">
                Découvrir la Collection
              </a>
            </div>
          </div>
          <div className="hidden lg:block h-[500px]"></div>
        </div>
        
        {/* DEUX IMAGES SUPERPOSÉES STYLE LOOKBOOK DE MODE */}
        <div className="absolute bottom-0 right-0 z-10 hidden lg:block w-[50%] h-full max-h-[100%] overflow-visible">
          
          {/* Image Principale Arrière-plan (ouverture.png) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image 
              src="/ouverture.png"
              alt="Boutique de mode en ligne et articles de bien-être pour femme"
              layout="fill"
              objectFit="cover"
              objectPosition="bottom right"
              priority
              quality={100}
              unoptimized
            />
          </div>

          {/* Deuxième Image Flottante Avant-plan - AGRANDIE ICI (w-64 h-80 au lieu de w-56 h-72) */}
          <div className="absolute bottom-12 left-6 w-64 h-80 rounded-2xl overflow-hidden border-4 border-neutral-950 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <Image 
              src="/ouverture-1.png"
              alt="Focus Collection Sylite"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

        </div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl hidden lg:block z-0" />
      </section>

      {/* ================= BENTO GRID DES UNIVERS CATÉGORIES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block mb-2">Parcourez par Univers</span>
          <h2 className="text-2xl font-serif font-bold text-neutral-900">Les Piliers de notre Vestiaire</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {/* Bloc 1: Prêt-à-porter */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group bg-neutral-900 border border-neutral-100 shadow-sm">
            <Image src="/ensemble-fleuri.jpg" alt="Prêt-à-porter" layout="fill" objectFit="cover" className="brightness-75 group-hover:scale-102 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 z-10">
              <h3 className="text-xl font-bold text-white font-serif">Ensembles & Robes Chic</h3>
              <p className="text-xs text-neutral-200 mt-1 font-light">Des coupes fluides et raffinées pour toutes vos occasions.</p>
              <a href="/nouvel-arrivage" className="text-xs text-purple-300 font-bold mt-4 inline-flex items-center gap-1 group-hover:text-purple-400 transition-colors">Explorer l'univers →</a>
            </div>
          </div>

          {/* Bloc 2: Lingerie Fine */}
          <div className="md:col-span-2 rounded-3xl overflow-hidden relative group bg-neutral-900 border border-neutral-100 shadow-sm">
            <Image src="/nusette.jpg" alt="Lingerie" layout="fill" objectFit="cover" className="brightness-75 group-hover:scale-102 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 z-10">
              <h3 className="text-base font-bold text-white font-serif">Lingerie & Nuisettes</h3>
              <a href="/nouvel-arrivage" className="text-xs text-purple-300 font-bold mt-1 inline-block">Voir les pièces →</a>
            </div>
          </div>

          {/* Bloc 3: Gaines Amincissantes */}
          <div className="rounded-3xl overflow-hidden relative group bg-neutral-900 border border-neutral-100 shadow-sm">
            <Image src="/gaine-ceinture-7000.jpg" alt="Gaines" layout="fill" objectFit="cover" className="brightness-75 group-hover:scale-102 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 z-10">
              <h3 className="text-sm font-bold text-white font-serif">Gaines & Invisible</h3>
              <a href="/nouvel-arrivage" className="text-xs text-purple-300 font-bold mt-1 inline-block">Découvrir →</a>
            </div>
          </div>

          {/* Bloc 4: Bien-être & Maison */}
          <div className="rounded-3xl overflow-hidden relative group bg-neutral-900 border border-neutral-100 shadow-sm">
            <Image src="/diffuseur.png" alt="Bien être" layout="fill" objectFit="cover" className="brightness-75 group-hover:scale-102 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 z-10">
              <h3 className="text-sm font-bold text-white font-serif">Soin & Diffuseurs</h3>
              <a href="/nouvel-arrivage" className="text-xs text-purple-300 font-bold mt-1 inline-block">S'équiper →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SELECTION FLASH LIMITÉE (FOMO) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-red-950 via-neutral-950 to-neutral-950 rounded-3xl p-8 border border-red-900/30 shadow-lg text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-neutral-900 text-9xl font-black select-none pointer-events-none opacity-20">SALE</div>
          
          <div className="space-y-4 text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-[10px] uppercase rounded-md tracking-wider">
              ⚡ Offre Flash Limitée
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif">La Gaine Ceinture Sculptante</h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-light">
              Profitez d'un tarif préférentiel exclusif sur nos pièces de maintien corporel haut de gamme avant rupture définitive de notre stock de la semaine.
            </p>
            
            {/* Compte à Rebours Visuel */}
            <div className="flex justify-center lg:justify-start gap-3 pt-2 text-neutral-100">
              <div className="flex flex-col items-center bg-neutral-900/90 border border-neutral-800 px-3 py-2 rounded-xl min-w-[60px]">
                <span className="text-lg font-black text-red-400">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[9px] uppercase text-neutral-400 tracking-wider">Heures</span>
              </div>
              <div className="flex flex-col items-center bg-neutral-900/90 border border-neutral-800 px-3 py-2 rounded-xl min-w-[60px]">
                <span className="text-lg font-black text-red-400">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[9px] uppercase text-neutral-400 tracking-wider">Min</span>
              </div>
              <div className="flex flex-col items-center bg-neutral-900/90 border border-neutral-800 px-3 py-2 rounded-xl min-w-[60px]">
                <span className="text-lg font-black text-red-400">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[9px] uppercase text-neutral-400 tracking-wider">Sec</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 w-full lg:w-auto justify-end">
            <div className="text-center sm:text-right">
              <div className="text-xs text-neutral-400 line-through">12.000 FCFA</div>
              <div className="text-3xl font-black text-white">7.000 FCFA</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-1">Économie immédiate de 5.000 FCFA</div>
            </div>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour SYLITE, je souhaite bénéficier de la Vente Flash sur la Gaine Amincissante Ventre Plat Invisible à 7.000 FCFA.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 transition-colors text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md w-full sm:w-auto text-center"
            >
              💥 Réserver sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ================= SELECTION PHARE (FEATURED) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center md:text-left md:flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif tracking-wide text-neutral-900 font-bold">Sélection Phare</h2>
            <div className="w-12 h-1 bg-purple-600 mt-3 mx-auto md:mx-0 rounded-full"></div>
          </div>
          <p className="text-neutral-500 text-sm mt-4 md:mt-0 max-w-sm mx-auto md:mx-0 leading-relaxed font-light">
            Les indispensables mode, lingerie fine et gaines amincissantes sélectionnés pour vous.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCollection.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 group flex flex-col">
              <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                  {product.tag}
                </span>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-xs text-neutral-400 font-medium block mb-1">{product.category}</span>
                  <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-50">
                  <div className="text-base font-bold text-neutral-900 mb-3">{product.price}</div>
                  <a 
                    href={`/options?id=${product.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-sm shadow-purple-600/10 z-20 relative"
                  >
                    Voir les options d'articles
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GUIDE INTERACTIF DES TAILLES ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-8 bg-white border border-neutral-200/60 rounded-3xl shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block mb-2">Conseil Morphologie</span>
          <h3 className="text-xl font-serif font-bold text-neutral-900">Trouvez votre taille parfaite</h3>
          <p className="text-xs text-neutral-500 font-light mt-1">Suivez notre tableau synthétique pour commander l'esprit serein par messagerie.</p>
        </div>

        <div className="flex justify-center gap-2 mb-6 border-b border-neutral-100 pb-3">
          <button 
            onClick={() => setActiveTabSize("gaines")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTabSize === "gaines" ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-800"}`}
          >
            Gaines & Corsets
          </button>
          <button 
            onClick={() => setActiveTabSize("pret-a-porter")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTabSize === "pret-a-porter" ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-800"}`}
          >
            Ensembles Femme
          </button>
        </div>

        <div className="overflow-x-auto text-xs">
          {activeTabSize === "gaines" ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 text-neutral-600 font-bold border-b border-neutral-200">
                  <th className="p-3">Taille Recommandée</th>
                  <th className="p-3">Tour de Taille (cm)</th>
                  <th className="p-3">Poids Cible (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                <tr><td className="p-3 font-semibold text-neutral-900">M</td><td className="p-3">65 - 75 cm</td><td className="p-3">50 - 62 kg</td></tr>
                <tr className="bg-neutral-50/40"><td className="p-3 font-semibold text-neutral-900">L</td><td className="p-3">76 - 85 cm</td><td className="p-3">63 - 74 kg</td></tr>
                <tr><td className="p-3 font-semibold text-neutral-900">XL</td><td className="p-3">86 - 95 cm</td><td className="p-3">75 - 85 kg</td></tr>
                <tr className="bg-neutral-50/40"><td className="p-3 font-semibold text-neutral-900">XXL / 3XL</td><td className="p-3">96 - 110 cm</td><td className="p-3">86 - 105 kg</td></tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 text-neutral-600 font-bold border-b border-neutral-200">
                  <th className="p-3">Taille Standard</th>
                  <th className="p-3">Équivalence (FR/Mali)</th>
                  <th className="p-3">Silhouette Recommandée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                <tr><td className="p-3 font-semibold text-neutral-900">Unique (Ajustable)</td><td className="p-3">Du 36 au 44</td><td className="p-3">S'adapte fluidement aux courbes</td></tr>
                <tr className="bg-neutral-50/40"><td className="p-3 font-semibold text-neutral-900">XL / 3XL (Voiles)</td><td className="p-3">Ample / Maxi</td><td className="p-3">Couvrance intégrale élégante</td></tr>
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* ================= SECTION AVANTAGES ================= */}
      <section className="bg-white border-t border-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 text-xl">✨</div>
              <h3 className="text-sm font-bold text-neutral-800 mb-2 uppercase tracking-wider">Qualité Premium</h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">Chaque vêtement, accessoire et produit de soin est rigoureusement sélectionné pour son efficacité et ses finitions.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 text-xl">👠</div>
              <h3 className="text-sm font-bold text-neutral-800 mb-2 uppercase tracking-wider">Style Tendance</h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">Une sélection exclusive en phase avec les tendances actuelles de la mode et du bien-être.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 text-xl">👩‍💼</div>
              <h3 className="text-sm font-bold text-neutral-800 mb-2 uppercase tracking-wider">Service Client Dédié</h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">Notre équipe vous accompagne au quotidien pour vous offrir une expérience d'achat personnalisée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NOUVEAUX MODÈLES & TENDANCES ================= */}
      <section className="bg-neutral-950 text-white py-20 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 text-center md:text-left">
            <div>
              <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-2">Les Tendances du Moment</span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-wide font-light">
                Nouveautés Mode <span className="text-purple-400 italic font-normal">& Univers Bien-être</span>
              </h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm mx-auto md:mx-0 font-light leading-relaxed">
              Explorez notre gamme complète : accessoires raffinés, diffuseurs d'ambiance, voiles et soins conçus pour sublimer votre quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingModels.map((model) => (
              <div key={model.id} className="group relative flex flex-col justify-between bg-neutral-900/40 rounded-2xl overflow-hidden border border-neutral-800/60 hover:border-purple-900/60 transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                  <Image 
                    src={model.image} 
                    alt={model.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-102 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                  <span className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md text-purple-400 text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider border border-purple-500/20 z-10">
                    {model.badge}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-xs text-purple-400 font-medium tracking-wide block mb-1">{model.category}</span>
                  <h3 className="text-base font-medium text-neutral-100 mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {model.name}
                  </h3>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-800/60 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold tracking-wider text-neutral-200">{model.price}</span>
                      <a 
                        href={`/options?id=${model.id}`}
                        className="text-xs font-medium text-purple-400 group-hover:text-purple-300 inline-flex items-center gap-1 transition-all"
                      >
                        Voir les options <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </a>
                    </div>
                    <a 
                      href="/nouvel-arrivage"
                      className="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all duration-200 hover:-translate-y-0.5 z-20 relative block"
                    >
                      Découvrir les modèles
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL EDITORIAL SPLIT-SCREEN ================= */}
      <section className="relative bg-neutral-950 text-white overflow-hidden border-t border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[600px]">
          <div className="relative h-[380px] sm:h-[480px] lg:h-full w-full bg-neutral-950 group overflow-hidden self-stretch">
            <Image 
              src="/electro.jpg" 
              alt="Gamme d'appareils électroménagers modernes et d'équipements de maison internes" 
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-1000 scale-100 group-hover:scale-102 filter brightness-90 group-hover:brightness-100"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent z-10" />
          </div>

          <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center space-y-8 bg-gradient-to-br from-neutral-900 to-neutral-950">
            <div>
              <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-3">
                L'Art de Vivre Intelligent
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide leading-tight">
                L'importance de l’électroménager <br />
                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent italic font-normal">moderne dans votre quotidien</span>
              </h2>
              <div className="w-16 h-1 bg-purple-500 mt-4 rounded-full"></div>
            </div>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                À l’ère de la <strong className="text-white font-medium">maison connectée</strong>, optimiser son temps est devenu un art. Choisir un <strong className="text-purple-400 font-medium">électroménager haut de gamme</strong> et moderne, ce n'est pas seulement moderniser son espace : c'est s'offrir un <strong className="text-white font-medium">gain de temps</strong> précieux et une efficacité inégalée au quotidien.
              </p>
              <p>
                Nos solutions de <strong className="text-white font-medium">robotique domestique</strong> et appareils internes intelligents allient une <strong className="text-purple-400 font-medium">efficacité énergétique</strong> optimale à une esthétique minimaliste épurée.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80">
              <h3 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-3">Nos piliers d'innovation :</h3>
              <div className="flex flex-wrap gap-2">
                {["Design Minimaliste", "Économie d'Énergie", "Appareils Connectés", "Gain de Temps Éprouvé", "Performance Silencieuse"].map((keyword, i) => (
                  <a 
                    key={i} 
                    href="/electromenager" 
                    className="text-[11px] bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-md text-neutral-400 hover:border-purple-900/50 hover:text-purple-300 transition-colors duration-200"
                  >
                    {keyword}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="/electromenager" 
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase rounded-xl bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-900/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Découvrir la Gamme
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
