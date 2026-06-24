import Image from 'next/image';

export default function NouveauArrivage() {
  // CONFIGURATION INTERNATIONALE DE VOTRE NUMÉRO WHATSAPP
  const WHATSAPP_NUMBER = "22394939380"; 

  // =========================================================================
  // CATALOGUE LOGIQUE ET CENTRALISÉ
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
      price: "7000 FCFA", 
      category: "Gaines", 
      badge: "Populaire", 
      image: "/gaine-ceinture-7000.jpg",
      isNew: false
    },
    { 
      id: 4, 
      name: "Body String Échancré Dos Nu Noir", 
      price: "2000 FCFA", 
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
      image: "/diffuseur.png",
      isNew: true
    },
    { 
      id: 6, 
      name: "Accessoire de Tête - Epingle", 
      price: "1000 FCFA", 
      category: "Accessoire de tête", 
      badge: "Exclusif", 
      image: "/boite-epingles-pour-hijab.jpg",
      isNew: false
    },
    { 
      id: 7, 
      name: "Foulard en Soie Imprimé Satiné Luxe", 
      price: "2000 FCFA", 
      category: "Foulards", 
      badge: "Must-Have", 
      image: "/foulard habiba.jpg",
      isNew: false
    },
    { 
      id: 8, 
      name: "Voile en Mousseline Premium Haute Qualité", 
      price: "2000 FCFA", 
      category: "Voiles", 
      badge: "Nouveau", 
      image: "/muslim 2000.jpg",
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
      price: "10000 FCFA", 
      category: "Soin et méditation", 
      badge: "Zen", 
      image: "/bain-de-pied-10000.jpg",
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
            <h2 className="text-2xl font-serif tracking-wide text-neutral-900 font-bold">Tous nos articles ({allProducts.length})</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Cliquez sur un article pour ouvrir une discussion et finaliser votre achat avec notre équipe.
            </p>
          </div>
          
          <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Commande directe sur WhatsApp au +223 94 93 93 80
          </div>
        </div>
      </div>

      {/* ================= GRANDE GRILLE PRINCIPALE RESPONSIVE ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allProducts.map((product) => {
            // Création du texte pré-rempli pour WhatsApp personnalisé par produit
            const whatsappMessage = `Bonjour, je souhaite commander l'article suivant :\n\n- *Produit :* ${product.name}\n- *Prix :* ${product.price}\n\nEst-il toujours disponible ?`;
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 group flex flex-col relative"
              >
                {/* Badge Nouveau */}
                {product.isNew && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-md z-20 uppercase tracking-widest">
                    Nouveau
                  </div>
                )}

                {/* Conteneur d'image */}
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

                {/* Informations et Actions */}
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
                    
                    {/* LIEN DE COMMANDE VERS VOTRE NUMÉRO */}
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