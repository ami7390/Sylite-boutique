import { supabase } from "@/lib/supabaseclient";

export const PRODUCTS_CHANGED_EVENT = "sylite:products-changed";
const PRODUCTS_CHANGED_STORAGE_KEY = "sylite_products_changed_at";

export function notifyProductsChanged() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(PRODUCTS_CHANGED_EVENT));
  localStorage.setItem(PRODUCTS_CHANGED_STORAGE_KEY, Date.now().toString());
}

export function subscribeToProductChanges(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleLocalChange = () => onChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === PRODUCTS_CHANGED_STORAGE_KEY) onChange();
  };
  const handleVisibility = () => {
    if (document.visibilityState === "visible") onChange();
  };

  window.addEventListener(PRODUCTS_CHANGED_EVENT, handleLocalChange);
  window.addEventListener("storage", handleStorage);
  window.addEventListener("focus", handleLocalChange);
  document.addEventListener("visibilitychange", handleVisibility);

  const channel = supabase
    .channel(`products-sync-${crypto.randomUUID()}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "products" },
      onChange
    )
    .subscribe();

  return () => {
    window.removeEventListener(PRODUCTS_CHANGED_EVENT, handleLocalChange);
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("focus", handleLocalChange);
    document.removeEventListener("visibilitychange", handleVisibility);
    void supabase.removeChannel(channel);
  };
}
