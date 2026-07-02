"use client";

import ImageUpload from '@/components/ImageUpload';
import LoginModal from '@/components/loginmodal';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseclient';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image_url: string;
  created_at?: string;
}

export default function NouveauArrivage() {
  const WHATSAPP_NUMBER = "22394939380"; 

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  
  // ÉTATS POUR L'AUTHENTIFICATION SECURE
  const [user, setUser] = useState<any>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 1. Vérifier si un gestionnaire est déjà connecté au chargement de la page
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    
    checkUser();

    // Écouter les changements d'état (connexion / déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fonction pour récupérer les produits depuis Supabase
  const fetchSupabaseProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupabaseProducts();
  }, []);

  // Déconnexion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    alert("Vous avez été déconnecté.");
  };

  // Suppression d'un produit
  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer cet article définitivement ?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const { error: dbError } = await (supabase as any)
        .from('products')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      setProducts(prev => prev.filter(product => product.id !== id));
      alert("L'article a bien été supprimé !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    } finally {
      setDeletingId(null);
    }
  };

  const categories = ["Tous", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === "Tous" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const specialRequestMessage = `Bonjour SYLITE, je regarde vos nouveaux arrivages mais je recherche un article spécifique qui n'est pas listé sur la page. Pouvez-vous m'aider ?`;
  const specialRequestUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(specialRequestMessage)}`;

  return (
    <div className="bg-neutral-50 min-h-screen antialiased">
      
      {/* ================= BARRE DE CONTRÔLE AUTHENTIFIÉE ================= */}
      <div className="bg-neutral-950 text-white py-2 px-4 flex justify-between items-center text-xs border-b border-neutral-800">
        <span className="text-neutral-400 font-light">
          {user ? `⚡ Connecté en tant que : ${user.email}` : "✨ Espace Boutique SyLite"}
        </span>
        
        {user ? (
          <button 
            onClick={handleLogout}
            className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-md font-medium hover:bg-red-600 hover:text-white transition-all"
          >
            🔒 Se déconnecter
          </button>
        ) : (
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="px-3 py-1 bg-purple-600 text-white rounded-md font-bold hover:bg-purple-700 transition-all shadow-sm"
          >
            🛠️ Connexion Gestionnaire
          </button>
        )}
      </div>

      {/* ================= MODAL DE CONNEXION ================= */}
      {isLoginModalOpen && (
        <LoginModal 
          onLoginSuccess={fetchSupabaseProducts} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      )}

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

      {/* Zone d'upload visible UNIQUEMENT si l'utilisateur est connecté */}
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 p-6 bg-purple-50 border border-purple-200 rounded-2xl shadow-inner animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="mb-4">
            <h4 className="text-sm font-bold text-purple-900">Panel d'ajout d'articles</h4>
            <p className="text-xs text-purple-700">Ajoutez un nouveau modèle à la grille en temps réel.</p>
          </div>
          <ImageUpload />
          <div className="mt-4 text-center">
            <button 
              onClick={fetchSupabaseProducts} 
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-sm"
            >
              🔄 Synchroniser la liste
            </button>
          </div>
        </div>
      )}

      {/* ================= CONTEXTE ET FILTRES ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <h2 className="text-2xl font-serif tracking-wide text-neutral-900 font-bold">
              Tous nos articles ({loading ? "..." : filteredProducts.length})
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Cliquez sur un article pour ouvrir une discussion et finaliser votre achat avec notre équipe.
            </p>
          </div>
          
          <div className="text-xs font-medium text-emerald-700 bg-emerald-50/80 border border-emerald-200 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 self-start md:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Commande directe sur WhatsApp au +223 94 93 93 80
          </div>
        </div>

        {/* Boutons Filtres */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-medium rounded-full border transition-all duration-300 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-600/30"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-purple-300 hover:text-purple-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= GRILLE PRODUITS ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="text-center py-20 text-neutral-400 text-sm font-light tracking-wide">
            Chargement de l'univers SyLite...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-neutral-400 text-sm font-light">
            Aucun modèle disponible dans cette catégorie pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => {
              const whatsappMessage = `Bonjour SYLITE, je souhaite commander l'article suivant des nouveaux arrivages :\n\n- *Produit :* ${product.name}\n- *Prix :* ${product.price}\n\nEst-il disponible dans vos stocks actuels ?`;
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

              return (
                <div 
                  key={product.id} 
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden w-full">
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[9px] font-bold tracking-widest px-2.5 py-1 rounded shadow-md z-20 uppercase">
                      Nouveau
                    </div>

                    <Image 
                      src={product.image_url || '/placeholder.jpg'} 
                      alt={product.name}
                      fill
                      sizes="(max-w-640px) 100vw, (max-w-768px) 50vw, (max-w-1024px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className="transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    <span className="absolute bottom-3 left-3 bg-neutral-950/70 backdrop-blur-md text-white text-[9px] font-medium tracking-wider px-2 py-0.5 rounded border border-white/10 z-10 uppercase">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between bg-white">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-neutral-800 line-clamp-2 min-h-[40px] group-hover:text-purple-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <div className="text-base font-bold text-neutral-900 tracking-tight">
                        {product.price}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2">
                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 text-xs font-semibold rounded-xl bg-neutral-900 text-white hover:bg-purple-700 transition-all duration-300 shadow-sm"
                      >
                        Commander via WhatsApp
                      </a>

                      {/* LE BOUTON SUPPRIMER URBAIN (VISIBLE UNIQUEMENT SI CONNECTÉ) */}
                      {user && (
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={deletingId === product.id}
                          className="w-full inline-flex justify-center items-center px-4 py-2 text-xs font-bold rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 transition-all duration-300 disabled:opacity-50"
                        >
                          {deletingId === product.id ? "Suppression..." : "🗑️ Supprimer cet article"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Le reste de ton pied de page reste inchangé... */}
    </div>
  );
}