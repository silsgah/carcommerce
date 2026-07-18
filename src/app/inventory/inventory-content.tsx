"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { FilterSidebar } from "@/components/inventory/filter-sidebar";
import { SortControls } from "@/components/inventory/sort-controls";
import { VehicleCard, type VehicleCardData } from "@/components/inventory/vehicle-card";
import { Pagination } from "@/components/inventory/pagination";
import { parseFilters, ITEMS_PER_PAGE } from "@/lib/inventory-filters";
import { SearchX, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Real vehicle inventory
const DEMO_VEHICLES: VehicleCardData[] = [
  {
    id: "v1", slug: "2022-range-rover-autobiography", make: "Land Rover", model: "Range Rover", trim: "Autobiography LWB",
    year: 2022, price: 185000, mileage: 18500, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Santorini Black",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 518, mpgCity: 14, mpgHighway: 19, engineInfo: "5.0L Supercharged V8",
    features: ["Autobiography Package", "Panoramic Roof", "Meridian Signature Sound", "Heated & Cooled Seats", "Rear Entertainment"],
    images: ["/vehicles/rr-autobiography-1.jpg", "/vehicles/rr-autobiography-2.jpg", "/vehicles/rr-autobiography-3.jpg", "/vehicles/rr-autobiography-4.jpg", "/vehicles/rr-autobiography-5.jpg"],
  },
  {
    id: "v2", slug: "2019-range-rover-sport-supercharged", make: "Land Rover", model: "Range Rover Sport", trim: "Supercharged",
    year: 2019, price: 95000, mileage: 42000, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Indus Silver",
    condition: "USED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 518, mpgCity: 14, mpgHighway: 19, engineInfo: "5.0L Supercharged V8",
    features: ["Sport Suspension", "Panoramic Roof", "Meridian Sound System", "Heated Leather Seats", "Terrain Response 2"],
    images: ["/vehicles/rr-sport-1.jpg", "/vehicles/rr-sport-2.jpg", "/vehicles/rr-sport-3.jpg", "/vehicles/rr-sport-4.jpg", "/vehicles/rr-sport-5.jpg", "/vehicles/rr-sport-6.jpg", "/vehicles/rr-sport-7.jpg", "/vehicles/rr-sport-8.jpg"],
  },
  {
    id: "v3", slug: "2025-toyota-land-cruiser-prado", make: "Toyota", model: "Land Cruiser Prado", trim: "VX",
    year: 2025, price: 72000, mileage: 0, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "FOUR_WD", exteriorColor: "White / Black Roof",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 326, mpgCity: 18, mpgHighway: 24, engineInfo: "2.8L Turbo Diesel / 2.4L Turbo",
    features: ["Multi-Terrain Select", "Crawl Control", "Panoramic Sunroof", "Toyota Safety Sense", "Premium Audio"],
    images: ["/vehicles/lc-prado-1.jpg", "/vehicles/lc-prado-2.jpg", "/vehicles/lc-prado-3.jpg", "/vehicles/lc-prado-4.jpg", "/vehicles/lc-prado-5.jpg", "/vehicles/lc-prado-6.jpg"],
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const params = Object.fromEntries(searchParams.entries());
  const { filtered, filters } = filterVehicles(DEMO_VEHICLES, params);

  const [searchVal, setSearchVal] = useState(filters.q || "");

  useEffect(() => {
    setSearchVal(filters.q || "");
  }, [filters.q]);

  const handleSearchSubmit = (val: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      nextParams.set("q", val.trim());
    } else {
      nextParams.delete("q");
    }
    nextParams.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
    });
  };

  const clearSearch = () => {
    setSearchVal("");
    handleSearchSubmit("");
  };

  const makes = [...new Set(DEMO_VEHICLES.map((v) => v.make))].sort();
  const activeFilterCount = [
    filters.make,
    filters.bodyType,
    filters.fuelType,
    filters.transmission,
    filters.drivetrain,
    filters.condition,
    filters.yearMin,
    filters.yearMax,
    filters.priceMin,
    filters.priceMax,
    filters.mileageMax,
    filters.q,
  ].filter(Boolean).length;

  const page = filters.page || 1;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const view = filters.view || "grid";

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Desktop-only sidebar */}
      <FilterSidebar
        filters={filters}
        makes={makes}
        activeCount={activeFilterCount}
        mode="desktop"
      />

      <div className="flex-1 min-w-0 space-y-6">
        {/* Top search & sorting toolbar */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          {/* Search bar + Mobile filters */}
          <div className="flex items-center gap-3 flex-1 w-full max-w-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit(searchVal);
              }}
              className="relative flex-1"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by make, model, or keywords..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="pl-9 pr-8 h-9 rounded-xl text-sm w-full bg-surface-secondary border-none"
              />
              {searchVal && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </form>

            <FilterSidebar
              filters={filters}
              makes={makes}
              activeCount={activeFilterCount}
              mode="mobile"
            />
          </div>

          {/* Sorting / View Toggles */}
          <SortControls
            totalCount={filtered.length}
            currentSort={filters.sort || "newest"}
            currentView={view}
          />
        </div>

        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-dashed border-border/80">
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
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  view={view}
                  index={i}
                />
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
