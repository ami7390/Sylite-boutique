"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseclient";
// @ts-ignore
import { allProducts } from "@/app/data/products";

export default function NouvelArrivagePage() {
  const WHATSAPP_NUMBER = "22394939380";
  
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Sécurité d'hydratation
  const [mounted, setMounted] = useState(false);

  // États pour l'authentification officielle Supabase
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Dictionnaire de nettoyage et de fusion centralisé des doublons
  const categoryCorrections: { [key: string]: string } = {
    "gaine": "Gaines",
    "gaines": "Gaines",
    "soin et meditation": "Soin et méditation",
    "soin et méditation": "Soin et méditation",
    "soins et méditation": "Soin et méditation",
    "meditation": "Soin et méditation",
    "méditation": "Soin et méditation",
    // Fusion explicite de l'Électroménager pour regrouper tout le contenu
    "electromenager": "Électroménager",
    "électroménager": "Électroménager",
    "electroménager": "Électroménager",
    "électromenager": "Électroménager"
  };

  useEffect(() => {
    setMounted(true);

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAdminAuthenticated(true);
      }
    };
    checkUser();

    const fetchDbProducts = async () => {
      try {
        const { data, error } = await (supabase as any).from("products").select("*");
        if (!error && data) {
          setDbProducts(data);
        }
      } catch (err) {
        console.error("Erreur de synchro header :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDbProducts();
  }, [refreshKey]);

  const localItems = Array.isArray(allProducts) ? allProducts : [];
  const fullListForStats = [...dbProducts, ...localItems];

  // Génération de la liste unique des catégories nettoyées
  const categories = [
    "Tous",
    ...Array.from(
      new Set(
        fullListForStats
          .map((p) => {
            if (!p.category) return "";
            const normalizedLower = p.category.trim().toLowerCase();
            if (categoryCorrections[normalizedLower]) {
              return categoryCorrections[normalizedLower];
            }
            return normalizedLower.charAt(0).toUpperCase() + normalizedLower.slice(1);
          })
          .filter(Boolean)
      )
    )
  ];

  const limitedStockProducts = localItems.slice(0, 3);

  const displayCount = selectedCategory === "Tous" 
    ? fullListForStats.length 
    : fullListForStats.filter(p => {
        if (!p.category) return false;
        const norm = p.category.trim().toLowerCase();
        const currentMapped = categoryCorrections[norm] || (norm.charAt(0).toUpperCase() + norm.slice(1));
        return currentMapped.toLowerCase() === selectedCategory.toLowerCase();
      }).length;

  const specialRequestMessage = `Bonjour SYLITE, je regarde vos nouveaux arrivages mais je recherche un article spécifique qui n'est pas listé sur la page. Pouvez-vous m'aider ?`;
  const specialRequestUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(specialRequestMessage)}`;

  const triggerAuth = async () => {
    if (isAdminAuthenticated) {
      await supabase.auth.signOut();
      setIsAdminAuthenticated(false);
      alert("Mode Admin déconnecté.");
      return;
    }
    setShowAuthModal(true);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      setIsAdminAuthenticated(true);
      setShowAuthModal(false);
      setEmail("");
      setPassword("");
      alert("Accès Admin accordé !");
    } catch (err: any) {
      alert(`Erreur d'authentification : ${err.message || "Identifiants invalides."}`);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogoutAdmin = async () => {
    await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
  };

  if (!mounted) return null;

  return (
    <div className="bg-neutral-50 min-h-screen relative">
      
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
            Explorez l'intégralité de nos collections et passez votre commande instantanément.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl z-0 pointer-events-none" />
      </section>

      {/* ================= ZONE ADMINISTRATIVE SÉCURISÉE ================= */}
      {isAdminAuthenticated ? (
        <AdminPanel 
          onProductChange={() => setRefreshKey(prev => prev + 1)} 
          existingCategories={categories.filter(c => c !== "Tous")} 
          onLogout={handleLogoutAdmin}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 text-left">
          <button 
            onClick={triggerAuth} 
            className="text-[10px] text-neutral-300 hover:text-neutral-400 bg-transparent transition-all border-none outline-none cursor-default"
          >
            .
          </button>
        </div>
      )}

      {/* ================= MODALE DE CONNEXION ADMIN ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-neutral-100 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-neutral-900">🔑 Connexion SyLite Admin</h3>
              <button 
                onClick={() => setShowAuthModal(false)} 
                className="text-xs font-bold text-neutral-400 hover:text-neutral-600"
              >
                Fermer X
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-neutral-500 font-bold uppercase mb-1">Adresse Email</label>
                <input 
                  type="email" 
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="admin@sylite.com" 
                  className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800" 
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-500 font-bold uppercase mb-1">Mot de passe</label>
                <input 
                  type="password" 
                  required
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800" 
                />
              </div>
              <button 
                type="submit" 
                disabled={authLoading}
                className="w-full text-xs font-bold bg-purple-600 text-white py-2.5 rounded-xl hover:bg-purple-700 transition-all disabled:bg-neutral-300"
              >
                {authLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= CONTEXTE LOGIQUE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <h2 onDoubleClick={triggerAuth} className="text-2xl font-serif tracking-wide text-neutral-900 font-bold cursor-pointer select-none">
              Tous nos articles ({loading ? "..." : displayCount})
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Cliquez sur un article pour ouvrir une discussion et finaliser votre achat avec notre équipe.
            </p>
          </div>
          
          <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Commande directe sur WhatsApp au +223 94 93 93 80
          </div>
        </div>

        {/* ================= FILTRES ================= */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={`category-btn-${cat}`}
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

      {/* ================= GRILLE PRINCIPALE DE PRODUITS ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGridWithProps 
          filterCategory={selectedCategory === "Tous" ? undefined : selectedCategory} 
          refreshKey={refreshKey}
          onProductDeleted={() => setRefreshKey(prev => prev + 1)}
          showAdminActions={isAdminAuthenticated}
          categoryCorrections={categoryCorrections}
        />
      </main>

      {/* ================= RÉASSORT & FOMO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
        <div className="bg-gradient-to-r from-purple-900 to-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none pointer-events-none transform translate-x-10 translate-y-10">✨</div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-bold tracking-widest text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-md uppercase">Service Exclusif</span>
            <h3 className="text-xl sm:text-2xl font-serif mt-3 mb-2">Un modèle en rupture ou introuvable ?</h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
              Nos pièces s'envolent très vite. Notre équipe s'occupe de vous le trouver sur commande.
            </p>
            <a href={specialRequestUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-neutral-900 text-xs font-bold px-5 py-3 rounded-xl hover:bg-neutral-100 transition-all shadow-md">
              🎯 Faire une demande personnalisée
            </a>
          </div>
        </div>
      </section>

      {/* ================= SECTIONS DERNIÈRES PIÈCES DISPONIBLES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-neutral-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
          <div>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1">Attention</span>
            <h3 className="text-xl font-serif font-bold text-neutral-900">Dernières pièces disponibles</h3>
          </div>
          <div className="text-xs bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg border border-red-100 self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Stock &lt; 3 unités
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {limitedStockProducts.map((product: any, index: number) => {
            const displayPrice = String(product.price).includes("FCFA") ? product.price : `${product.price} FCFA`;
            const rawCat = product.category || "";
            const cleanCat = categoryCorrections[rawCat.trim().toLowerCase()] || (rawCat.trim().charAt(0).toUpperCase() + rawCat.trim().slice(1).toLowerCase());
            return (
              <div key={`limited-local-render-${product.id || index}-${index}`} className="bg-white border border-neutral-200/60 rounded-2xl p-4 flex items-center gap-4 hover:border-purple-200 transition-all">
                <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                  <Image src={product.image || product.image_url} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">{cleanCat}</span>
                  <h4 className="text-xs font-semibold text-neutral-800 truncate mb-1">{product.name}</h4>
                  <div className="text-sm font-black text-neutral-900 mb-2">{displayPrice}</div>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite réserver en urgence l'article : ${product.name}`)}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1">
                    Bloquer ma pièce →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ================= COMPOSANT PANNEAU ADMIN =================
function AdminPanel({ onProductChange, existingCategories, onLogout }: { onProductChange: () => void, existingCategories: string[], onLogout: () => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [adding, setAdding] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || (!category && !newCategory)) {
      alert("Veuillez remplir au moins le nom, le prix et la catégorie.");
      return;
    }

    setAdding(true);
    const finalCategory = category === "new" ? newCategory.trim() : category;

    try {
      const { data, error } = await (supabase as any).from("products").insert([
        {
          name,
          price: parseFloat(price),
          category: finalCategory,
          image_url: imageUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600",
        }
      ]).select();

      if (error) throw error;

      alert("Produit ajouté avec succès !");
      setName("");
      setPrice("");
      setImageUrl("");
      setNewCategory("");
      setCategory("");
      onProductChange();
    } catch (err: any) {
      console.error(err);
      alert(`Erreur lors de l'ajout: ${err.message || "Erreur de configuration."}`);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="p-6 bg-white border-2 border-purple-500/20 rounded-3xl shadow-xl max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <span>🔐 Espace Privé :</span> Ajouter un nouveau produit
          </h3>
          <button onClick={onLogout} className="text-[10px] font-bold bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-xl hover:bg-neutral-300 transition-all">
            Fermer X
          </button>
        </div>
        
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-[11px] text-neutral-500 font-bold uppercase mb-1">Nom de l'article</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Ensemble Robe" className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-neutral-500 font-bold uppercase mb-1">Prix (FCFA)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 15000" className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800" />
            </div>
            
            <div>
              <label className="block text-[11px] text-neutral-500 font-bold uppercase mb-1">Catégorie</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800">
                <option value="">-- Choisir --</option>
                {existingCategories.map(c => <option key={`select-cat-${c}`} value={c}>{c}</option>)}
                <option value="new">+ Créer une nouvelle catégorie</option>
              </select>
            </div>
          </div>

          {category === "new" && (
            <div>
              <label className="block text-[11px] text-neutral-500 font-bold uppercase mb-1">Nom de la nouvelle catégorie</label>
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Ex: Robes" className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800" />
            </div>
          )}

          <div>
            <label className="block text-[11px] text-neutral-500 font-bold uppercase mb-1">Sélectionner l'image sur l'ordinateur</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            />
            {imageUrl && (
              <div className="mt-2 text-[10px] text-emerald-600 flex items-center gap-2">
                <span>✓ Image chargée avec succès localement</span>
                <div className="w-8 h-8 rounded bg-cover" style={{ backgroundImage: `url(${imageUrl})` }} />
              </div>
            )}
          </div>

          <button type="submit" disabled={adding} className="w-full text-xs font-bold bg-purple-600 text-white py-2.5 rounded-xl hover:bg-purple-700 transition-all disabled:bg-neutral-300">
            {adding ? "Enregistrement en cours..." : "✅ Mettre le produit en ligne"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ================= COMPOSANT DE LA GRILLE DE PRODUITS =================
function ProductGridWithProps({ filterCategory, refreshKey, onProductDeleted, showAdminActions, categoryCorrections }: { filterCategory?: string, refreshKey: number, onProductDeleted: () => void, showAdminActions: boolean, categoryCorrections: { [key: string]: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const WHATSAPP_NUMBER = "22394939380";

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true);
      try {
        const { data: supabaseProducts } = await (supabase as any).from('products').select('*');
        const localItems = Array.isArray(allProducts) ? allProducts : [];
        
        const dbItemsWithPrefix = (supabaseProducts || []).map((p, i) => {
          const norm = (p.category || "").trim().toLowerCase();
          const corrected = categoryCorrections[norm] || (norm.charAt(0).toUpperCase() + norm.slice(1));
          return { 
            ...p, 
            displayCategory: corrected, 
            safeId: `db-item-${p.id || i}-${i}` 
          };
        });

        const localItemsWithPrefix = localItems.map((p, i) => {
          const norm = (p.category || "").trim().toLowerCase();
          const corrected = categoryCorrections[norm] || (norm.charAt(0).toUpperCase() + norm.slice(1));
          return { 
            ...p, 
            displayCategory: corrected, 
            safeId: `local-item-${p.id || i}-${i}` 
          };
        });

        let combinedList = [...dbItemsWithPrefix, ...localItemsWithPrefix];

        if (filterCategory) {
          combinedList = combinedList.filter(
            (p) => p.displayCategory?.toLowerCase() === filterCategory.toLowerCase()
          );
        }

        setProducts(combinedList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, [filterCategory, refreshKey]);

  const handleDelete = async (productId: any, productName: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer définitivement "${productName}" du site ?`)) return;

    try {
      const { error } = await (supabase as any).from("products").delete().eq("id", productId);
      if (error) throw error;

      alert("Produit supprimé !");
      onProductDeleted();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-neutral-400 text-xs animate-pulse">Chargement de la collection SyLite...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-20 text-neutral-500 text-sm">Aucun produit trouvé dans cette catégorie.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => {
        const isDbProduct = String(product.safeId).startsWith("db-");
        const rawPrice = product.price;
        const formattedPrice = String(rawPrice).includes("FCFA") ? rawPrice : `${rawPrice} FCFA`;
        const whatsappMessage = `Bonjour SYLITE, je souhaite commander l'article suivant :\n\n- *Produit :* ${product.name}\n- *Prix :* ${formattedPrice}\n\nEst-il disponible ?`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
        const optionsUrl = `/options?id=${product.id}`;

        return (
          <div key={`product-card-container-${product.safeId}`} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 group flex flex-col relative">
            
            {isDbProduct && showAdminActions && (
              <button 
                onClick={() => handleDelete(product.id, product.name)}
                className="absolute top-3 right-3 z-30 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold p-2 rounded-xl transition-all shadow-md"
              >
                🗑️ Supprimer
              </button>
            )}

            <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
              <Image src={product.image_url || product.image} alt={product.name} fill className="object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-md text-purple-400 text-[9px] font-bold px-2.5 py-1 rounded-md border border-purple-500/10 z-10 uppercase tracking-wider">
                {product.displayCategory || product.category}
              </span>
            </div>
            
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-1">{product.displayCategory || product.category}</span>
                <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">{product.name}</h3>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-50 flex flex-col gap-2">
                <div className="flex flex-col mb-1">
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Tarif</span>
                  <div className="text-base font-black text-neutral-900">{formattedPrice}</div>
                </div>

                {/* Bouton Options s'accordant au style minimaliste et aux couleurs de la carte */}
                <a href={optionsUrl} className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-all border border-neutral-200">
                  Choisir Taille & Couleur ⚙️
                </a>
                
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-sm">
                  Commander via WhatsApp 💬
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}