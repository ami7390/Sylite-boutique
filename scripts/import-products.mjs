import { createClient } from "@supabase/supabase-js";
import { allProducts } from "../app/data/products.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  console.error(
    "Erreur : SUPABASE_URL ou SUPABASE_SECRET_KEY est absent de .env.import.local."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function convertPrice(price, product) {
  if (typeof price === "number" && Number.isFinite(price)) {
    return Math.round(price);
  }

  const numericPrice = Number.parseInt(
    String(price ?? "").replace(/[^0-9]/g, ""),
    10
  );

  if (!Number.isFinite(numericPrice)) {
    throw new Error(
      `Prix invalide pour le produit ${product.id} : ${product.name}`
    );
  }

  return numericPrice;
}

function prepareProducts() {
  const identifiers = new Set();

  return allProducts.map((product) => {
    if (!product.id || !product.name || !product.category || !product.image) {
      throw new Error(
        `Produit incomplet détecté : ${JSON.stringify(product)}`
      );
    }

    const sourceId = `products-js-${product.id}`;

    if (identifiers.has(sourceId)) {
      throw new Error(
        `Identifiant utilisé plusieurs fois : ${product.id}`
      );
    }

    identifiers.add(sourceId);

    return {
      source_id: sourceId,
      name: product.name.trim(),
      price: convertPrice(product.price, product),
      category: product.category.trim(),
      image_url: product.image,
      badge: product.badge?.trim() || null,
      in_stock: product.inStock !== false,
    };
  });
}

async function importProducts() {
  try {
    const products = prepareProducts();

    console.log(`${products.length} produits sont prêts à être importés.`);

    const batchSize = 50;
    let importedCount = 0;

    for (let index = 0; index < products.length; index += batchSize) {
      const batch = products.slice(index, index + batchSize);

      const { data, error } = await supabase
        .from("products")
        .upsert(batch, {
          onConflict: "source_id",
        })
        .select("id, source_id");

      if (error) {
        throw error;
      }

      importedCount += data?.length ?? 0;
      console.log(
        `Progression : ${importedCount}/${products.length} produits`
      );
    }

    console.log("Importation terminée avec succès.");
    console.log(`${importedCount} produits ajoutés ou mis à jour.`);
  } catch (error) {
    console.error("Échec de l'importation :");
    console.error(error.message || error);
    process.exit(1);
  }
}

await importProducts();