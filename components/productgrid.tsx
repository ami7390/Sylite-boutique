'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseclient'

// Chargement sécurisé du module
const productsModule = require('../data/products')
const localProducts = productsModule.allProducts || productsModule.products || []

interface Product {
  id?: string
  name: string
  price: string
  category: string
  image_url: string
}

interface ProductGridProps {
  filterCategory?: string
}

export default function ProductGrid({ filterCategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAndSyncProducts = async () => {
      try {
        setLoading(true)
        
        // 1. Récupération depuis Supabase
        let query = (supabase as any).from('products').select('*')

        if (filterCategory) {
          query = query.eq('category', filterCategory)
        }

        const { data: supabaseProducts, error } = await query

        if (error) throw error

        const dbProducts: any[] = supabaseProducts || []

        // 2. Préparation de la liste locale de secours
        const baseLocalList = Array.isArray(localProducts) ? localProducts : []
        const localItemsToFilter = filterCategory
          ? baseLocalList.filter((p: any) => p.category === filterCategory)
          : baseLocalList

        // 3. Synchronisation si la DB est vide ou incomplète
        if (dbProducts.length < localItemsToFilter.length) {
          console.log("Synchronisation de l'univers SyLite vers la base de données...")
          
          const missingProducts = localItemsToFilter.filter((localP: any) => 
            !dbProducts.some((dbP: any) => dbP.name === localP.name)
          )

          if (missingProducts.length > 0) {
            const { error: insertError } = await (supabase as any)
              .from('products')
              .insert(
                missingProducts.map((p: any) => ({
                  name: p.name,
                  price: p.price,
                  category: p.category,
                  // CORRECTION ICI : On prend 'p.image' qui vient de ton fichier et on le met dans 'image_url' pour Supabase
                  image_url: p.image || p.image_url || '/placeholder.jpg'
                }))
              )

            if (!insertError) {
              let updatedQuery = (supabase as any).from('products').select('*')
              if (filterCategory) updatedQuery = updatedQuery.eq('category', filterCategory)
              const { data: updatedData } = await updatedQuery
              setProducts(updatedData || [])
              return
            } else {
              console.error("Erreur insertion Supabase :", insertError)
            }
          }
        }

        setProducts(dbProducts)

      } catch (error) {
        console.error('Erreur, bascule sur les données locales :', error)
        const baseLocalList = Array.isArray(localProducts) ? localProducts : []
        const fallbackData = filterCategory 
          ? baseLocalList.filter((p: any) => p.category === filterCategory)
          : baseLocalList
        
        // CORRECTION ICI : On adapte l'affichage local pour qu'il trouve l'image
        const formattedFallback = fallbackData.map((p: any) => ({
          ...p,
          image_url: p.image || p.image_url || '/placeholder.jpg'
        }))
        setProducts(formattedFallback as Product[])
      } finally {
        setLoading(false)
      }
    }

    fetchAndSyncProducts()
  }, [filterCategory])

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Chargement des articles SyLite...</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-10 text-gray-500">Aucun article trouvé.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product: any) => (
        <div key={product.id || product.name} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col">
          <div className="w-full h-72 bg-gray-100 relative">
            <img 
              src={product.image_url || '/placeholder.jpg'} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded font-medium opacity-90 uppercase">
              {product.category}
            </span>
          </div>

          <div className="p-4 flex flex-col flex-grow justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 min-h-[56px]">{product.name}</h3>
              <p className="text-gray-800 font-medium mt-1">{product.price}</p>
            </div>
            
            <a 
              href={`https://wa.me/22373904319?text=Bonjour,%20je%20suis%20intéressé(e)%20par%20l'article%20:%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white text-center py-2 rounded text-sm font-medium hover:bg-gray-800 transition mt-2"
            >
              Commander via WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}