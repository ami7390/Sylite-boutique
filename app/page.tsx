import Image from 'next/image';

export default function Home() {
  // =========================================================================
  // 1. GRILLE : FEATURED COLLECTION (Visuels ciblés)
  // =========================================================================
  const featuredCollection = [
    { 
      id: 1, 
      name: "Ensemble Femme Chic et Tendance", 
      price: "75.000 FCFA", 
      category: "Ensemble", 
      tag: "Tendance", 
      image: "/ensemble-fleuri.jpg" 
    },
    { 
      id: 2, 
      name: "Nuisette en 100% cotton", 
      price: "45.000 FCFA", 
      category: "Nuisette", 
      tag: "Incontournable", 
      image: "/nusette.jpg" 
    },
    { 
      id: 3, 
      name: "Gaine Amincissante Ventre Plat Invisible", 
      price: "7000 FCFA", 
      category: "Gaines", 
      tag: "Populaire", 
      image: "/gaine-ceinture-7000.jpg" 
    },
    { 
      id: 4, 
      name: "Body String Échancré Dos Nu Noir", 
      price: "2000 FCFA", 
      category: "Body", 
      tag: "Nouveau", 
      image: "/body 2000.jpg" 
    },
  ];

  // =========================================================================
  // 2. GRILLE : NOUVEAUX MODÈLES & TENDANCES (Visuels ciblés)
  // =========================================================================
  const trendingModels = [
    { 
      id: 5, 
      name: " Diffuseur d'Huiles Essentielles Ultrasonique", 
      price: "22.500 FCFA", 
      category: "Humidificateur et diffuseur", 
      badge: "Bien-être", 
      image: "/diffuseur.png" 
    },
    { 
      id: 6, 
      name: "Accessoire de Tête  - Epingle", 
      price: "1000 FCFA", 
      category: "Accessoire de tête", 
      badge: "Exclusif", 
      image: "/boite-epingles-pour-hijab.jpg" 
    },
    { 
      id: 7, 
      name: "Foulard en Soie Imprimé Satiné Luxe", 
      price: "2000 FCFA", 
      category: "Foulards", 
      badge: "Must-Have", 
      image: "/foulard habiba.jpg" 
    },
    { 
      id: 8, 
      name: "Voile en Mousseline Premium Haute Qualité", 
      price: "2000 FCFA", 
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
      price: "10000 FCFA", 
      category: "Soin et méditation", 
      badge: "Zen", 
      image: "/bain-de-pied-10000.jpg" 
    },
  ];

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-purple-950 text-white overflow-visible py-24 sm:py-32 lg:pb-0 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="max-w-2xl lg:max-w-none pb-12 lg:pb-32 text-center lg:text-left">
            <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4 tracking-wide uppercase">
              Nouvelle Collection
            </span>

            <h1 className="text-4xl sm:text-6xl font-serif tracking-wide text-white mb-6 leading-tight">
               Élégance Moderne.<br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent italic">Defined.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Révélez votre éclat unique. Découvrez nos ensembles chic, lingerie sculptante, voiles de qualité et essentiels bien-être pensés exclusivement pour la femme moderne.
            </p>
            
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="/collection" className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 z-20 relative">
                Shop Collection
              </a>
            </div>
          </div>

          <div className="hidden lg:block h-[500px]"></div>
        </div>
        
        <div className="absolute bottom-0 right-0 z-10 hidden lg:block w-[45%] h-full max-h-[100%] overflow-hidden">
          <Image 
            src="/shopping-removebg-preview.png"
            alt="Boutique de mode en ligne et articles de bien-être pour femme"
            layout="fill"
            objectFit="contain"
            objectPosition="bottom right"
            priority
          />
        </div>

        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl hidden lg:block z-0" />
      </section>

      {/* ================= FEATURED COLLECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-neutral-50/50">
        
        <div className="text-center md:text-left md:flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif tracking-wide text-neutral-900 font-bold">Featured Collection</h2>
            <div className="w-12 h-1 bg-purple-600 mt-3 mx-auto md:mx-0 rounded-full"></div>
          </div>
          <p className="text-neutral-500 text-sm mt-4 md:mt-0 max-w-sm mx-auto md:mx-0 leading-relaxed">
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
                  <a href={`/collection/${product.id}`} className="w-full inline-flex justify-center items-center px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-sm shadow-purple-600/10 z-20 relative">
                    View Details
                  </a>
                </div>
              </div>

            </div>
          ))}
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
              <h3 className="text-sm font-bold text-neutral-800 mb-2 uppercase tracking-wider">Style Curated</h3>
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
                      <a href={`/collection/${model.id}`} className="text-xs font-medium text-purple-400 group-hover:text-purple-300 inline-flex items-center gap-1 transition-all">
                        Découvrir l'article
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </a>
                    </div>
                    
                    <a 
                      href="/nouveau-arrivage" 
                      className="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all duration-200 hover:-translate-y-0.5 z-20 relative"
                    >
                      Acheter maintenant
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FINAL EDITORIAL SPLIT-SCREEN (UN SEUL BOUTON À DROITE) ================= */}
      <section className="relative bg-neutral-950 text-white overflow-hidden border-t border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[600px]">
          
          {/* Bloc de Gauche : Grande Image de Couverture (/electro.jpg) */}
          <div className="relative h-[380px] sm:h-[480px] lg:h-full w-full bg-neutral-950 group overflow-hidden self-stretch">
            <Image 
              src="/electro.jpg" 
              alt="Gamme d'appareils électroménagers modernes et d'équipements de maison internes" 
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-1000 scale-100 group-hover:scale-102 filter brightness-90 group-hover:brightness-100"
              priority
            />
            {/* Dégradé CSS pour garantir la lisibilité textuelle sur les petits écrans */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent z-10" />
          </div>

          {/* Bloc de Droite : Argumentaire Optimisé SEO & Unique Bouton d'Action */}
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
                Nos solutions de <strong className="text-white font-medium">robotique domestique</strong> et appareils internes intelligents allient une <strong className="text-purple-400 font-medium">efficacité énergétique</strong> optimale à une esthétique minimaliste épurée. Ils s'intègrent à votre décor tout en simplifiant chaque tâche ménagère, vous permettant de vous concentrer sur ce qui compte vraiment : votre bien-être.
              </p>
            </div>

            {/* Maillage Sémantique Interne (SEO) */}
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

            {/* LE SEUL ET UNIQUE BOUTON DEMANDÉ */}
            <div className="pt-2">
              <a 
                href="/electromenager" 
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase rounded-xl bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-900/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Découvrir la Gamme Connectée
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}