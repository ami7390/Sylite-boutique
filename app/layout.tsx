import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // On garde impérativement les styles Tailwind globaux ici

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
      {/* 
        Le layout racine ne contient PLUS NI Header, NI Footer, NI CartProvider.
        Il se contente d'ouvrir les portes du site avec les balises de base.
      */}
      <body className={`${inter.className} min-h-full flex flex-col bg-neutral-950 antialiased`}>
        
        {children} {/* C'est ici que s'injectera soit la boutique, soit la maintenance */}
        
      </body>
    </html>
  );
}