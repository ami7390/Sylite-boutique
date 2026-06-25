"use client";

export default function InvoicesPage() {
  const invoices = [
    { id: "FAC-2026-001", date: "22 Juin 2026", amount: "45.000 F CFA" }
  ];

  return (
    <div className="bg-[#fdfdff] min-h-screen text-xs text-neutral-800 p-4 sm:p-12 antialiased">
      <div className="max-w-2xl mx-auto space-y-8 pt-6">
        <header className="space-y-1">
          <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">Comptabilité</span>
          <h1 className="text-2xl font-serif text-neutral-900 tracking-wide">Factures & Reçus</h1>
          <p className="text-neutral-400 font-light">Téléchargez vos justificatifs d'achat et vos reçus de paiement.</p>
        </header>

        <div className="bg-white border border-neutral-200/70 rounded-3xl shadow-sm overflow-hidden">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex justify-between items-center p-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
              <div>
                <p className="font-mono font-bold text-neutral-900">{inv.id}</p>
                <p className="text-neutral-400 text-[10px] mt-0.5">Payée le {inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-neutral-800">{inv.amount}</span>
                
                {/* ACTION DE TÉLÉCHARGEMENT REEL EN LIGNE */}
                <button 
                  onClick={() => {
                    const contenuFacture = `
=========================================
               SYLITE SHOP
=========================================
Facture N° : ${inv.id}
Date       : ${inv.date}
Statut     : PAYÉE
-----------------------------------------
Article    : Articles de Mode & Accessoires
Montant Total : ${inv.amount}
-----------------------------------------
Merci pour votre achat chez SYLITE !
=========================================
                    `;
                    const blob = new Blob([contenuFacture.trim()], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `Facture_SYLITE_${inv.id}.txt`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }} 
                  className="text-purple-600 hover:text-purple-800 font-bold border border-purple-100 bg-purple-50/50 px-2.5 py-1 rounded-lg transition-colors"
                >
                  Télécharger 📥
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}