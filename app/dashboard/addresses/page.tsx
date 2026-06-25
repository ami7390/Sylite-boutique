"use client";

import { useState, useEffect } from 'react';

export default function AddressesPage() {
  // 1. Initialisation avec des valeurs par défaut
  const [address, setAddress] = useState({
    city: "Bamako",
    neighborhood: "ACI 2000",
    details: "Près du rond-point de la bougie, immeuble vitré au 2ème étage",
    phone: "+223 73 90 43 19"
  });

  // 2. Étape magique : On charge l'adresse sauvegardée au démarrage de la page
  useEffect(() => {
    const savedAddress = localStorage.getItem('sylite_user_address');
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  // 3. Fonction pour sauvegarder les modifications dans le navigateur
  const handleSave = () => {
    localStorage.setItem('sylite_user_address', JSON.stringify(address));
    alert('Adresse enregistrée avec succès dans votre session ! ✨');
  };

  return (
    <div className="bg-[#fdfdff] min-h-screen text-xs text-neutral-800 p-4 sm:p-12 antialiased">
      <div className="max-w-2xl mx-auto space-y-8 pt-6">
        
        <header className="space-y-1">
          <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">Mon Profil</span>
          <h1 className="text-2xl font-serif text-neutral-900 tracking-wide">Adresse de livraison</h1>
          <p className="text-neutral-400 font-light">Configurez vos coordonnées par défaut pour accélérer l'expédition de vos colis.</p>
        </header>

        <div className="bg-white border border-neutral-200/70 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Ville</label>
              <input 
                type="text" 
                value={address.city} 
                onChange={(e) => setAddress({...address, city: e.target.value})}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-purple-400 font-medium text-neutral-800" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Quartier / Zone</label>
              <input 
                type="text" 
                value={address.neighborhood} 
                onChange={(e) => setAddress({...address, neighborhood: e.target.value})}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-purple-400 font-medium text-neutral-800" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Précisions de livraison (Instructions pour le livreur)</label>
            <textarea 
              rows={3}
              value={address.details} 
              onChange={(e) => setAddress({...address, details: e.target.value})}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-purple-400 font-medium resize-none leading-relaxed text-neutral-800" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Téléphone de contact direct</label>
            <input 
              type="text" 
              value={address.phone} 
              onChange={(e) => setAddress({...address, phone: e.target.value})}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-purple-400 font-medium text-neutral-800" 
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-[0.1em] rounded-xl transition-all shadow-md shadow-purple-100"
          >
            Enregistrer les modifications
          </button>
        </div>

      </div>
    </div>
  );
}