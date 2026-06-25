import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// CORRECTION FINALE : On utilise "./" car le dossier context est dans 'app'
import { CartProvider } from "./context/cartcontext";

// On recule d'un dossier (..) pour sortir de 'app' et entrer dans 'components'
import Header from "../components/header";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SYLITE - Modern Elegance",
  description: "Boutique en ligne haut de gamme de prêt-à-porter et accessoires pour femmes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      {/* On ajoute h-full et flex flex-col pour que le footer reste toujours bien en bas */}
      <body className={`${inter.className} min-h-full flex flex-col bg-white text-neutral-900`}>
        
        {/* BRANCHEMENT DU PANIER : On enveloppe tout le site ici */}
        <CartProvider>
          
          {/* 2. LE HEADER S'AFFICHE EN HAUT */}
          <Header />

          {/* Le contenu principal de vos pages prend tout l'espace disponible */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 3. LE FOOTER S'AFFICHE EN BAS */}
          <Footer />

        </CartProvider>

      </body>
    </html>
  );
}