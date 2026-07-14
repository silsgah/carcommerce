"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SimilarVehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  trim?: string | null;
}

interface SimilarVehiclesProps {
  vehicles: SimilarVehicle[];
}

export function SimilarVehicles({ vehicles }: SimilarVehiclesProps) {
  if (vehicles.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-bold text-foreground">
          Similar Vehicles
        </h3>
        <Link
          href="/inventory"
          className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
        >
          View All Inventory <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((v) => (
          <Link key={v.id} href={`/inventory/${v.slug}`} className="group">
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={v.image}
                  alt={`${v.year} ${v.make} ${v.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-heading font-semibold text-sm text-foreground truncate group-hover:text-brand-500 transition-colors">
                  {v.year} {v.make} {v.model}
                </h4>
                {v.trim && <p className="text-xs text-muted-foreground truncate">{v.trim}</p>}
                <p className="text-sm font-bold text-foreground">
                  {formatPrice(v.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
