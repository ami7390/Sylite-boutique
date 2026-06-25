"use client";

import { createContext, useContext, useState } from 'react';

// On crée la "boîte" (le contexte)
const CartContext = createContext<any>(null);

// On crée le composant qui va gérer les données
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // La fonction pour ajouter un produit
  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
    console.log("Produit ajouté :", product.name);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Un petit outil pour utiliser le panier facilement
export const useCart = () => useContext(CartContext);