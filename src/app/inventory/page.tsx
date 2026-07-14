import { Suspense } from "react";
import type { Metadata } from "next";
import { InventoryContent } from "./inventory-content";

export const metadata: Metadata = {
  title: "Browse Inventory",
  description:
    "Browse our full inventory of new, used, and certified pre-owned vehicles. Filter by make, model, price, year, and more.",
};

export default function InventoryPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
            Browse Our Inventory
          </h1>
          <p className="text-muted-foreground mt-2">
            Find your perfect vehicle from our curated collection
          </p>
        </div>

        <Suspense fallback={<InventoryLoadingSkeleton />}>
          <InventoryContent />
        </Suspense>
      </div>
    </div>
  );
}

function InventoryLoadingSkeleton() {
  return (
    <div className="flex gap-8">
      <div className="hidden lg:block w-64 shrink-0">
        <div className="bg-card rounded-2xl border p-5 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 shimmer-bg rounded" />
              <div className="h-9 w-full shimmer-bg rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="h-10 shimmer-bg rounded-lg mb-6 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-2xl border overflow-hidden">
              <div className="aspect-[4/3] shimmer-bg" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 shimmer-bg rounded" />
                <div className="h-4 w-1/2 shimmer-bg rounded" />
                <div className="h-6 w-1/3 shimmer-bg rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
