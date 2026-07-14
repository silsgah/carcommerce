"use client";

import { useFavoritesStore } from "@/stores/favorites-store";
import { formatPrice, cn } from "@/lib/utils";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Saved Vehicles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="rounded-2xl overflow-hidden border">
              <div className="aspect-[4/3] shimmer-bg" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-2/3 shimmer-bg rounded" />
                <div className="h-4 w-1/3 shimmer-bg rounded" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Saved Vehicles
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Vehicles you have saved for later review
            </p>
          </div>
          {favorites.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFavorites}
              className="text-xs rounded-lg"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-dashed">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-7 w-7 text-muted-foreground/60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your favorites tray is empty
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Browse our inventory and tap the heart icon on any vehicle card to save it here.
            </p>
            <Link href="/inventory">
              <Button className="bg-brand-600 text-white rounded-full">
                Browse Inventory
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((v) => (
              <div
                key={v.id}
                className="group bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={v.image || "/placeholder-car.jpg"}
                    alt={`${v.year} ${v.make} ${v.model}`}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFavorite(v.id)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-md backdrop-blur-sm transition-colors border-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-[15px] text-foreground">
                      {v.year} {v.make} {v.model}
                    </h3>
                    {v.trim && <p className="text-xs text-muted-foreground mt-0.5">{v.trim}</p>}
                    <p className="text-lg font-bold text-foreground mt-2">
                      {formatPrice(v.price)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2">
                    <Link href={`/inventory/${v.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full text-xs h-9 rounded-lg">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
