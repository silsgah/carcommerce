"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FilterSidebar } from "@/components/inventory/filter-sidebar";
import { SortControls } from "@/components/inventory/sort-controls";
import { VehicleCard, type VehicleCardData } from "@/components/inventory/vehicle-card";
import { Pagination } from "@/components/inventory/pagination";
import { parseFilters, ITEMS_PER_PAGE } from "@/lib/inventory-filters";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Demo vehicles data (will be replaced by DB queries)
const DEMO_VEHICLES: VehicleCardData[] = [
  {
    id: "v1", slug: "2024-bmw-m4-competition", make: "BMW", model: "M4", trim: "Competition xDrive",
    year: 2024, price: 84900, mileage: 1250, bodyType: "COUPE", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Sapphire Black",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 503, mpgCity: 16, mpgHighway: 23, engineInfo: "3.0L Twin-Turbo I6",
    features: ["Adaptive M Suspension", "M Carbon Bucket Seats", "Head-Up Display"],
    images: ["https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop"],
  },
  {
    id: "v2", slug: "2024-mercedes-amg-gt-63", make: "Mercedes-Benz", model: "AMG GT", trim: "63 S",
    year: 2024, price: 179900, mileage: 890, bodyType: "COUPE", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Obsidian Black",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 630, mpgCity: 15, mpgHighway: 20, engineInfo: "4.0L Twin-Turbo V8",
    features: ["AMG Performance Exhaust", "Carbon Fiber Package", "Burmester Sound"],
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"],
  },
  {
    id: "v3", slug: "2023-porsche-911-carrera-s", make: "Porsche", model: "911", trim: "Carrera S",
    year: 2023, price: 128500, mileage: 4200, bodyType: "COUPE", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "RWD", exteriorColor: "Guards Red",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: false, isPriceDrop: true, previousPrice: 135000,
    horsepower: 443, mpgCity: 18, mpgHighway: 24, engineInfo: "3.0L Twin-Turbo H6",
    features: ["Sport Chrono Package", "PASM Sport Suspension", "Bose Surround Sound"],
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"],
  },
  {
    id: "v4", slug: "2024-tesla-model-s-plaid", make: "Tesla", model: "Model S", trim: "Plaid",
    year: 2024, price: 89990, mileage: 320, bodyType: "SEDAN", fuelType: "ELECTRIC",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Pearl White",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 1020, mpgCity: null, mpgHighway: null, engineInfo: "Tri Motor Electric",
    features: ["Autopilot", "Full Self-Driving Capability", "17\" Cinematic Display"],
    images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop"],
  },
  {
    id: "v5", slug: "2023-audi-rs7-performance", make: "Audi", model: "RS7", trim: "Performance",
    year: 2023, price: 119800, mileage: 8700, bodyType: "SEDAN", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Nardo Gray",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: false, isPriceDrop: false,
    horsepower: 621, mpgCity: 15, mpgHighway: 22, engineInfo: "4.0L Twin-Turbo V8",
    features: ["RS Sport Exhaust", "Carbon Optic Package", "Bang & Olufsen 3D Sound"],
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"],
  },
  {
    id: "v6", slug: "2024-range-rover-sport-dynamic", make: "Land Rover", model: "Range Rover Sport", trim: "Dynamic SE",
    year: 2024, price: 83500, mileage: 2100, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Santorini Black",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 395, mpgCity: 19, mpgHighway: 26, engineInfo: "3.0L I6 Mild Hybrid",
    features: ["Air Suspension", "Terrain Response 2", "Meridian Surround Sound"],
    images: ["https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=600&fit=crop"],
  },
  {
    id: "v7", slug: "2023-toyota-camry-xse", make: "Toyota", model: "Camry", trim: "XSE V6",
    year: 2023, price: 35400, mileage: 12500, bodyType: "SEDAN", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "FWD", exteriorColor: "Wind Chill Pearl",
    condition: "USED", status: "AVAILABLE", isNewArrival: false, isPriceDrop: true, previousPrice: 37500,
    horsepower: 301, mpgCity: 22, mpgHighway: 33, engineInfo: "3.5L V6",
    features: ["JBL Audio", "Panoramic Roof", "Leather Sport Seats"],
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop"],
  },
  {
    id: "v8", slug: "2024-ford-f150-lariat", make: "Ford", model: "F-150", trim: "Lariat",
    year: 2024, price: 62300, mileage: 3400, bodyType: "TRUCK", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "FOUR_WD", exteriorColor: "Antimatter Blue",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 400, mpgCity: 18, mpgHighway: 24, engineInfo: "3.5L EcoBoost V6",
    features: ["Max Tow Package", "360-Degree Camera", "B&O Sound System"],
    images: ["https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=800&h=600&fit=crop"],
  },
  {
    id: "v9", slug: "2023-honda-civic-type-r", make: "Honda", model: "Civic", trim: "Type R",
    year: 2023, price: 44900, mileage: 6800, bodyType: "HATCHBACK", fuelType: "GASOLINE",
    transmission: "MANUAL", drivetrain: "FWD", exteriorColor: "Championship White",
    condition: "USED", status: "AVAILABLE", isNewArrival: false, isPriceDrop: false,
    horsepower: 315, mpgCity: 22, mpgHighway: 28, engineInfo: "2.0L Turbo I4",
    features: ["Rev Match Control", "Brembo Brakes", "Limited Slip Differential"],
    images: ["https://images.unsplash.com/photo-1679239872589-e0040e498998?w=800&h=600&fit=crop"],
  },
  {
    id: "v10", slug: "2024-hyundai-ioniq-5-limited", make: "Hyundai", model: "IONIQ 5", trim: "Limited AWD",
    year: 2024, price: 52600, mileage: 1800, bodyType: "SUV", fuelType: "ELECTRIC",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Lucid Blue",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 320, mpgCity: null, mpgHighway: null, engineInfo: "Dual Motor Electric",
    features: ["Vehicle-to-Load", "Augmented Reality HUD", "Relaxation Seats"],
    images: ["https://images.unsplash.com/photo-1702487424125-04be398f3a5a?w=800&h=600&fit=crop"],
  },
  {
    id: "v11", slug: "2023-lexus-rx-350h", make: "Lexus", model: "RX", trim: "350h F Sport",
    year: 2023, price: 56800, mileage: 11200, bodyType: "SUV", fuelType: "HYBRID",
    transmission: "CVT", drivetrain: "AWD", exteriorColor: "Matador Red",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: false, isPriceDrop: true, previousPrice: 59900,
    horsepower: 246, mpgCity: 37, mpgHighway: 34, engineInfo: "2.5L Hybrid I4",
    features: ["Mark Levinson Audio", "Panoramic Roof", "Digital Rearview Mirror"],
    images: ["https://images.unsplash.com/photo-1625231334695-19dc14eded3b?w=800&h=600&fit=crop"],
  },
  {
    id: "v12", slug: "2024-chevrolet-corvette-stingray", make: "Chevrolet", model: "Corvette", trim: "Stingray 3LT",
    year: 2024, price: 78900, mileage: 950, bodyType: "COUPE", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "RWD", exteriorColor: "Torch Red",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 495, mpgCity: 16, mpgHighway: 24, engineInfo: "6.2L V8",
    features: ["Performance Exhaust", "Magnetic Ride Control", "Head-Up Display"],
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"],
  },
];

function filterVehicles(vehicles: VehicleCardData[], searchParams: Record<string, string | string[] | undefined>) {
  const filters = parseFilters(searchParams);
  let filtered = [...vehicles];

  if (filters.make) filtered = filtered.filter(v => v.make.toLowerCase() === filters.make!.toLowerCase());
  if (filters.bodyType) filtered = filtered.filter(v => v.bodyType === filters.bodyType);
  if (filters.fuelType) filtered = filtered.filter(v => v.fuelType === filters.fuelType);
  if (filters.transmission) filtered = filtered.filter(v => v.transmission === filters.transmission);
  if (filters.drivetrain) filtered = filtered.filter(v => v.drivetrain === filters.drivetrain);
  if (filters.condition) filtered = filtered.filter(v => v.condition === filters.condition);
  if (filters.yearMin) filtered = filtered.filter(v => v.year >= filters.yearMin!);
  if (filters.yearMax) filtered = filtered.filter(v => v.year <= filters.yearMax!);
  if (filters.priceMin) filtered = filtered.filter(v => v.price >= filters.priceMin!);
  if (filters.priceMax) filtered = filtered.filter(v => v.price <= filters.priceMax!);
  if (filters.mileageMax) filtered = filtered.filter(v => v.mileage <= filters.mileageMax!);
  if (filters.q) {
    const q = filters.q.toLowerCase();
    filtered = filtered.filter(v =>
      v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || (v.trim && v.trim.toLowerCase().includes(q))
    );
  }

  // Sort
  switch (filters.sort) {
    case "price_asc": filtered.sort((a, b) => a.price - b.price); break;
    case "price_desc": filtered.sort((a, b) => b.price - a.price); break;
    case "mileage": filtered.sort((a, b) => a.mileage - b.mileage); break;
    case "year_desc": filtered.sort((a, b) => b.year - a.year); break;
    case "year_asc": filtered.sort((a, b) => a.year - b.year); break;
    default: break;
  }

  return { filtered, filters };
}

export function InventoryContent() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { filtered, filters } = filterVehicles(DEMO_VEHICLES, params);

  const makes = [...new Set(DEMO_VEHICLES.map(v => v.make))].sort();
  const activeFilterCount = [
    filters.make, filters.bodyType, filters.fuelType, filters.transmission,
    filters.drivetrain, filters.condition, filters.yearMin, filters.yearMax,
    filters.priceMin, filters.priceMax, filters.mileageMax, filters.q,
  ].filter(Boolean).length;

  const page = filters.page || 1;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const view = filters.view || "grid";

  return (
    <div className="flex gap-8">
      <FilterSidebar filters={filters} makes={makes} activeCount={activeFilterCount} />

      <div className="flex-1 min-w-0">
        {/* Mobile filter + sort row */}
        <div className="flex items-center gap-3 mb-6 lg:mb-0">
          <div className="lg:hidden">
            <FilterSidebar filters={filters} makes={makes} activeCount={activeFilterCount} />
          </div>
        </div>

        <div className="mb-6">
          <SortControls
            totalCount={filtered.length}
            currentSort={filters.sort || "newest"}
            currentView={view}
          />
        </div>

        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No vehicles found
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Try adjusting your filters or clearing them to see all available vehicles.
            </p>
            <Link href="/inventory">
              <Button variant="outline" className="rounded-full">
                Clear All Filters
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  : "space-y-4"
              }
            >
              {paginated.map((vehicle, i) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} view={view} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
