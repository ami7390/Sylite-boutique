"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseclient';

import { allProducts as productsData } from '@/app/data/products';

interface Product {
  id: string | number;
  name: string;
  price: number | string;
  category: string;
  image_url?: string | null;
  image?: string;
}

interface ProductGridProps {
  filterCategory?: string;
}

export default function ProductGrid({ filterCategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const WHATSAPP_NUMBER = "22394939380";

  useEffect(() => {
    const loadAllProducts = async () => {
      setLoading(true);
      try {
        // 1. Récupération des produits en ligne (Supabase)
        const { data: supabaseProducts, error } = await (supabase as any)
          .from('products')
          .select('*');

        // 2. Récupération de TOUS tes vrais produits depuis app/data/products.js
        const localItems = Array.isArray(productsData) 
          ? productsData 
          : (productsData as any).products || [];

        let combinedList = [...localItems];

        // Si Supabase contient des produits, on les fusionne au début
        if (!error && supabaseProducts && supabaseProducts.length > 0) {
          combinedList = [...supabaseProducts, ...combinedList];
        }

        // 3. Application du filtrage par catégorie
        if (filterCategory) {
          combinedList = combinedList.filter(
            (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
          );
        }

        setProducts(combinedList);
      } catch (err) {
        console.error("Erreur lors du chargement combiné :", err);
        const fallback = Array.isArray(productsData) ? productsData : (productsData as any).products || [];
        setProducts(filterCategory ? fallback.filter((p: any) => p.category === fallback) : fallback);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, [filterCategory]);

  if (loading) {
    return <div className="text-center py-10 text-neutral-400 text-xs animate-pulse">Chargement de la collection SyLite...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        /* ICI : Modification de la key pour s'assurer qu'elle soit unique au monde, combinant ID, nom et index */
        <div key={`product-${product.id}-${product.name}-${index}`} className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between">
          <div className="aspect-square relative overflow-hidden bg-neutral-950">
            <Image 
              src={product.image_url || product.image || "/logo.png"}
              alt={product.name} 
              fill
              unoptimized
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
            <span className="absolute top-3 left-3 bg-purple-900/80 text-purple-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-purple-500/30 backdrop-blur-sm">
              {product.category}
            </span>
          </div>
          
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white tracking-wide">{product.name}</h4>
              <p className="text-purple-400 font-serif font-semibold text-sm mt-1">{product.price} FCFA</p>
            </div>

            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20SyLite,%20je%20souhaite%20commander%20l'article%20%22${encodeURIComponent(product.name)}%22%20au%20prix%20de%20${product.price}%20FCFA.`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full text-center py-2.5 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-md shadow-purple-700/20 flex items-center justify-center gap-2"
            >
              Commander via WhatsApp 💬
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
