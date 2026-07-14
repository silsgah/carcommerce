"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BODY_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
  DRIVETRAINS,
  CONDITIONS,
  type InventoryFilters,
} from "@/lib/inventory-filters";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: InventoryFilters;
  makes: string[];
  activeCount: number;
}

function FilterContent({
  filters,
  makes,
}: {
  filters: InventoryFilters;
  makes: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams, startTransition]
  );

  const clearAll = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }, [router, pathname, startTransition]);

  const formatLabel = (s: string) =>
    s
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace("Fwd", "FWD")
      .replace("Rwd", "RWD")
      .replace("Awd", "AWD")
      .replace("Four Wd", "4WD")
      .replace("Cvt", "CVT")
      .replace("Plugin Hybrid", "Plug-in Hybrid")
      .replace("Suv", "SUV");

  return (
    <div className="space-y-1">
      <Accordion
        multiple
        defaultValue={["condition", "make", "bodyType", "price", "year"]}
        className="space-y-0"
      >
        {/* Condition */}
        <AccordionItem value="condition" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Condition
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <div className="space-y-2">
              {CONDITIONS.map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.condition === c}
                    onCheckedChange={(checked) =>
                      updateParam("condition", checked ? c : undefined)
                    }
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {formatLabel(c)}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Make */}
        <AccordionItem value="make" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Make
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <Select
              value={filters.make || "all"}
              onValueChange={(val) =>
                updateParam("make", val === "all" ? undefined : val)
              }
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="All Makes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {makes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* Body Type */}
        <AccordionItem value="bodyType" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Body Type
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {BODY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    updateParam(
                      "bodyType",
                      filters.bodyType === type ? undefined : type
                    )
                  }
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-lg border transition-all",
                    filters.bodyType === type
                      ? "bg-brand-50 dark:bg-brand-900/30 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300"
                      : "border-border hover:border-border-hover text-muted-foreground hover:text-foreground"
                  )}
                >
                  {formatLabel(type)}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceMin || ""}
                onChange={(e) =>
                  updateParam(
                    "priceMin",
                    e.target.value || undefined
                  )
                }
                className="h-9 text-sm"
              />
              <span className="text-muted-foreground text-sm">—</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceMax || ""}
                onChange={(e) =>
                  updateParam(
                    "priceMax",
                    e.target.value || undefined
                  )
                }
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[
                { label: "Under $20K", min: undefined, max: "20000" },
                { label: "$20K-$40K", min: "20000", max: "40000" },
                { label: "$40K-$60K", min: "40000", max: "60000" },
                { label: "$60K+", min: "60000", max: undefined },
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (range.min) params.set("priceMin", range.min);
                    else params.delete("priceMin");
                    if (range.max) params.set("priceMax", range.max);
                    else params.delete("priceMax");
                    params.delete("page");
                    startTransition(() => {
                      router.push(`${pathname}?${params.toString()}`, {
                        scroll: false,
                      });
                    });
                  }}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-border hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 text-muted-foreground hover:text-foreground transition-all"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Year Range */}
        <AccordionItem value="year" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Year
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="From"
                value={filters.yearMin || ""}
                onChange={(e) =>
                  updateParam("yearMin", e.target.value || undefined)
                }
                className="h-9 text-sm"
              />
              <span className="text-muted-foreground text-sm">—</span>
              <Input
                type="number"
                placeholder="To"
                value={filters.yearMax || ""}
                onChange={(e) =>
                  updateParam("yearMax", e.target.value || undefined)
                }
                className="h-9 text-sm"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Fuel Type */}
        <AccordionItem value="fuelType" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Fuel Type
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <div className="space-y-2">
              {FUEL_TYPES.map((f) => (
                <label
                  key={f}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.fuelType === f}
                    onCheckedChange={(checked) =>
                      updateParam("fuelType", checked ? f : undefined)
                    }
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {formatLabel(f)}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Transmission */}
        <AccordionItem value="transmission" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Transmission
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <div className="space-y-2">
              {TRANSMISSIONS.map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.transmission === t}
                    onCheckedChange={(checked) =>
                      updateParam("transmission", checked ? t : undefined)
                    }
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {formatLabel(t)}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Drivetrain */}
        <AccordionItem value="drivetrain" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Drivetrain
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <div className="space-y-2">
              {DRIVETRAINS.map((d) => (
                <label
                  key={d}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.drivetrain === d}
                    onCheckedChange={(checked) =>
                      updateParam("drivetrain", checked ? d : undefined)
                    }
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {formatLabel(d)}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mileage */}
        <AccordionItem value="mileage" className="border-b-0">
          <AccordionTrigger className="py-3 px-1 text-sm font-semibold hover:no-underline">
            Max Mileage
          </AccordionTrigger>
          <AccordionContent className="px-1 pb-4">
            <Input
              type="number"
              placeholder="Max mileage"
              value={filters.mileageMax || ""}
              onChange={(e) =>
                updateParam("mileageMax", e.target.value || undefined)
              }
              className="h-9 text-sm"
            />
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["25000", "50000", "75000", "100000"].map((val) => (
                <button
                  key={val}
                  onClick={() => updateParam("mileageMax", val)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-border hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 text-muted-foreground hover:text-foreground transition-all"
                >
                  Under {parseInt(val).toLocaleString()} mi
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-3 px-1">
        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="w-full rounded-lg text-sm"
        >
          <X className="h-3.5 w-3.5 mr-1.5" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}

export function FilterSidebar({
  filters,
  makes,
  activeCount,
}: FilterSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-2xl border border-border/60 p-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </h2>
            {activeCount > 0 && (
              <Badge variant="secondary" className="text-[10px] h-5">
                {activeCount} active
              </Badge>
            )}
          </div>
          <Separator className="mb-2" />
          <FilterContent filters={filters} makes={makes} />
        </div>
      </aside>

      {/* Mobile filter sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg gap-1.5"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeCount > 0 && (
                  <Badge className="ml-1 h-5 px-1.5 text-[10px] bg-brand-500 text-white border-0">
                    {activeCount}
                  </Badge>
                )}
              </Button>
            }
          />
          <SheetContent side="left" className="w-80 p-0">
            <SheetTitle className="sr-only">Vehicle Filters</SheetTitle>
            <div className="p-5 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
                {activeCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {activeCount}
                  </Badge>
                )}
              </h2>
            </div>
            <div className="p-5 overflow-y-auto max-h-[calc(100vh-5rem)]">
              <FilterContent filters={filters} makes={makes} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
