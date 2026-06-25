"use client";

import { useState, useEffect } from 'react';

export default function Maintenance() {
  // Configurer le numéro WhatsApp au format international (Ex: +223...)
  const WHATSAPP_NUMBER = "22373904319"; 
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [progress, setProgress] = useState(10);

  // Simulation d'une jauge de progression fluide (S'arrête à 95% par élégance)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 95 ? 95 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col justify-between relative overflow-hidden antialiased selection:bg-purple-500 selection:text-white">
      
      {/* ---------------- BACKGROUND PRÉMIUM ---------------- */}
      {/* Trame de fond subtile (Effet grille de luxe) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Lueurs néon diffuses en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000s]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-neutral-800/40 rounded-full blur-[100px] pointer-events-none" />

      {/* ---------------- HEADER ISOLÉ ---------------- */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="text-2xl font-serif tracking-[0.3em] font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          SYLITE
        </div>
        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-[9px] font-medium bg-white/5 text-neutral-400 border border-white/10 tracking-[0.2em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
          Mise à niveau
        </div>
      </header>

      {/* ---------------- CONTENU CENTRAL ---------------- */}
      <main className="max-w-4xl mx-auto px-4 py-12 text-center relative z-10 flex flex-col items-center justify-center flex-grow">
        
        {/* Badge Icône Sac Minimaliste */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all duration-700"></div>
          <div className="w-16 h-16 rounded-full bg-neutral-900/80 border border-neutral-800/60 flex items-center justify-center relative z-10 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-neutral-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        </div>

        {/* Titre Éditorial Style Haute Couture */}
        <h1 className="text-4xl sm:text-6xl font-serif tracking-wide text-white mb-6 max-w-3xl leading-[1.15]">
          Ajustement de nos <br />
          <span className="bg-gradient-to-r from-purple-400 via-neutral-200 to-white bg-clip-text text-transparent italic font-normal">rayons virtuels</span>
        </h1>
        
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto font-light leading-relaxed mb-8">
          Notre vitrine en ligne se refait une beauté pour perfectionner votre expérience shopping. Nous revenons d'un instant à l'autre.
        </p>

        {/* Jauge de progression ultra-fine style Apple */}
        <div className="w-48 bg-neutral-900 border border-neutral-800/40 rounded-full h-[3px] mb-12 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Boîte de capture Newsletter VIP / Conciergerie */}
        <div className="w-full max-w-md bg-neutral-900/40 border border-neutral-900/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 block">Accès Privé Prioritaire</span>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Inscrivez-vous pour recevoir une notification immédiate dès la réouverture et un accès exclusif à notre prochaine collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <input 
                  type="email" 
                  required
                  placeholder="Votre adresse e-mail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 text-xs bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-700 transition-colors placeholder:text-neutral-600 font-light"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 text-xs font-semibold rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 transition-all duration-300 whitespace-nowrap tracking-wider"
                >
                  M'inscrire
                </button>
              </div>
            </form>
          ) : (
            <div className="py-4 space-y-2 animate-fadeIn">
              <span className="text-purple-400 text-lg block">✨</span>
              <h4 className="text-sm font-medium text-white tracking-wide">Demande enregistrée</h4>
              <p className="text-xs text-neutral-500 font-light max-w-xs mx-auto">
                Vous ferez partie des premiers informés du retour en ligne du studio.
              </p>
            </div>
          )}

          {/* Section Conciergerie WhatsApp / Alternative direct-to-client */}
          <div className="mt-6 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="max-w-[240px]">
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest block">Conciergerie Active</span>
              <p className="text-[11px] text-neutral-500 font-light mt-0.5">Un coup de cœur ou une commande urgente ? Notre équipe reste à votre écoute.</p>
            </div>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour SYLITE, je souhaite entrer en contact avec le service client pendant la maintenance du site.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 border border-neutral-800 text-xs font-medium rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              Contacter le Studio
            </a>
          </div>

        </div>
      </main>

      {/* ---------------- FOOTER ISOLÉ ---------------- */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center relative z-10 border-t border-neutral-900 text-[9px] text-neutral-600 tracking-[0.25em] uppercase gap-40">
        <div>
          © {new Date().getFullYear()} SYLITE STUDIO. Tous droits réservés.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-neutral-400 transition-colors duration-300">Instagram</a>
          <a href="#" className="hover:text-neutral-400 transition-colors duration-300">TikTok</a>
        </div>
      </footer>

    </div>
  );
}