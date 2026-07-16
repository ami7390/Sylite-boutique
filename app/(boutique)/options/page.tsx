import { Suspense } from "react";
import OptionsClient from "./OptionsClient";

export default function OptionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <p className="text-xs text-neutral-400 animate-pulse">
            Chargement du produit...
          </p>
        </div>
      }
    >
      <OptionsClient />
    </Suspense>
  );
}
