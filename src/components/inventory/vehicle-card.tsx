"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, GitCompareArrows, Gauge, Fuel, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useCompareStore } from "@/stores/compare-store";
import { formatPrice, formatMileage, cn } from "@/lib/utils";
import { toast } from "sonner";

export interface VehicleCardData {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim?: string | null;
  year: number;
  price: number;
  mileage: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  condition: string;
  status: string;
  images: string[];
  isNewArrival: boolean;
  isPriceDrop: boolean;
  previousPrice?: number | null;
  horsepower?: number | null;
  mpgCity?: number | null;
  mpgHighway?: number | null;
  engineInfo?: string | null;
  features: string[];
}

interface VehicleCardProps {
  vehicle: VehicleCardData;
  view?: "grid" | "list";
  index?: number;
}

export function VehicleCard({ vehicle, view = "grid", index = 0 }: VehicleCardProps) {
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(vehicle.id));

  const addToCompare = useCompareStore((s) => s.addVehicle);
  const removeFromCompare = useCompareStore((s) => s.removeVehicle);
  const isInCompare = useCompareStore((s) => s.isInCompare(vehicle.id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(vehicle.id);
      toast("Removed from favorites");
    } else {
      addFavorite({
        id: vehicle.id,
        slug: vehicle.slug,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        image: vehicle.images[0] || "",
        trim: vehicle.trim,
      });
      toast("Added to favorites");
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare) {
      removeFromCompare(vehicle.id);
      toast("Removed from compare");
    } else {
      const added = addToCompare({
        id: vehicle.id,
        slug: vehicle.slug,
        make: vehicle.make,
        model: vehicle.model,
        trim: vehicle.trim,
        year: vehicle.year,
        price: vehicle.price,
        mileage: vehicle.mileage,
        image: vehicle.images[0] || "",
        bodyType: vehicle.bodyType,
        fuelType: vehicle.fuelType,
        transmission: vehicle.transmission,
        drivetrain: vehicle.drivetrain,
        exteriorColor: vehicle.exteriorColor,
        horsepower: vehicle.horsepower,
        mpgCity: vehicle.mpgCity,
        mpgHighway: vehicle.mpgHighway,
        engineInfo: vehicle.engineInfo,
        features: vehicle.features,
      });
      if (added) {
        toast("Added to compare");
      } else {
        toast("Compare is full (max 4 vehicles)");
      }
    }
  };

  const conditionLabel =
    vehicle.condition === "CERTIFIED"
      ? "CPO"
      : vehicle.condition === "NEW"
        ? "New"
        : "Used";

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link href={`/inventory/${vehicle.slug}`}>
          <div className="group bg-card rounded-2xl border border-border/60 hover:border-border-hover hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative sm:w-72 lg:w-80 h-48 sm:h-auto shrink-0 overflow-hidden">
              <Image
                src={vehicle.images[0] || "/placeholder-car.jpg"}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 320px"
              />
              <div className="absolute top-3 left-3 flex gap-1.5">
                {vehicle.isNewArrival && (
                  <Badge className="bg-blue-500 text-white border-0 text-[10px] font-semibold">
                    New Arrival
                  </Badge>
                )}
                {vehicle.isPriceDrop && (
                  <Badge className="bg-green-500 text-white border-0 text-[10px] font-semibold">
                    Price Drop
                  </Badge>
                )}
                <Badge
                  variant={vehicle.condition === "NEW" ? "default" : "secondary"}
                  className="text-[10px] font-semibold"
                >
                  {conditionLabel}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                      {vehicle.trim && (
                        <span className="text-muted-foreground font-normal text-base"> {vehicle.trim}</span>
                      )}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Gauge className="h-3.5 w-3.5" />
                        {formatMileage(vehicle.mileage)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Fuel className="h-3.5 w-3.5" />
                        {vehicle.fuelType.replace("_", " ")}
                      </span>
                      <span>{vehicle.transmission}</span>
                      <span>{vehicle.drivetrain}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">
                      {formatPrice(vehicle.price)}
                    </p>
                    {vehicle.isPriceDrop && vehicle.previousPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        {formatPrice(vehicle.previousPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "rounded-full h-9 w-9",
                          isFavorite && "text-red-500 border-red-200 bg-red-50 dark:bg-red-950/30"
                        )}
                        onClick={handleFavorite}
                      >
                        <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                      </Button>
                    }
                  />
                  <TooltipContent>{isFavorite ? "Remove from favorites" : "Add to favorites"}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "rounded-full h-9 w-9",
                          isInCompare && "text-brand-500 border-brand-200 bg-brand-50 dark:bg-brand-950/30"
                        )}
                        onClick={handleCompare}
                      >
                        <GitCompareArrows className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <TooltipContent>{isInCompare ? "Remove from compare" : "Add to compare"}</TooltipContent>
                </Tooltip>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full ml-auto"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/inventory/${vehicle.slug}`}>
        <div className="group bg-card rounded-2xl border border-border/60 hover:border-border-hover hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={vehicle.images[0] || "/placeholder-car.jpg"}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {vehicle.isNewArrival && (
                <Badge className="bg-blue-500 text-white border-0 text-[10px] font-semibold shadow-lg">
                  New Arrival
                </Badge>
              )}
              {vehicle.isPriceDrop && (
                <Badge className="bg-green-500 text-white border-0 text-[10px] font-semibold shadow-lg">
                  Price Drop
                </Badge>
              )}
            </div>

            {/* Quick actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  "rounded-full h-8 w-8 bg-white/90 dark:bg-black/60 shadow-md backdrop-blur-sm hover:scale-110 transition-transform",
                  isFavorite && "text-red-500"
                )}
                onClick={handleFavorite}
              >
                <Heart className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  "rounded-full h-8 w-8 bg-white/90 dark:bg-black/60 shadow-md backdrop-blur-sm hover:scale-110 transition-transform",
                  isInCompare && "text-brand-500"
                )}
                onClick={handleCompare}
              >
                <GitCompareArrows className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Condition badge */}
            <div className="absolute bottom-3 left-3">
              <Badge
                className={cn(
                  "text-[10px] font-semibold shadow-lg backdrop-blur-sm",
                  vehicle.condition === "NEW"
                    ? "bg-brand-600 text-white border-0"
                    : vehicle.condition === "CERTIFIED"
                      ? "bg-amber-500 text-white border-0"
                      : "bg-white/90 text-foreground border-0"
                )}
              >
                {conditionLabel}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-semibold text-[15px] text-foreground leading-tight">
                {vehicle.year} {vehicle.make} {vehicle.model}
                {vehicle.trim && (
                  <span className="text-muted-foreground font-normal text-sm block mt-0.5">
                    {vehicle.trim}
                  </span>
                )}
              </h3>
            </div>

            <div className="flex items-center gap-2.5 mt-2.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Gauge className="h-3 w-3" />
                {formatMileage(vehicle.mileage)}
              </span>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1">
                <Fuel className="h-3 w-3" />
                {vehicle.fuelType === "PLUGIN_HYBRID" ? "PHEV" : vehicle.fuelType}
              </span>
              <span className="w-px h-3 bg-border" />
              <span>{vehicle.transmission === "AUTOMATIC" ? "Auto" : vehicle.transmission}</span>
            </div>

            <div className="flex items-end justify-between mt-3 pt-3 border-t border-border/50">
              <div>
                <p className="text-xl font-bold text-foreground">
                  {formatPrice(vehicle.price)}
                </p>
                {vehicle.isPriceDrop && vehicle.previousPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrice(vehicle.previousPrice)}
                  </p>
                )}
              </div>
              <span className="text-[11px] text-muted-foreground">
                Est. {formatPrice(Math.round(vehicle.price / 60))}/mo
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
