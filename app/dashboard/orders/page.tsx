"use client";

import Link from 'next/link';

export default function OrdersPage() {
  // Données simulées pour une commande haut de gamme
  const orders = [
    {
      id: "SYL-84920",
      date: "24 Juin 2026",
      total: "45.000 F CFA",
      status: "En cours de route",
      statusStyle: "text-purple-700 bg-purple-50 border-purple-100",
      step: 2, // 1 = Préparation, 2 = En chemin, 3 = Livré
      items: [
        { name: "Ensemble Plissé Premium - Émeraude", size: "M", price: "25.000 F CFA", qty: 1 },
        { name: "Pochette Cuir Minimaliste", size: "Unique", price: "20.000 F CFA", qty: 1 }
      ]
    }
  ];

  return (
    <div className="bg-[#fdfdff] min-h-screen text-xs text-neutral-800 p-4 sm:p-12 antialiased">
      <div className="max-w-3xl mx-auto space-y-8 pt-6">
        
        <header className="space-y-1">
          <div className="flex items-center gap-2 text-neutral-400">
            <Link href="/" className="hover:text-purple-600 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-neutral-600 font-medium">Espace Client</span>
          </div>
          <h1 className="text-2xl font-serif text-neutral-900 tracking-wide pt-2">Suivi de vos commandes</h1>
          <p className="text-neutral-400 font-light">Suivez l'état d'avancement de vos colis et consultez votre historique d'achats.</p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-12 text-center space-y-3 shadow-sm">
            <span className="text-2xl block">🛍️</span>
            <p className="text-neutral-500 font-light text-[13px]">Vous n'avez pas encore passé de commande.</p>
            <Link href="/collection" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all">
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-neutral-200/70 rounded-3xl p-6 shadow-sm space-y-6 hover:border-purple-200/60 transition-all">
                
                {/* Entête commande */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-neutral-100">
                  <div className="grid grid-cols-2 sm:flex items-center gap-x-8 gap-y-2">
                    <div>
                      <p className="text-neutral-400 uppercase tracking-wider font-bold text-[9px]">ID de Commande</p>
                      <p className="font-mono font-bold text-neutral-900 mt-0.5">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 uppercase tracking-wider font-bold text-[9px]">Date</p>
                      <p className="font-medium text-neutral-700 mt-0.5">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 uppercase tracking-wider font-bold text-[9px]">Total</p>
                      <p className="font-bold text-purple-700 mt-0.5">{order.total}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-block font-bold uppercase tracking-wider text-[9px] px-3 py-1 rounded-full border ${order.statusStyle}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="py-2">
                  <div className="grid grid-cols-3 text-center font-bold text-[9px] uppercase tracking-wider mb-2 text-neutral-400">
                    <span className={order.step >= 1 ? "text-purple-600 font-bold" : ""}>1. Préparation</span>
                    <span className={order.step >= 2 ? "text-purple-600 font-bold" : ""}>2. En cours de livraison</span>
                    <span className={order.step >= 3 ? "text-purple-600 font-bold" : ""}>3. Remis en main propre</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-700 h-full rounded-full transition-all duration-500" 
                      style={{ width: order.step === 1 ? "16.6%" : order.step === 2 ? "50%" : "100%" }} 
                    />
                  </div>
                </div>

                {/* Articles */}
                <div className="space-y-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Détails des pièces</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-neutral-50/50 p-3 rounded-xl border border-neutral-100">
                        <div>
                          <p className="font-medium text-neutral-800 text-[11px]">{item.name}</p>
                          <p className="text-neutral-400 text-[10px] mt-0.5">Taille : {item.size} — Quantité : {item.qty}</p>
                        </div>
                        <p className="font-bold text-neutral-900">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}