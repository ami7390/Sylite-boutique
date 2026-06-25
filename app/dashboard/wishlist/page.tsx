"use client";

import Link from 'next/link';

export default function WishlistPage() {
  // Simulation d'articles mis en favoris
  const wishlistItems = [
    { id: 1, name: "Robe d'été plissée - Violet Pastel", price: "25.000 F CFA" },
    { id: 2, name: "Sac à main minimaliste en similicuir", price: "20.000 F CFA" }
  ];

  return (
    <div className="bg-[#fdfdff] min-h-screen text-xs text-neutral-800 p-4 sm:p-12 antialiased">
      <div className="max-w-2xl mx-auto space-y-8 pt-6">
        <header className="space-y-1">
          <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">Shopping</span>
          <h1 className="text-2xl font-serif text-neutral-900 tracking-wide">Ma Liste d'envies</h1>
          <p className="text-neutral-400 font-light">Retrouvez les pièces coup de cœur que vous avez sauvegardées.</p>
        </header>

        {wishlistItems.length === 0 ? (
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-12 text-center text-neutral-400">
            <p>Votre liste d'envies est vide pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white border border-neutral-200/70 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-medium text-neutral-800">{item.name}</p>
                  <p className="text-purple-700 font-bold mt-1">{item.price}</p>
                </div>
                <button className="text-neutral-400 hover:text-red-500 transition-colors text-sm">❤️</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}