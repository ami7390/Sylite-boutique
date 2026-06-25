import type { Metadata } from "next";

// CORRECTION DES CHEMINS : On utilise l'alias '@/' pour cibler la racine du projet,
// peu importe la profondeur du dossier (boutique)
import { CartProvider } from "@/app/(boutique)/context/cartcontext";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "SYLITE - Modern Elegance",
  description: "Boutique en ligne haut de gamme de prêt-à-porter et accessoires pour femmes.",
};

export default function BoutiqueLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* 
      CORRECTION STRUCTURALE : On supprime <html>, <body> et la police Inter ici. 
      Ce sous-layout s'occupe exclusivement de la logique commerciale (Panier, Header, Footer).
    */
    <CartProvider>
      
      {/* 1. LE HEADER DE LA BOUTIQUE */}
      <Header />

      {/* 2. LE CONTENU PRINCIPAL DE TES PAGES DE VENTE */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. LE FOOTER DE LA BOUTIQUE */}
      <Footer />

    </CartProvider>
  );
}