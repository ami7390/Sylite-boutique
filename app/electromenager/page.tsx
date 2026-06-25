"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ApplianceProduct {
  id: number;
  name: string;
  price: number;
  formattedPrice: string;
  category: string;
  tag?: string;
  badge?: string;
  image: string;
  inStock: boolean;
  specs: {
    power?: string;
    capacity?: string;
    warranty: string;
  };
}

export default function ElectromenagerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [priceFilter, setPriceFilter] = useState<string>("Tous");
  const [stockFilter, setStockFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const applianceCatalog: ApplianceProduct[] = [
    { 
      id: 101, 
      name: "Robot Culinaire Chauffant Connecté Intelligent", 
      price: 245000, 
      formattedPrice: "245.000 FCFA", 
      category: "Cuisine", 
      tag: "Best-Seller", 
      image: "/robot-cuisine.jpg", 
      inStock: true,
      specs: { power: "1500W", capacity: "4.5L", warranty: "2 ans" }
    },
    { 
      id: 102, 
      name: "Friteuse sans Huile Air Fryer XXL Digitale", 
      price: 85000, 
      formattedPrice: "85.000 FCFA", 
      category: "Cuisine", 
      badge: "Healthy", 
      image: "/air-fryer.jpg", 
      inStock: true,
      specs: { power: "1800W", capacity: "6.2L", warranty: "1 an" }
    },
    { 
      id: 103, 
      name: "Aspirateur Balai Robot Autonome Haute Performance", 
      price: 180000, 
      formattedPrice: "180.000 FCFA", 
      category: "Entretien", 
      tag: "Nouveau", 
      image: "/aspirateur-robot.jpg", 
      inStock: true,
      specs: { power: "Automatique", capacity: "0.6L", warranty: "2 ans" }
    },
    { 
      id: 104, 
      name: "Centrifugeuse Extracteur de Jus Lente Premium", 
      price: 42000, 
      formattedPrice: "42.000 FCFA", 
      category: "Cuisine", 
      image: "/extracteur-jus.jpg", 
      inStock: true,
      specs: { power: "250W", capacity: "1.0L", warranty: "1 an" }
    },
    { 
      id: 105, 
      name: "Machine à Café Expresso Broyeur de Grain Connectée", 
      price: 320000, 
      formattedPrice: "320.000 FCFA", 
      category: "Cuisine", 
      badge: "Luxe", 
      image: "/machine-cafe.jpg", 
      inStock: false,
      specs: { power: "1450W", capacity: "1.8L", warranty: "2 ans" }
    },
    { 
      id: 106, 
      name: "Fer à Repasser Centrale Vapeur Haute Pression", 
      price: 65000, 
      formattedPrice: "65.000 FCFA", 
      category: "Entretien", 
      image: "/centrale-vapeur.jpg", 
      inStock: true,
      specs: { power: "2400W", capacity: "1.5L", warranty: "1 an" }
    },
  ];

  const subCategories = [
    { name: "Tous", icon: "🔌" },
    { name: "Cuisine", icon: "🍳" },
    { name: "Entretien", icon: "🧹" },
    { name: "Bien-être", icon: "💨" }
  ];

  const filteredProducts = useMemo(() => {
    let result = [...applianceCatalog];
    if (selectedCategory !== "Tous") result = result.filter(p => p.category === selectedCategory);
    if (priceFilter === "under-50k") result = result.filter(p => p.price < 50000);
    else if (priceFilter === "50k-150k") result = result.filter(p => p.price >= 50000 && p.price <= 150000);
    else if (priceFilter === "over-150k") result = result.filter(p => p.price > 150000);
    if (stockFilter) result = result.filter(p => p.inStock);
    
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [selectedCategory, priceFilter, stockFilter, sortBy]);

  return (
    <div className="bg-neutral-50/60 min-h-screen text-xs selection:bg-purple-500 selection:text-white">
      
      <header className="relative bg-neutral-900 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <Image src="/electro-hero-bg.jpg" alt="Électroménager Moderne" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/40 to-neutral-950" />
        
        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 inline-block">
            L'Art de Vivre Intelligent
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wide">Électroménager & Maison Connectée</h1>
          <p className="text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
            Optimisez votre temps et transformez votre quotidien avec nos appareils de haute technologie. Performance garantie, efficacité énergétique maximale et design ergonomique.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {subCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-4 rounded-2xl border text-center transition-all bg-white flex flex-col items-center gap-2 group ${
                selectedCategory === cat.name ? "border-purple-600 shadow-md ring-1 ring-purple-600" : "border-neutral-200/60 hover:border-neutral-300"
              }`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="font-bold text-neutral-800">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <span>🔌</span> <span className="text-neutral-800 font-bold">{filteredProducts.length}</span> technologies prêtes à l'envoi
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Tri technique :</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="font-bold text-neutral-800 focus:outline-none bg-transparent">
              <option value="featured">Pertinence & Innovation</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
            </select>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 items-start">
          
          <aside className="w-64 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm sticky top-20 hidden lg:block space-y-6">
            <div>
              <h3 className="font-bold text-neutral-900 uppercase tracking-wider mb-3 pb-1 border-b">Budget</h3>
              <div className="space-y-2 text-neutral-600 font-medium">
                <label className="flex items-center gap-2.5 cursor-pointer"><input type="radio" name="price" checked={priceFilter === "Tous"} onChange={() => setPriceFilter("Tous")} className="accent-purple-600" /><span>Tous les prix</span></label>
                <label className="flex items-center gap-2.5 cursor-pointer"><input type="radio" name="price" checked={priceFilter === "under-50k"} onChange={() => setPriceFilter("under-50k")} className="accent-purple-600" /><span>Moins de 50.000 FCFA</span></label>
                <label className="flex items-center gap-2.5 cursor-pointer"><input type="radio" name="price" checked={priceFilter === "5k-150k"} onChange={() => setPriceFilter("5k-150k")} className="accent-purple-600" /><span>50.000 - 150.000 FCFA</span></label>
                <label className="flex items-center gap-2.5 cursor-pointer"><input type="radio" name="price" checked={priceFilter === "over-150k"} onChange={() => setPriceFilter("over-150k")} className="accent-purple-600" /><span>Plus de 150.000 FCFA</span></label>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-neutral-900 uppercase tracking-wider mb-3 pb-1 border-b">Garantie & Normes</h3>
              <label className="flex items-center gap-2.5 cursor-pointer text-neutral-600 font-medium">
                <input type="checkbox" checked={stockFilter} onChange={(e) => setStockFilter(e.target.checked)} className="accent-purple-600 h-4 w-4 rounded" />
                <span>Disponibilité Immédiate</span>
              </label>
            </div>
          </aside>

          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-4 relative group">
                  <button onClick={() => toggleLike(product.id)} className="absolute top-4 right-4 z-20 bg-neutral-100 p-2 rounded-full hover:bg-neutral-200">
                    {likedProducts.includes(product.id) ? "❤️" : "🤍"}
                  </button>

                  <div>
                    <div className="relative aspect-square bg-neutral-50 rounded-xl overflow-hidden mb-4">
                      <Image src={product.image} alt={product.name} fill className="p-4 group-hover:scale-105 transition-transform object-contain" />
                      {product.tag && <span className="absolute top-2 left-2 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">{product.tag}</span>}
                    </div>
                    <span className="text-[10px] text-purple-600 font-bold block uppercase tracking-wider mb-1">{product.category}</span>
                    <h2 className="font-bold text-neutral-800 text-sm line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">{product.name}</h2>
                    
                    <div className="bg-neutral-50 p-2.5 rounded-lg space-y-1 my-3 text-neutral-500">
                      {product.specs.power && <div>⚡ Puissance : <span className="font-semibold text-neutral-700">{product.specs.power}</span></div>}
                      {product.specs.capacity && <div>📦 Capacité : <span className="font-semibold text-neutral-700">{product.specs.capacity}</span></div>}
                      <div>🛡️ Garantie Légale : <span className="font-semibold text-neutral-700">{product.specs.warranty}</span></div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-base font-bold text-neutral-900">{product.formattedPrice}</span>
                    {/* Lien dynamique mis à jour ici */}
                    <Link href={`/electromenager/${product.id}`} className="px-3 py-2 bg-neutral-950 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors">
                      Fiche Produit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <section className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white py-12 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-full border border-amber-500/30 inline-block uppercase tracking-widest text-[9px]">Pack Cuisine Étoilée</span>
            <h3 className="text-2xl sm:text-3xl font-serif">Équipez votre cuisine d'un coup</h3>
            <p className="text-neutral-300 font-light leading-relaxed">
              Associez notre **Robot Culinaire Chauffant** avec l'**Air Fryer XXL** et bénéficiez d'une remise immédiate ainsi que d'une installation certifiée gratuite à votre domicile.
            </p>
            <button className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider rounded-xl transition-all">
              ⚡ Découvrir le Pack Combo
            </button>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm grid grid-cols-2 gap-4">
            <div className="text-center p-2">
              <div className="relative aspect-square w-20 mx-auto">
                <Image src="/robot-cuisine.jpg" alt="Robot Cuisine" fill className="object-contain" />
              </div>
              <p className="font-bold mt-2">Robot Intelligent</p>
            </div>
            <div className="text-center p-2">
              <div className="relative aspect-square w-20 mx-auto">
                <Image src="/air-fryer.jpg" alt="Air Fryer" fill className="object-contain" />
              </div>
              <p className="font-bold mt-2">Air Fryer XXL</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <h3 className="text-xl font-serif font-bold text-center text-neutral-900">Questions Fréquentes — Électroménager</h3>
        <div className="grid gap-4">
          <div className="bg-white p-4 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-800 mb-1">🔌 Les appareils sont-ils compatibles avec le réseau électrique à Bamako ?</h4>
            <p className="text-neutral-500 font-light">Oui, absolument. Tous nos équipements sont configurés pour une tension de 220V-240V avec protection intégrée contre les micro-fluctuations thermiques.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-800 mb-1">🛠️ Comment fonctionne la garantie et le Service Après-Vente (SAV) ?</h4>
            <p className="text-neutral-500 font-light">Chaque appareil dispose d'une garantie constructeur de 1 à 2 ans. En cas de dysfonctionnement, nos équipes techniques interviennent directement chez vous.</p>
          </div>
        </div>
      </section>

      <section className="bg-white border-t py-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-1">
            <div className="text-xl text-purple-600">🚛</div>
            <h4 className="font-bold text-neutral-800 uppercase">Livraison Sécurisée & Montage</h4>
            <p className="text-neutral-500 font-light">Livraison sur rendez-vous partout à Bamako avec déballage devant vous pour vérification de conformité.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xl text-purple-600">🛡️</div>
            <h4 className="font-bold text-neutral-800 uppercase">Garantie Certifiée Or</h4>
            <p className="text-neutral-500 font-light">Échange à neuf ou réparation express sous 72h via notre atelier technique spécialisé.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xl text-purple-600">💬</div>
            <h4 className="font-bold text-neutral-800 uppercase">Assistance Hotline Dédiée</h4>
            <p className="text-neutral-500 font-light">Besoin d'aide pour la première mise en marche ou l'application connectée ? Nos experts répondent en continu.</p>
          </div>
        </div>
      </section>

    </div>
  );
}