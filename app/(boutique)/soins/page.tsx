"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseclient";
import { subscribeToProductChanges } from "@/lib/product-sync";

interface CareProduct {
  id: number | string;
  name: string;
  price: number | string;
  category: string;
  image_url?: string | null;
  image?: string | null;
  badge?: string | null;
  tag?: string | null;
  in_stock?: boolean | null;
}

const WHATSAPP_NUMBER = "22373904319";

function belongsToCare(category: string) {
  const normalized = category.trim().toLocaleLowerCase("fr");
  return normalized.includes("soin") || normalized.includes("méditation") || normalized.includes("meditation");
}

function formatPrice(price: number | string) {
  const amount = typeof price === "number" ? price : Number(price.replace(/[^0-9]/g, ""));
  return `${Number.isFinite(amount) ? amount.toLocaleString("fr-FR") : "0"} FCFA`;
}

export default function SoinsPage() {
  const [products, setProducts] = useState<CareProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors du chargement des soins :", error.message);
    } else {
      setProducts((data ?? []) as CareProduct[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchProducts();
    return subscribeToProductChanges(() => void fetchProducts());
  }, [fetchProducts]);

  const careProducts = useMemo(
    () => products.filter((product) => belongsToCare(product.category || "")),
    [products]
  );

  const orderOnWhatsApp = (product: CareProduct) => {
    const message = [
      "Bonjour SYLITE !",
      "",
      "Je souhaite commander ce produit :",
      `• ${product.name}`,
      `• Catégorie : ${product.category}`,
      `• Prix : ${formatPrice(product.price)}`,
      "",
      "Pouvez-vous me confirmer sa disponibilité et les modalités de livraison ?",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-purple-600 selection:text-white">
      <header className="relative isolate overflow-hidden bg-neutral-950 px-4 py-24 text-white sm:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.35),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.25),transparent_35%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-neutral-950/80" />
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-300">
            Rituel • Équilibre • Bien-être
          </span>
          <h1 className="mt-6 font-serif text-5xl font-light tracking-tight sm:text-7xl">
            Soins & Méditation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-7 text-neutral-300 sm:text-base">
            Une sélection pensée pour prendre soin du corps, apaiser l&apos;esprit et transformer chaque instant en un véritable rituel de bien-être.
          </p>
          <a
            href="#produits-soins"
            className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-xs font-bold text-neutral-950 transition hover:bg-purple-500 hover:text-white"
          >
            Découvrir la sélection <span className="ml-2">↓</span>
          </a>
        </div>
      </header>

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-neutral-200 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {[
            ["✦", "Sélection experte", "Des essentiels choisis avec soin"],
            ["♡", "Bien-être au quotidien", "Pour le corps et l'esprit"],
            ["◉", "Commande directe", "Accompagnement personnalisé sur WhatsApp"],
          ].map(([icon, title, text]) => (
            <div key={title} className="flex items-center gap-4 px-5 py-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600">{icon}</span>
              <div>
                <p className="text-xs font-bold text-neutral-900">{title}</p>
                <p className="mt-1 text-[11px] text-neutral-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main id="produits-soins" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-3 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-600">Collection bien-être</span>
            <h2 className="mt-2 font-serif text-3xl text-neutral-900 sm:text-4xl">Nos essentiels</h2>
          </div>
          {!loading && <p className="text-xs font-medium text-neutral-500">{careProducts.length} produit{careProducts.length > 1 ? "s" : ""}</p>}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[470px] animate-pulse rounded-2xl bg-white shadow-sm" />
            ))}
          </div>
        ) : careProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
            <p className="font-serif text-2xl text-neutral-800">La sélection arrive bientôt</p>
            <p className="mt-2 text-sm text-neutral-500">Ajoutez dans l&apos;administration des produits de catégorie Soins ou Méditation.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {careProducts.map((product) => {
              const image = product.image_url || product.image || "/shopping-removebg-preview.png";
              const imageIsBroken = brokenImages[String(product.id)];
              const label = product.badge || product.tag;

              return (
                <article key={product.id} className="group flex overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex w-full flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                      <Image
                        src={imageIsBroken ? "/shopping-removebg-preview.png" : image}
                        alt={product.name}
                        fill
                        unoptimized
                        onError={() => setBrokenImages((current) => ({ ...current, [String(product.id)]: true }))}
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                      {label && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
                          {label}
                        </span>
                      )}
                      <span className={`absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-[9px] font-bold ${product.in_stock === false ? "bg-neutral-900 text-white" : "bg-emerald-500 text-white"}`}>
                        {product.in_stock === false ? "Indisponible" : "Disponible"}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-600">{product.category}</p>
                      <h3 className="mt-2 min-h-12 text-sm font-semibold leading-6 text-neutral-900">{product.name}</h3>
                      <p className="mt-4 text-lg font-bold text-neutral-950">{formatPrice(product.price)}</p>
                      <button
                        type="button"
                        disabled={product.in_stock === false}
                        onClick={() => orderOnWhatsApp(product)}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1fb85a] hover:shadow-md disabled:cursor-not-allowed disabled:bg-neutral-300"
                      >
                        <span aria-hidden="true">◉</span>
                        {product.in_stock === false ? "Produit indisponible" : "Commander sur WhatsApp"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
