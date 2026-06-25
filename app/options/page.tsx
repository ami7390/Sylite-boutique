"use client";

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function OptionsPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const WHATSAPP_NUMBER = "22394939380";

  // Base de données unifiée (identique à ta page d'accueil pour retrouver les correspondances)
  const allProducts = [
    { 
      id: 1, 
      name: "Ensemble Femme Chic et Tendance", 
      category: "Ensemble", 
      subCategories: [
        { name: "Ensemble Pantalon", price: "75.000 FCFA", image: "/ensemble-pantalon.jpg" },
        { name: "Ensemble Jupe", price: "65.000 FCFA", image: "/ensemble-jupe.jpg" },
        { name: "Jupe Simple", price: "25.000 FCFA", image: "/jupe-simple.jpg" },
        { name: "Robe de Soirée Chic", price: "85.000 FCFA", image: "/robe-chic.jpg" }
      ]
    },
    { 
      id: 2, 
      name: "Nuisette en 100% cotton", 
      category: "Nuisette", 
      subCategories: [
        { name: "Nuisette 100% Coton", price: "45.000 FCFA", image: "/nusette.jpg" }
      ]
    },
    { 
      id: 3, 
      name: "Gaine Amincissante Ventre Plat Invisible", 
      category: "Gaines", 
      subCategories: [
        { name: "Gaine Ceinture", price: "7.000 FCFA", image: "/gaine-ceinture-7000.jpg" },
        { name: "Gaine Corps", price: "15.000 FCFA", image: "/gaine-corps.jpg" },
        { name: "Gaine Body", price: "12.000 FCFA", image: "/gaine-body.jpg" },
        { name: "Gaine Transparente", price: "10.000 FCFA", image: "/gaine-transparente.jpg" },
        { name: "Gaine Long", price: "18.000 FCFA", image: "/gaine-long.jpg" },
        { name: "Ceinture Vibrante", price: "25.000 FCFA", image: "/ceinture-vibrante.jpg" },
        { name: "Massage Abdo", price: "20.000 FCFA", image: "/massage-abdo.jpg" }
      ]
    },
    { 
      id: 4, 
      name: "Body String Échancré Dos Nu Noir", 
      category: "Body", 
      subCategories: [
        { name: "Body String Dos Nu", price: "2.000 FCFA", image: "/body 2000.jpg" },
        { name: "Les Cols Roulés", price: "4.000 FCFA", image: "/col-roule.jpg" },
        { name: "Crop-Top Tendance", price: "2.000 FCFA", image: "/crop-top.jpg" }
      ]
    },
   { 
      id: 5, 
      name: " Diffuseur d'Huiles Essentielles Ultrasonique", 
      price: "22.500 FCFA", 
      category: "Humidificateur et diffuseur", 
      badge: "Bien-être", 
      image: "/diffuseur.png",
      subCategories: [
        { name: "Diffuseur d'Huiles Essentielles", price: "22.500 FCFA", image: "/diffuseur.png" },
        { name: "Diffuseur d'Huiles Essentielles Small", price: "8.000 FCFA", image: "/diffuseur 8000.jpg" },
        { name: "Diffuseur d'Huiles Essentielles Mini", price: "7.500 FCFA", image: "/humidificateur-7500.jpg" },
        { name: "Diffuseur d'Huiles Essentielles Premium", price: "20.000 FCFA", image: "/humidificateur-20000.png" }
      ]
    },
    { 
      id: 6, 
      name: "Accessoire de Tête - Epingle", 
      category: "Accessoire de tête", 
      subCategories: [
        { name: "Barette Stylisée", price: "1.000 FCFA", image: "/barette.jpg" },
        { name: "Bonnet de Maintien", price: "1.500 FCFA", image: "/bonnet.jpg" },
        { name: "Épingle Premium", price: "1.000 FCFA", image: "/boite-epingles-pour-hijab.jpg" }
      ]
    },
    { 
      id: 7, 
      name: "Foulard en Soie Imprimé Satiné Luxe", 
      category: "Foulards", 
      subCategories: [
        { name: "Foulard Silk", price: "2.000 FCFA", image: "/foulard habiba.jpg" }
      ]
    },
   { 
      id: 8, 
      name: "Voile en Mousseline Premium Haute Qualité", 
      price: "2000 FCFA", 
      category: "Voiles", 
      badge: "Nouveau", 
      image: "/muslim 2000.jpg",
      subCategories: [
        { name: "Voile 3XL", price: "3.500 FCFA", image: "/voile-3xl.jpg" },
        { name: "Voile 5XL", price: "5.000 FCFA", image: "/voile-5xl.jpg" },
        { name: "Robe de Prière", price: "15.000 FCFA", image: "/khimar.jpg" },
        { name: "Robe de Prière Variant 2", price: "6.000 FCFA", image: "/hidjab.jpg" },
        { name: "Robe de Prière Variant 3", price: "12.000 FCFA", image: "/khimar-premium.jpg" }
      ]
    },
    { 
      id: 9, 
      name: "Collant Opaque Extensible Noir Confort", 
      category: "Collant", 
      subCategories: [
        { name: "Collant Opaque Noir", price: "6.000 FCFA", image: "/collant.png" }
      ]
    },
   { 
      id: 10, 
      name: "Kit Soin et Méditation - bain de pieds", 
      price: "10000 FCFA", 
      category: "Soin et méditation", 
      badge: "Zen", 
      image: "/bain-de-pied-10000.jpg",
      subCategories: [
        { name: "Détox Intime", price: "8.000 FCFA", image: "/bain-de-siege.jpg" },
         { name: "Détox Intime", price: "8.000 FCFA", image: "/yoni-detox-6000.jpg" },
        { name: "Chapelet de Méditation", price: "2.500 FCFA", image: "/chapelet.jpg" },
        { name: "Bain de Pieds Relaxant", price: "10.000 FCFA", image: "/bain-de-pied-10000.jpg" },
        { name: "Serviette de Bain Ultra Douce", price: "6.000 FCFA", image: "/serviette-bain.jpg" },
        { name: "Bain de pied électrique Ultra Douce", price: "6.000 FCFA", image: "/bain-electrique.jpg" }
      ]
    },
  ];

  // Trouver le produit sélectionné
  const currentProduct = allProducts.find(p => p.id === Number(productId));

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <p className="text-neutral-400 mb-4">Aucun produit sélectionné ou trouvé.</p>
        <a href="/" className="px-6 py-2 bg-purple-600 rounded-xl text-xs font-semibold">Retour à l'accueil</a>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de la page */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-800 pb-8 mb-12 gap-4">
          <div>
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-1">
              {currentProduct.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif tracking-wide">{currentProduct.name}</h1>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2">Sélectionnez la variante de votre choix pour passer commande.</p>
          </div>
          <a 
            href="/" 
            className="text-xs font-semibold bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 px-4 py-2.5 rounded-xl transition-all text-neutral-300"
          >
            ← Retour à la boutique
          </a>
        </div>

        {/* Grille des sous-catégories / options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProduct.subCategories.map((sub, idx) => {
            const message = `Bonjour SYLITE, je souhaite commander l'article suivant :\n\n- *Article :* ${sub.name}\n- *Tarif :* ${sub.price}\n\nEst-il disponible dans vos stocks actuels ?`;
            const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            return (
              <div 
                key={idx} 
                className="bg-neutral-900/50 rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-purple-900/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                    <Image 
                      src={sub.image} 
                      alt={sub.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-medium text-neutral-100 tracking-wide">{sub.name}</h3>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-purple-300">{sub.price}</span>
                    <a 
                      href={urlWhatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-900/20"
                    >
                      💬 Commander
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}