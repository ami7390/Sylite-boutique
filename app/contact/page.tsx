"use client";

import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    subject: 'Conseil d\'achat',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  // Calcul du statut d'ouverture en temps réel (8h - 19h)
  useEffect(() => {
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay(); // 0 = Dimanche
    if (currentHour >= 8 && currentHour < 19 && currentDay !== 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "+22373904319"; 
    const text = `Bonjour, je souhaite vous contacter via le site.\n\n*Nom complet :* ${formData.name}\n*Sujet :* ${formData.subject}\n*Message :* ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-[#fdfdff] min-h-screen text-xs text-neutral-800 pb-32 selection:bg-purple-600 selection:text-white antialiased relative overflow-hidden">
      
      {/* LUEURS AMBIANTES RENFORCÉES EN VIOLET */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-purple-100/50 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-50/40 rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="relative z-10">
        
        {/* 1. EN-TÊTE PREMIUM */}
        <header className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-50/60 border border-purple-100 px-3 py-1 rounded-full shadow-[0_2px_12px_rgba(110,68,255,0.03)]">
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-purple-600 animate-pulse' : 'bg-neutral-400'}`} />
            <span className="text-[9px] text-purple-700 font-bold uppercase tracking-[0.15em]">
              {isOpen ? "Conciergerie Violette Connectée" : "Conseillers hors-ligne"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light font-serif text-neutral-900 tracking-wide leading-tight">
            Le pôle conciergerie <br />
            <span className="font-normal italic bg-gradient-to-r from-purple-700 via-purple-900 to-indigo-950 bg-clip-text text-transparent">est à votre entière disposition.</span>
          </h1>
          <p className="text-neutral-500 font-light max-w-md mx-auto text-[13px] leading-relaxed pt-1">
            Besoin d’un suivi d'expédition, d'une assistance sur-mesure ou d'une note technique ? Choisissez le canal le plus adapté.
          </p>
        </header>

        {/* 2. BARRE D'ACTIONS IMMÉDIATES (AVEC SUBTILES TOUCHES VIOLETTES) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-[0_8px_30px_rgba(110,68,255,0.015)]">
            <div className="p-4 rounded-2xl hover:bg-purple-50/30 border border-transparent hover:border-purple-100 transition-all cursor-pointer group">
              <span className="text-xl block mb-2">📦</span>
              <h3 className="font-bold text-neutral-900 group-hover:text-purple-700 transition-colors text-[11px] uppercase tracking-wider">Suivre mon colis</h3>
              <p className="text-neutral-400 font-light mt-1 text-[10px]">Consultez l'état d'avancement de votre livraison en temps réel.</p>
            </div>
            <div className="p-4 rounded-2xl hover:bg-purple-50/30 border border-transparent hover:border-purple-100 transition-all cursor-pointer group">
              <span className="text-xl block mb-2">🔄</span>
              <h3 className="font-bold text-neutral-900 group-hover:text-purple-700 transition-colors text-[11px] uppercase tracking-wider">Retour & Échange</h3>
              <p className="text-neutral-400 font-light mt-1 text-[10px]">Déposez une demande de rétractation ou d'échange sous 14 jours.</p>
            </div>
            <div className="p-4 rounded-2xl hover:bg-purple-50/30 border border-transparent hover:border-purple-100 transition-all cursor-pointer group">
              <span className="text-xl block mb-2">🧾</span>
              <h3 className="font-bold text-neutral-900 group-hover:text-purple-700 transition-colors text-[11px] uppercase tracking-wider">Mes Factures</h3>
              <p className="text-neutral-400 font-light mt-1 text-[10px]">Téléchargez vos pièces justificatives et certificats de garantie.</p>
            </div>
            <div className="p-4 rounded-2xl hover:bg-purple-50/30 border border-transparent hover:border-purple-100 transition-all cursor-pointer group">
              <span className="text-xl block mb-2">💼</span>
              <h3 className="font-bold text-neutral-900 group-hover:text-purple-700 transition-colors text-[11px] uppercase tracking-wider">Espace Corporate</h3>
              <p className="text-neutral-400 font-light mt-1 text-[10px]">Demandes de devis et catalogues dédiés aux professionnels du BTP.</p>
            </div>
          </div>
        </section>

        {/* 3. GRILLE DE CONTACT PRINCIPALE */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* FORMULAIRE WHATSAPP */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[32px] border border-neutral-200/60 shadow-[0_12px_40px_rgba(110,68,255,0.02)] space-y-8">
              <div>
                <h2 className="text-lg font-medium font-serif text-neutral-900 tracking-wide">Initier un échange chiffré</h2>
                <p className="text-neutral-400 font-light mt-1">Vos données de projet ou d'achat restent strictement confidentielles.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold tracking-wider uppercase transition-colors ${focusedField === 'name' ? 'text-purple-600' : 'text-neutral-400'}`}>
                    Votre nom / Entité
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Client ou Entreprise"
                    className="w-full bg-neutral-50/50 border border-neutral-200 focus:border-purple-400 rounded-xl p-3.5 focus:outline-none focus:bg-white transition-all font-medium text-neutral-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                    Sujet principal de votre demande
                  </label>
                  <div className="relative">
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-neutral-50/50 border border-neutral-200 focus:border-purple-400 rounded-xl p-3.5 focus:outline-none focus:bg-white transition-all font-medium text-neutral-800 appearance-none cursor-pointer"
                    >
                      <option value="Conseil d'achat">Conseil d'achat & Spécifications Électroménager</option>
                      <option value="Suivi de commande">Suivi ou modification d'une expédition</option>
                      <option value="Service Après-Vente">Service Après-Vente, Conformité & Garantie</option>
                      <option value="Projet d'aménagement / BTP">Projets d'Immobilier, Architecture & BTP</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600 pointer-events-none text-[9px]">▼</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-bold tracking-wider uppercase transition-colors ${focusedField === 'message' ? 'text-purple-600' : 'text-neutral-400'}`}>
                    Détaillez vos besoins
                  </label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Entrez votre message ici. Vous pourrez y joindre des photos ou plans directement sur WhatsApp..."
                    className="w-full bg-neutral-50/50 border border-neutral-200 focus:border-purple-400 rounded-xl p-3.5 focus:outline-none focus:bg-white transition-all font-medium text-neutral-800 resize-none leading-relaxed"
                  />
                </div>

                {/* BOUTON AVEC MICRO-GRADIENT DE COULEUR MARQUE */}
                <button 
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-[0.15em] text-center text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-purple-200/50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>💬 Ouvrir la discussion WhatsApp</span>
                </button>
              </form>
            </div>

            {/* BLOC INFOS ET GARANTIES */}
            <div className="lg:col-span-5 space-y-8 lg:pl-4">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-purple-700">Canaux Directs</h3>
                  <div className="w-8 h-[1px] bg-purple-600 mt-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-purple-200 transition-colors">
                    <span className="text-lg text-purple-600">🕒</span>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Disponibilité du Desk</h4>
                      <p className="text-neutral-600 font-medium mt-0.5">Automne - Printemps | Lun - Sam</p>
                      <p className="text-neutral-400 font-light text-[10px]">De 8h00 à 19h00 en continu.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-purple-200 transition-colors">
                    <span className="text-lg text-purple-600">📍</span>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Showroom Physique</h4>
                      <p className="text-neutral-600 font-medium mt-0.5">Quartier Niamana</p>
                      <p className="text-neutral-400 font-light text-[10px]">Bamako, Mali.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ENCADRÉ CHARTE D'ENGAGEMENT EN VIOLET ÉPURÉ */}
              <div className="bg-purple-50/40 border border-purple-100 rounded-[24px] p-6 space-y-4 shadow-sm">
                <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-purple-800">Normes de Service Élite</h4>
                <div className="space-y-3 font-light text-neutral-600 leading-relaxed text-[11px]">
                  <p className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span><strong>Inspection à la livraison :</strong> Aucun produit n'est livré à l'aveugle. Vous déballez, examinez et validez la conformité physique avec notre agent logistique avant finalisation.</span>
                  </p>
                  <p className="flex items-start gap-2 border-t border-purple-100 pt-2.5">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span><strong>Garantie Sérénité :</strong> Nos contrats intègrent un support dédié et une prise en charge rapide des anomalies techniques directement à domicile ou sur site.</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* QUESTIONS FRÉQUEMMENT POSÉES */}
          <section className="space-y-10 pt-20 mt-20 border-t border-neutral-200/60">
            <div className="text-center space-y-2">
              <span className="text-[9px] text-purple-500 font-bold uppercase tracking-widest">Besoin d'éclaircissements</span>
              <h2 className="text-xl font-medium font-serif text-neutral-900 tracking-wide">Foire aux questions globale</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-neutral-200/60 hover:border-purple-200 transition-all shadow-sm">
                <h4 className="font-medium text-neutral-900 text-[13px] tracking-wide group-hover:text-purple-700">Comment s'organisent vos livraisons d'équipements ?</h4>
                <p className="text-neutral-500 font-light leading-relaxed mt-2 text-[11px]">
                  Nos services planifient des créneaux de livraison précis. Pour l'électroménager lourd ou sensible, nos livreurs procèdent à un contrôle visuel minutieux en votre présence avant toute validation définitive.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-neutral-200/60 hover:border-purple-200 transition-all shadow-sm">
                <h4 className="font-medium text-neutral-900 text-[13px] tracking-wide">Quels sont les avantages de la prise de contact WhatsApp ?</h4>
                <p className="text-neutral-500 font-light leading-relaxed mt-2 text-[11px]">
                  WhatsApp vous permet de nous envoyer instantanément des captures d’écran de vos paniers, des références précises, ou de partager votre géolocalisation pour accélérer les procédures de livraison sur le terrain.
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}