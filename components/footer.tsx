import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Bloc Logo & Description */}
          <div className="space-y-4">
            <div className="relative w-32 h-10">
              <Image 
                src="/logo.png" // Votre logo dans le dossier /public
                alt="SYLITE Logo"
                layout="fill"
                objectFit="contain" // Évite toute distorsion du logo
                priority
              />
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              L'élégance moderne à votre portée. Découvrez nos collections exclusives pensées pour sublimer votre quotidien.
            </p>
          </div>

          {/* Liens de Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-purple-400 transition-colors">Accueil</a></li>
              <li><a href="/nouvel-arrivage" className="hover:text-purple-400 transition-colors">Nouvel Arrivage</a></li>
              <li><a href="/collection" className="hover:text-purple-400 transition-colors">Collection</a></li>
              <li><a href="/contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Informations Légales */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Informations</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/mentions-legales" className="hover:text-purple-400 transition-colors">Mentions Légales</a></li>
              <li><a href="/cgv" className="hover:text-purple-400 transition-colors">Conditions Générales de Vente</a></li>
              <li><a href="/politique-confidentialite" className="hover:text-purple-400 transition-colors">Politique de Confidentialité</a></li>
            </ul>
          </div>

          {/* Newsletter / Contact Rapide */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h3>
            <p className="text-xs mb-3">Besoin d'aide ? Écrivez-nous à :</p>
            <p className="text-sm font-medium text-purple-400">contact@sylite.com</p>
            <div className="flex space-x-4 mt-4 text-lg">
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">📸</a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">🇫</a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Pinterest">📍</a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-[11px] text-neutral-500">
          <p>&copy; {new Date().getFullYear()} SYLITE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}