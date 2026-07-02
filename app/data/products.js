// src/data/products.js

// 1. Déclaration et exportation du tableau de tous tes produits
export const allProducts = [
  {
    id: 1,
    name: "Ensemble Femme Chic et Tendance",
    price: "75.000 FCFA",
    category: "Ensemble",
    badge: "Tendance",
    image: "/ensemble-fleuri.jpg", // Le chemin vers ton image dans le dossier public
  },
  {
    id: 2,
    name: "Nuisette en 100% coton",
    price: "45.000 FCFA",
    category: "Nuisette",
    badge: "Incontournable",
    image: "/nusette.jpg",
  },
   { 
      id: 3, 
      name: "Gaine Amincissante Ventre Plat Invisible", 
      price: "7.000 FCFA", 
      category: "Gaines", 
      badge: "Populaire", 
      image: "/gaine-ceinture-7000.jpg",
      isNew: false
    },
    { 
      id: 4, 
      name: "Body String Échancré Dos Nu Noir", 
      price: "2.000 FCFA", 
      category: "Body", 
      badge: "Nouveau", 
      image: "/body 2000.jpg",
      isNew: true
    },
    { 
      id: 5, 
      name: "Diffuseur d'Huiles Essentielles Ultrasonique", 
      price: "22.500 FCFA", 
      category: "Bien-être", 
      badge: "Ambiance", 
      image: "/diffuseur 8000.jpg",
      isNew: true
    },
    { 
      id: 52, 
      name: "Diffuseur d'Huiles Essentielles Small", 
      price: "8.000 FCFA", 
      category: "Bien-être", 
      badge: "Compact", 
      image: "/humidificateur 20000.png",
      isNew: true
    },
    { 
      id: 53, 
      name: "Diffuseur d'Huiles Essentielles Mini", 
       category: "Bien-être", 
      badge: "Discret", 
      image: "/humidificateur-7500.jpg",
      isNew: true
    },
    { 
      id: 54, 
      name: "Diffuseur d'Huiles Essentielles Premium", 
      price: "20.000 FCFA", 
      category: "Bien-être", 
      badge: "Luxe", 
      image: "/diffuseur-8000.jpg",
      isNew: true
    },
    { 
      id: 6, 
      name: "Accessoire de Tête - Epingle", 
      price: "1.000 FCFA", 
      category: "Accessoire de tête", 
      badge: "Exclusif", 
      image: "/boite-epingles-pour-hijab.jpg",
      isNew: false
    },
    { 
      id: 62, 
      name: "Barette Stylisée en Cristal", 
      price: "1.000 FCFA", 
      category: "Accessoire de tête", 
      badge: "Élégant", 
      image: "/barette-500.jpg",
      isNew: true
    },
    { 
      id: 63, 
      name: "Bonnet de Maintien Confort", 
      price: "1.500 FCFA", 
      category: "Accessoire de tête", 
      badge: "Maintien", 
      image: "/bonet-500.jpg",
      isNew: true
    },
    { 
      id: 7, 
      name: "Foulard en Soie Imprimé Satiné Luxe", 
      price: "2.000 FCFA", 
      category: "Foulards", 
      badge: "Must-Have", 
      image: "/foulard habiba.jpg",
      isNew: false
    },
    { 
      id: 8, 
      name: "Voile en Mousseline Premium Haute Qualité", 
      price: "2.000 FCFA", 
      category: "Voiles", 
      badge: "Nouveau", 
      image: "/muslim 2000.jpg",
      isNew: true
    },
    { 
      id: 82, 
      name: "Voile Fluide Taille 3XL", 
      price: "3.500 FCFA", 
      category: "Voiles", 
      badge: "Large", 
      image: "/voile-3xl.png",
      isNew: true
    },
    { 
      id: 83, 
      name: "Voile Fluide Taille 5XL", 
      price: "5.000 FCFA", 
      category: "Voiles", 
      badge: "Maxi XL", 
      image: "/voile 5xl.jpg",
      isNew: true
    },
    { 
      id: 84, 
      name: "Robe de Prière Soyeuse", 
      price: "12.000 FCFA", 
      category: "Voiles", 
      badge: "Tradition", 
      image: "/khimar complet 12000.jpg",
      isNew: true
    },
    { 
      id: 85, 
      name: "Robe de Prière Fluide (Édition Classique)", 
      price: "6.000 FCFA", 
      category: "Voiles", 
      badge: "Essentiel", 
      image: "/hidjab.jpg",
      isNew: false
    },
    { 
      id: 86, 
      name: "Robe de Prière Premium Confort Plus", 
      price: "12.000 FCFA", 
      category: "Voiles", 
      badge: "Prestige", 
      image: "/khimar-complet.jpg",
      isNew: true
    },
    { 
      id: 9, 
      name: "Collant Opaque Extensible Noir Confort", 
      price: "6.000 FCFA", 
      category: "Collant", 
      badge: "Essentiel", 
      image: "/collant.png",
      isNew: false
    },
    { 
      id: 10, 
      name: "Kit Soin et Méditation - bain de pieds", 
      price: "10.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Zen", 
      image: "/bain-de-pied-10000.jpg",
      isNew: true
    },
    { 
      id: 102, 
      name: "Soin Détox Intime Végétal", 
      price: "8.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Pureté", 
      image: "/yoni-detox-6000.jpg",
      isNew: true
    },
    { 
      id: 103, 
      name: "Chapelet de Méditation Artisanal", 
      price: "2.500 FCFA", 
      category: "Soin et méditation", 
      badge: "Spiritualité", 
      image: "/chapelet.jpg",
      isNew: false
    },
    { 
      id: 104, 
      name: "Serviette de Bain Douceur Absolue", 
      price: "6.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Confort", 
      image: "/serviette-bain.jpg",
      isNew: false
    },
    { 
      id: 105, 
      name: "Bain de Pied électrique Hydromassant", 
      price: "6.000 FCFA", 
      category: "Soin et méditation", 
      badge: "Thérapie", 
      image: "/bain-electrique.jpg",
      isNew: true
    },
     { 
      id: 106, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confornt", 
      image: "/collant-court.jpg",
      isNew: true
    },
     { 
      id: 107, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/collant-court1.jpg",
      isNew: true
    },
     { 
      id: 108, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/collant-court3.jpg",
      isNew: true
    },
     { 
      id: 109, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/collant-court6.jpg",
      isNew: true
    },
     { 
      id: 110, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/ensemble-colant.jpg",
      isNew: true
    },
     { 
      id: 111, 
      name: "Collant Court ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "confort", 
      image: "/ensemble-colant1.jpg",
      isNew: true
    },
     { 
      id: 112, 
      name: "Culotte Gainante-Ventre Plat ", 
      price: "4.000 FCFA", 
      category: "gaine", 
      badge: "Belle-Forme", 
      image: "/gaine-2-4000.png",
      isNew: true
    },
     { 
      id: 113, 
      name: "Corset Gainant ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-abdo.png",
      isNew: true
    },
    { 
      id: 114, 
      name: "Gaine Body ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-body-15000.jpg",
      isNew: true
    },
     { 
      id: 115, 
      name: "Gaine Body ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-body2.jpg",
      isNew: true
    },
     { 
      id: 116, 
      name: "Gaine galbant Scuptante-Forme ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/chifoni.jpg",
      isNew: true
    },
    { 
      id: 117, 
      name: "Gaine galbant Scuptante-Forme Transparente ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-transparent.png",
      isNew: true
    },
    { 
      id: 118, 
      name: "Corset Beige ", 
      price: "7.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-ceinture.png",
      isNew: true
    },
    { 
      id: 119, 
      name: "Culotte Gainante", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-4000.jpg",
      isNew: true
    },
    { 
      id: 120, 
      name: "Culotte Gainante ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-2.jpg",
      isNew: true
    },
    { 
      id: 121, 
      name: "Culotte Gainante Remontant Fessier  ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-6.jpg",
      isNew: true
    },
    { 
      id: 122, 
      name: "Culotte Gainante Remontant Fessier", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-7.jpg",
      isNew: true
    },
    { 
      id: 123, 
      name: "Culotte Gainante Galbant ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-8.jpg",
      isNew: true
    },
    { 
      id: 124, 
      name: "Culotte Gainante scuptante-Ventre Plat ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-court-9.jpg",
      isNew: true
    },
    { 
      id: 125, 
      name: "Culotte Gainante Galtante-Ventre Plat ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-culotte 1.jpg",
      isNew: true
    },
    { 
      id: 126, 
      name: "Culotte Gainante Galtante Scuptante ", 
      price: "12.500 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-culotte.jpg",
      isNew: true
    },
    { 
      id: 127, 
      name: "Culotte Gainante Ventre Plat Scuptant Fessier ", 
      price: "5.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-culotte-bege.jpg",
      isNew: true
    },
    { 
      id: 128, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-longue.jpg",
      isNew: true
    },
    { 
      id: 129, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long-0.jpg",
      isNew: true
    },
    { 
      id: 130, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long1.jpg",
      isNew: true
    },
    { 
      id: 131, 
      name: "Gaine Ceinture ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long2.jpg",
      isNew: true
    },
    { 
      id: 132, 
      name: "Gaine Ceinture-Ventre Plat ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long3.jpg",
      isNew: true
    },
     { 
      id: 133, 
      name: "Gaine Ceinture-Ventre Plat ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-long-5.jpg",
      isNew: true
    },
     { 
      id: 134, 
      name: "Gaine Culotte Galbante-Ventre Plat sans trace ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-sculptante.jpg",
      isNew: true
    },
     { 
      id: 135, 
      name: "Gaine Culotte Galbante-Ventre Plat sans trace ", 
      price: "15.000 FCFA", 
      category: "gaine", 
      badge: "Belle-forme", 
      image: "/gaine-sculptante-silhouette.jpg",
      isNew: true
    },
     { 
      id: 136, 
      name: "Gaine Culotte Galbante-Ventre Plat sans trace ", 
      price: "6.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/deux-piece.jpg",
      isNew: true
    },
   { 
      id: 137, 
      name: "Nuisette Cotton Confort ", 
      price: "6.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/deux-piece.jpg",
      isNew: true
    },
    { 
      id: 138, 
      name: "Ensemble Sous-Vêtement ", 
      price: "5.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/ensemble sous-vetement.jpg",
      isNew: true
    },
    { 
      id: 139, 
      name: "Ensemble Sous-Vêtement Bi-couleure", 
      price: "7.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/ensemble-body.jpg",
      isNew: true
    },
    { 
      id: 140, 
      name: "Nuisette fleurie ", 
      price: "6.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/nuisette.jpg",
      isNew: true
    },
     { 
      id: 141, 
      name: "Nuisette Fleurie-Bleue  ", 
      price: "6.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/nuisette0.jpg",
      isNew: true
    },
     { 
      id: 142, 
      name: "Nuisette Velure Rouge ", 
      price: "7.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/nuisette-1.jpg",
      isNew: true
    },
    { 
      id: 143, 
      name: "Nuisette Velure Noir ", 
      price: "7.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/nuisette-2.jpg",
      isNew: true
    },
    { 
      id: 144, 
      name: "Nuisette Fleurie Beige ", 
      price: "6.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/nuisette3.jpg",
      isNew: true
    },
    { 
      id: 145, 
      name: "Nuisette Velure Noir Simple ", 
      price: "7.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/nuisette-3.jpg",
      isNew: true
    },
    { 
      id: 146, 
      name: "Nuisette Velure 3-Couleure ", 
      price: "7.000 FCFA", 
      category: "nuisette", 
      badge: "Incontournable", 
      image: "/nuisette-4.jpg",
      isNew: true
    },
     { 
      id: 146, 
      name: "Jupe plissée fleurie ", 
      price: "4.000 FCFA", 
      category: "jupe", 
      badge: "Agreable", 
      image: "/jupe-4000.jpg",
      isNew: true
    },
     { 
      id: 147, 
      name: "Jupe Longue ", 
      price: "4.000 FCFA", 
      category: "jupe", 
      badge: "Agreable", 
      image: "/jupe-longue.jpg",
      isNew: true
    },
     { 
      id: 148, 
      name: "Robe ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/ensemble 7500.jpg",
      isNew: true
    },
     { 
      id: 149, 
      name: "Robe 2 pièce ", 
      price: "20.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-2-piece.jpg",
      isNew: true
    },
    { 
      id: 150, 
      name: "Robe Manche Longue ", 
      price: "12.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-12500.jpg",
      isNew: true
    },
    { 
      id: 151, 
      name: "Robe 2 pièce Avec Ceinture ", 
      price: "6.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-2-piece-6000.jpg",
      isNew: true
    },
    { 
      id: 152, 
      name: "Robe plissée ", 
      price: "10.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-chic.jpg",
      isNew: true
    },
    { 
      id: 153, 
      name: "Robe Bi-Color ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-ensemble.jpg",
      isNew: true
    },
    { 
      id: 154, 
      name: "Robe Evasée ", 
      price: "13.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-kashka.jpg",
      isNew: true
    },
    { 
      id: 155, 
      name: "Robe-Large ", 
      price: "8.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-large.png",
      isNew: true
    },
    { 
      id: 156, 
      name: "Robe Longue", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-longue.jpg",
      isNew: true
    },
    { 
      id: 157, 
      name: "Robe Simple ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-simple.jpg",
      isNew: true
    },
    { 
      id: 158, 
      name: "Robe De Prière ", 
      price: "6.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-de-priere.jpg",
      isNew: true
    },
    { 
      id: 159, 
      name: "Robe Courte ", 
      price: "6.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-3000.jpg",
      isNew: true
    },
    { 
      id: 160, 
      name: "Robe Rouge Perlée ", 
      price: "7.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-7000.jpg",
      isNew: true
    },
    { 
      id: 161, 
      name: "Robe Chic De Soirée ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-7500.png",
      isNew: true
    },
     { 
      id: 162, 
      name: "Robe Chic  ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/ensemble-bleu.png",
      isNew: true
    },
     { 
      id: 163, 
      name: "Robe Violette ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-violet.png",
      isNew: true
    },
     { 
      id: 164, 
      name: "Robe V De Soirée ", 
      price: "10.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-v.png",
      isNew: true
    },
     { 
      id: 165, 
      name: "Robe Manche Longue ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-manche-longue.png",
      isNew: true
    },
     { 
      id: 166, 
      name: "Robe Rose Double Manches ", 
      price: "10.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-rose.png",
      isNew: true
    },
    { 
      id: 167, 
      name: "Robe Brodée ", 
      price: "10.000 FCFA", 
      category: "ensemble", 
      badge: "Ensemble-Chic", 
      image: "/robe-brode.png",
      isNew: true
    },
    { 
      id: 168, 
      name: "Ensemble Jupe ", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "Style", 
      image: "/2-pieces-7500.jpg",
      isNew: true
    },
    { 
      id: 169, 
      name: "Ensemble Pantalon ", 
      price: "10.000 FCFA", 
      category: "ensemble", 
      badge: "style", 
      image: "/ensemble-patalon.jpg",
      isNew: true
    },
     { 
      id: 170, 
      name: "Ensemble Pantalon ", 
      price: "6.000 FCFA", 
      category: "ensemble", 
      badge: "style", 
      image: "/ensemble-pantalon-.jpg",
      isNew: true
    },
     { 
      id: 171, 
      name: "Ensemble Patalon  fleuri", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "style", 
      image: "/ensemble-p-.jpg",
      isNew: true
    },
     { 
      id: 172, 
      name: "Ensemble Patalon Rose", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "style", 
      image: "/ensemble-patalon-7500.jpg",
      isNew: true
    },
     { 
      id: 173, 
      name: "Ensemble Jupe", 
      price: "7.500 FCFA", 
      category: "ensemble", 
      badge: "style", 
      image: "/jupe-complet-6000.jpg",
      isNew: true
    },
     { 
      id: 174, 
      name: "BodyAccel Dentrice Blanchissante", 
      price: "5.000 FCFA", 
      category: "soin et meditation", 
      badge: "soin", 
      image: "/bodyaccuel.jpg",
      isNew: true
    },
     { 
      id: 175, 
      name: "Gel Orange Elémine toutes les taches du corps", 
      price: "5.000 FCFA", 
      category: "soin et meditation", 
      badge: "soin", 
      image: "/gel.jpg",
      isNew: true
    },
     { 
      id: 176, 
      name: "Seoul 1980", 
      price: "5.000 FCFA", 
      category: "soin et meditation", 
      badge: "soin", 
      image: "/seoul.jpg",
      isNew: true
    },
     { 
      id: 177, 
      name: "Masseur", 
      price: "7.500 FCFA", 
      category: "soin et meditation", 
      badge: "soin", 
      image: "/masseur-7500.png",
      isNew: true
    },
     { 
      id: 178, 
      name: "Slim Patch un produit minceur Ventre Plat", 
      price: "5.000 FCFA", 
      category: "soin et meditation", 
      badge: "soin", 
      image: "/slim-3.jpg",
      isNew: true
    },
   { 
      id: 179, 
      name: "Gourde  Pliable en silicone", 
      price: "5.000 FCFA", 
      category: "soin et meditation", 
      badge: "soin", 
      image: "/gourde.jpg",
      isNew: true
    },
     { 
      id: 180, 
      name: "Crop-Top", 
      price: "1.500 FCFA", 
      category: "body", 
      badge: "Décontractée", 
      image: "/body-1500.jpg",
      isNew: true
    },
     { 
      id: 181, 
      name: "Crop-Top en cotton", 
      price: "1.500 FCFA", 
      category: "body", 
      badge: "Décontractée", 
      image: "/bodys-1500.jpg",
      isNew: true
    },
     { 
      id: 182, 
      name: "Crop-Top Dos nu", 
      price: "1.500 FCFA", 
      category: "body", 
      badge: "Décontractée", 
      image: "/crop-tops-1500.jpg",
      isNew: true
    },
    { 
      id: 183, 
      name: "Crop-Top à bretelles fine", 
      price: "1.500 FCFA", 
      category: "body", 
      badge: "Décontractée", 
      image: "/crop-top-1500.jpg",
      isNew: true
    },
    { 
      id: 184, 
      name: "Collant Culotte", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collant-7.jpg",
      isNew: true
    },
    { 
      id: 185, 
      name: "Collant Culotte ", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collants.jpg",
      isNew: true
    },
    { 
      id: 186, 
      name: "Collant Culotte", 
      price: "5.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collants-1.jpg",
      isNew: true
    },
    { 
      id: 187, 
      name: "Collant Culotte 100% coton", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collants-2.jpg",
      isNew: true
    },
    { 
      id: 188, 
      name: "Collant Culotte 100% coton", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collants-3.jpg",
      isNew: true
    },
    { 
      id: 189, 
      name: "Collant Culotte 100% coton", 
      price: "3.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collants-4.jpg",
      isNew: true
    },
    { 
      id: 190, 
      name: "Collant Culotte 100% coton", 
      price: "5.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collants-5.jpg",
      isNew: true
    },
    { 
      id: 191, 
      name: "Collant Culotte", 
      price: "5.000 FCFA", 
      category: "collant", 
      badge: "Essentiel", 
      image: "/collants-6.jpg",
      isNew: true
    },
    { 
      id: 192, 
      name: "Soutien-Gorge Minimiseur sans armature Multi-Couleur", 
      price: "2.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient.jpg",
      isNew: true
    },
    { 
      id: 193, 
      name: "Soutien-Gorge Minimiseur sans armature réduit la poitrine d'une taille de bonnet, bretelles élastiques", 
      price: "2.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-1.jpg",
      isNew: true
    },
    { 
      id: 194, 
      name: "Soutien-Gorge Minimiseur sans armature réduit la poitrine d'une taille de bonnet, bretelles élastiques", 
      price: "2.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-6.jpg",
      isNew: true
    },
    { 
      id: 195, 
      name: "Soutien-Gorge Minimiseur sans armature réduit la poitrine d'une taille de bonnet, bretelles élastiques", 
      price: "2.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-7.jpg",
      isNew: true
    },
    { 
      id: 196, 
      name: "Soutien-Gorge Minimiseur sans armature réduit la poitrine d'une taille de bonnet, bretelles élastiques", 
      price: "2.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-9.jpg",
      isNew: true
    },
    { 
      id: 197, 
      name: "Soutien-Gorge Minimiseur sans armature réduit la poitrine d'une taille de bonnet, bretelles élastiques", 
      price: "2.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-10.jpg",
      isNew: true
    },
{ 
      id: 198, 
      name: "Soutien-Gorge Minimiseur Fermeture Devant sans armature, bretelles élastiques, Confort pour Taille Grande", 
      price: "7.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-4.jpg",
      isNew: true
    },
    { 
      id: 199, 
      name: "Soutien-Gorge Minimiseur sans armature réduit la poitrine d'une taille de bonnet, bretelles élastiques", 
      price: "7.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-2.jpg",
      isNew: true
    },
    { 
      id: 200, 
      name: "Soutien-Gorge Minimiseur sans armature réduit la poitrine d'une taille de bonnet, bretelles élastiques", 
      price: "7.000 FCFA", 
      category: "Soutien-Gorge", 
      badge: "Seconde Peau", 
      image: "/soutient-5.jpg",
      isNew: true
    },
   
    {
      id: 11,
      name: "Robot Domestique Intuitif & Électroménager Connecté",
      price: "Sur Devis",
      category: "Électroménager",
      badge: "Technologie",
      image: "/electro.jpg",
      isNew: true
    }
  // ... Ajoute l'intégralité de tes 180+ produits ici avec la même structure
];

// 2. Extraction automatique des catégories uniques
// Cette ligne parcourt le tableau ci-dessus, récupère chaque 'category',
// supprime les doublons grâce à 'Set' et ajoute "Tous" au début.
export const allCategories = ["Tous", ...Array.from(new Set(allProducts.map(p => p.category)))];