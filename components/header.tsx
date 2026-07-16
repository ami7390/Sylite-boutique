"use client";

import UserMenu from './usermenu'; // Importation de votre nouveau composant de compte
import { useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link'; // Importation de Link pour de meilleures performances de navigation
import { usePathname } from 'next/navigation'; // Hook pour récupérer l'URL actuelle

// IMPORTATION : On écoute les données de notre panier global
import { useCart } from '../app/(boutique)/context/cartcontext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Contient le chemin actuel (ex: "/" ou "/nouveau-arrivage")

  // CONNEXION AU PANIER : On récupère la liste des produits choisis
  const { cartItems } = useCart();

  // On calcule automatiquement le nombre total d'articles (prend en compte les quantités)
  const totalArticles = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

  // Fonction magique qui regroupe la commande et ouvre WhatsApp
  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    // 1. On construit le texte de la commande ligne par ligne
    let textCommande = "Bonjour SYLITE ! Je souhaite passer commande pour les articles suivants :\n\n";
    
    let totalGlobal = 0;
    cartItems.forEach((item: any) => {
      const sousTotal = item.price * item.quantity;
      totalGlobal += sousTotal;
      textCommande += `• ${item.name} (Qté : ${item.quantity}) - ${sousTotal.toLocaleString()} FCFA\n`;
    });

    textCommande += `\n➡ *Montant Total : ${totalGlobal.toLocaleString()} FCFA*`;
    textCommande += "\n\nMerci de me confirmer la disponibilité et les modalités de livraison !";

    // 2. On encode le message pour les liens web
    const messageEncode = encodeURIComponent(textCommande);

    // 3. Numéro WhatsApp officiel de la boutique
    const numeroWhatsApp = "22373904319"; 

    // 4. On ouvre la fenêtre WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${messageEncode}`, '_blank');
  };

  // Liste centralisée des onglets pour automatiser l'activation des styles
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Nouvel Arrivage", href: "/nouvel-arrivage" },
    { name: "Collection", href: "/collection" },
    { name: "Soins", href: "/soins" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="block relative w-32 h-10">
              <Image 
                src="/logo.png" 
                alt="SYLITE Logo"
                layout="fill"
                objectFit="contain" 
                priority
              />
            </Link>
          </div>

          {/* Navigation - Liens Principaux (Desktop Dynamique) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium h-full items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-1 pt-1 h-full flex items-center border-b-2 transition-colors ${
                    isActive
                      ? "text-purple-600 border-purple-600 font-semibold"
                      : "text-neutral-500 border-transparent hover:text-purple-600 hover:border-purple-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Barre de Recherche et Utilitaires (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une pièce..."
                className="bg-neutral-50 border border-neutral-200 text-xs rounded-full pl-4 pr-10 py-2 w-48 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-neutral-800 transition-all"
              />
              <span className="absolute right-3 top-2 text-neutral-400 text-sm">🔍</span>
            </div>
            
            {/* COMPOSANT USER MENU INTÉGRÉ ICI (REMPLACE L'ANCIENNE ICÔNE STATIQUE) */}
            <UserMenu />
            
            {/* BOUTON PANIER MODIFIÉ */}
            <button 
              onClick={handleSendWhatsAppOrder}
              className="p-1 text-neutral-600 hover:text-purple-600 transition-colors text-lg relative" 
              aria-label="Panier"
            >
              👜
              {totalArticles > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                  {totalArticles}
                </span>
              )}
            </button>
          </div>

          {/* Barre d'utilitaires et Menu Mobile */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
            
            {/* ESPACE COMPTE ACCESSIBLE SUR MOBILE ÉGALEMENT */}
            <UserMenu />

            {/* PANIER RAPIDE VISIBLE SUR MOBILE À CÔTÉ DU CHEVRON */}
            <button 
              onClick={handleSendWhatsAppOrder}
              className="p-1 text-neutral-600 hover:text-purple-600 transition-colors text-lg relative" 
              aria-label="Panier"
            >
              👜
              {totalArticles > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                  {totalArticles}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-600 hover:text-purple-600 focus:outline-none p-2 text-xl"
              aria-label="Toggle menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Déroulant Onglets (Mobile Dynamique) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // Ferme le menu mobile au clic
                className={`block px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-purple-50 text-purple-600 font-semibold"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-purple-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-4 px-3 relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:border-purple-400 text-neutral-800"
            />
            <span className="absolute right-6 top-6 text-neutral-400 text-sm">🔍</span>
          </div>
        </div>
      )}
    </nav>
  );
}
