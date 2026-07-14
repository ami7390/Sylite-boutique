"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseclient";
import { notifyProductsChanged } from "@/lib/product-sync";

// Définition des interfaces pour un typage TypeScript propre
interface Product {
  id: string | number;
  name: string;
  price: number;
  category: string;
  image_url: string;
}

interface CustomerMessage {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "messages">("products");

  // États pour les produits typés
  const [products, setProducts] = useState<Product[]>([]);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [prodImageUrl, setProdImageUrl] = useState("");
  
  // Verrou strict anti-doublons
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Clé unique pour réinitialiser de force le champ d'upload HTML
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  
  // État de modification typé
  const [editingProductId, setEditingProductId] = useState<string | number | null>(null);

  // États pour les messages typés
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const defaultCategories = ["Gaines", "Cosmétiques", "Accessoires"];
  const categories = Array.from(
    new Set([
      ...defaultCategories,
      ...products.map((p) => p.category).filter(Boolean)
    ])
  ).sort();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
        loadProducts();
        loadMessages();
      }
    };
    checkUser();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (error) {
      console.error("Erreur chargement produits:", error.message);
      return;
    }
    if (data) setProducts(data as Product[]);
  };

  const loadMessages = async () => {
    setLoadingMessages(true);
    const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Erreur chargement messages:", error.message);
      setLoadingMessages(false);
      return;
    }
    if (data) setMessages(data as CustomerMessage[]);
    setLoadingMessages(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      setIsAuthenticated(true);
      loadProducts();
      loadMessages();
    } catch (err: any) {
      alert(`Erreur : ${err.message || "Identifiants invalides."}`);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProdImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setProdName("");
    setProdPrice("");
    setProdCategory("");
    setProdImageUrl("");
    setFileInputKey(Date.now());
  };

  const handleSaveProduct = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!prodName.trim() || !prodPrice || !prodCategory.trim()) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }

    if (isSubmitting) return; 
    setIsSubmitting(true);

    try {
      if (editingProductId) {
        const { error } = await supabase
          .from("products")
          .update({
            name: prodName.trim(),
            price: parseFloat(prodPrice),
            category: prodCategory.trim(),
            image_url: prodImageUrl,
          })
          .eq("id", editingProductId);

        if (error) throw error;
        alert("Produit mis à jour avec succès !");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([
            {
              source_id: `admin-${crypto.randomUUID()}`,
              name: prodName.trim(),
              price: parseFloat(prodPrice),
              category: prodCategory.trim(),
              image_url: prodImageUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600",
            }
          ]);

        if (error) throw error;
        alert("Produit ajouté avec succès !");
      }

      cancelEdit();
      await loadProducts();
      notifyProductsChanged();
    } catch (err: any) {
      alert(`Erreur lors de l'enregistrement : ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (product: Product) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdPrice(product.price.toString());
    setProdCategory(product.category);
    setProdImageUrl(product.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id: string | number, name: string) => {
    if (!confirm(`Supprimer définitivement "${name}" ?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert(`Erreur de suppression : ${error.message}`);
      return;
    }
    if (editingProductId === id) cancelEdit();
    await loadProducts();
    notifyProductsChanged();
  };

  const toggleMessageStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("messages").update({ is_read: !currentStatus }).eq("id", id);
    if (error) {
      console.error("Erreur statut message:", error.message);
      return;
    }
    loadMessages();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      alert(`Erreur de suppression : ${error.message}`);
      return;
    }
    loadMessages();
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-neutral-100">
          <h2 className="text-xl font-serif font-bold text-neutral-950 text-center mb-2">🔑 Espace Direction</h2>
          <p className="text-xs text-neutral-500 text-center mb-6">Connectez-vous pour administrer la plateforme SyLite.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@sylite.com" className="w-full text-xs px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-900" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Mot de passe</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full text-xs px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-900" />
            </div>
            <button type="submit" disabled={authLoading} className="w-full text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-all disabled:bg-neutral-300">
              {authLoading ? "Vérification..." : "Entrer dans le tableau de bord"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <nav className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-serif font-bold tracking-wider">SyLite <span className="text-purple-400 italic font-normal">Backoffice</span></h1>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab("products")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "products" ? "bg-purple-600 text-white" : "text-neutral-400 hover:text-white"}`}>📦 Produits</button>
            <button onClick={() => setActiveTab("messages")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "messages" ? "bg-purple-600 text-white" : "text-neutral-400 hover:text-white"}`}>💬 Messages</button>
          </div>
        </div>
        <button onClick={handleLogout} className="text-xs font-bold bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-xl transition-all">Déconnexion</button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className={`bg-white border rounded-3xl p-6 shadow-sm transition-all duration-300 ${editingProductId ? 'border-amber-400 ring-1 ring-amber-100' : 'border-neutral-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-neutral-900">
                  {editingProductId ? "✏️ Modifier le produit" : "✨ Ajouter un article"}
                </h3>
                {editingProductId && (
                  <button type="button" onClick={cancelEdit} className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-2 py-1 rounded-md font-bold">
                    Annuler
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-neutral-500 font-bold uppercase mb-1">Nom du produit</label>
                  <input type="text" value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="Ex: Gaine Amincissante Ultra" className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-neutral-500 font-bold uppercase mb-1">Prix (FCFA)</label>
                    <input type="number" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} placeholder="15000" className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-500 font-bold uppercase mb-1">Catégorie</label>
                    <select 
                      value={prodCategory} 
                      onChange={(e) => setProdCategory(e.target.value)} 
                      className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800 appearance-none"
                    >
                      <option value="">-- Choisir --</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-500 font-bold uppercase mb-1">Illustration du produit</label>
                  <input key={fileInputKey} type="file" accept="image/*" onChange={handleFileChange} className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
                  {prodImageUrl && <div className="mt-2 w-12 h-12 bg-cover rounded-lg border" style={{ backgroundImage: `url(${prodImageUrl})` }} />}
                </div>
                
                <button type="button" onClick={handleSaveProduct} disabled={isSubmitting} className={`w-full text-xs font-bold text-white py-2.5 rounded-xl transition-all disabled:bg-neutral-300 ${editingProductId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-purple-600 hover:bg-purple-700'}`}>
                  {isSubmitting ? "Enregistrement en cours..." : editingProductId ? "Mettre à jour le produit" : "Enregistrer et publier"}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-900 mb-4">📦 Produits actuellement enregistrés sur Supabase ({products.length})</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-none">
                {products.map((p) => (
                  <div key={p.id} className={`flex items-center justify-between p-3 border rounded-2xl transition-all ${editingProductId === p.id ? 'border-amber-400 bg-amber-50/20' : 'border-neutral-100 hover:border-purple-100'}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-10 h-12 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0">
                        {p.image_url && !p.image_url.startsWith("data:") && (
                          <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                        )}
                        {p.image_url && p.image_url.startsWith("data:") && (
                          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${p.image_url})` }} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-800 truncate">{p.name}</h4>
                        <span className="text-[9px] font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded uppercase">{p.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-xs font-black text-neutral-950 whitespace-nowrap">{p.price} FCFA</span>
                      <div className="flex gap-1.5">
                        <button onClick={() => startEdit(p)} className="text-[10px] text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold px-3 py-1.5 rounded-xl transition-all">Modifier</button>
                        <button onClick={() => handleDeleteProduct(p.id, p.name)} className="text-[10px] text-red-600 bg-red-50 hover:bg-red-100 font-bold px-3 py-1.5 rounded-xl transition-all">Supprimer</button>
                      </div>
                    </div>
                  </div>
                ))}
                {products.length === 0 && <p className="text-xs text-neutral-400 text-center py-10">Aucun produit dans votre base de données.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-neutral-900">📬 Boîte de réception des formulaires clients</h3>
              <button onClick={loadMessages} className="text-xs font-bold text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-xl hover:bg-neutral-200 transition-all">🔄 Actualiser</button>
            </div>

            {loadingMessages ? (
              <div className="text-center py-10 text-xs text-neutral-400 animate-pulse">Chargement des courriels clients...</div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-5 rounded-2xl border transition-all ${msg.is_read ? "bg-neutral-50/50 border-neutral-200/60" : "bg-white border-purple-200 shadow-sm ring-1 ring-purple-100"}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className={`inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded-md mr-2 ${msg.is_read ? "bg-neutral-200 text-neutral-600" : "bg-purple-600 text-white"}`}>
                          {msg.is_read ? "Lu" : "Nouveau"}
                        </span>
                        <strong className="text-xs text-neutral-900">{msg.name}</strong>
                        {msg.email && <span className="text-xs text-neutral-400 ml-2">({msg.email})</span>}
                        {msg.phone && <span className="text-xs text-emerald-600 font-mono ml-2">{msg.phone}</span>}
                      </div>
                      <span className="text-[10px] text-neutral-400 font-light">{new Date(msg.created_at).toLocaleString("fr-FR")}</span>
                    </div>
                    {msg.subject && <h4 className="text-xs font-bold text-neutral-800 mb-1">Sujet : {msg.subject}</h4>}
                    <p className="text-xs text-neutral-600 bg-neutral-50/80 p-3 rounded-xl border border-neutral-100 whitespace-pre-line leading-relaxed">{msg.message}</p>
                    
                    <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-neutral-100">
                      <button onClick={() => toggleMessageStatus(msg.id, msg.is_read)} className="text-[10px] font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-lg transition-all">
                        {msg.is_read ? "Marquer comme non lu" : "Marquer comme lu"}
                      </button>
                      <button onClick={() => handleDeleteMessage(msg.id)} className="text-[10px] font-bold bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-all">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && <p className="text-xs text-neutral-400 text-center py-10">Aucun message reçu pour le moment.</p>}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
