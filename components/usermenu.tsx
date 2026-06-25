"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importation du routeur pour gérer la redirection

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialisation du routeur

  // Simulation d'un client connecté
  const user = { name: "Aminata Diawara", email: "aminatadiawara7390@gmail.com" };

  // Fonction pour gérer la déconnexion proprement
  const handleLogout = () => {
    setIsOpen(false); // On ferme le menu déroulant
    // C'est ici que s'ajoutera plus tard la logique de suppression de session (Auth.js, Clerk, etc.)
    router.push('/'); // Redirection fluide vers la page d'accueil
  };

  return (
    <div className="relative inline-block text-left text-neutral-800 text-xs antialiased">
      
      {/* BOUTON ICÔNE DE PROFIL */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-purple-50 text-neutral-700 hover:text-purple-700 transition-all focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>

      {/* DROPDOWN E-COMMERCE */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-64 bg-white border border-neutral-200/80 rounded-2xl shadow-[0_10px_40px_rgba(110,68,255,0.06)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            
            {/* Infos Client */}
            <div className="p-4 bg-purple-50/40 border-b border-neutral-100">
              <p className="font-bold text-neutral-900 text-[12px]">{user.name}</p>
              <p className="text-neutral-400 font-light text-[10px] mt-0.5">{user.email}</p>
            </div>

            {/* Liens Shopping */}
            <div className="p-2 space-y-0.5">
              <Link href="/dashboard/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-600 hover:text-purple-700 hover:bg-purple-50/30 transition-all font-medium">
                <span>📦</span> Mes commandes & Suivi
              </Link>
              
              <Link href="/dashboard/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-600 hover:text-purple-700 hover:bg-purple-50/30 transition-all font-medium">
                <span>❤️</span> Ma Liste d'envies
              </Link>

              <Link href="/dashboard/addresses" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-600 hover:text-purple-700 hover:bg-purple-50/30 transition-all font-medium">
                <span>📍</span> Adresses de livraison
              </Link>
              
              <Link href="/dashboard/invoices" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-600 hover:text-purple-700 hover:bg-purple-50/30 transition-all font-medium">
                <span>🧾</span> Factures & Reçus
              </Link>
            </div>

            {/* Déconnexion MODIFIÉE */}
            <div className="p-1 bg-neutral-50/50 border-t border-neutral-100">
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-3 py-2 text-neutral-400 hover:text-red-500 transition-colors font-medium rounded-xl text-[11px]"
              >
                Se déconnecter
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}