"use client";

import { useCompareStore, CompareVehicle } from "@/stores/compare-store";
import { formatPrice, formatMileage, cn } from "@/lib/utils";
import { Trash2, Plus, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ComparePage() {
  const vehicles = useCompareStore((s) => s.vehicles);
  const removeVehicle = useCompareStore((s) => s.removeVehicle);
  const clearCompare = useCompareStore((s) => s.clearCompare);
  const [mounted, setMounted] = useState(false);
  const [highlightDiffs, setHighlightDiffs] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-heading font-bold">Compare Vehicles</h1>
        <div className="h-60 shimmer-bg rounded-2xl mt-8" />
      </div>
    );
  }

  const keys = [
    { label: "Price", key: "price", format: (v: number) => formatPrice(v) },
    { label: "Mileage", key: "mileage", format: (v: number) => formatMileage(v) },
    { label: "Body Type", key: "bodyType" },
    { label: "Fuel Type", key: "fuelType" },
    { label: "Transmission", key: "transmission" },
    { label: "Drivetrain", key: "drivetrain" },
    { label: "Color", key: "exteriorColor" },
    { label: "Horsepower", key: "horsepower", format: (v?: number) => (v ? `${v} hp` : "N/A") },
    { label: "City MPG", key: "mpgCity", format: (v?: number) => (v ? `${v} mpg` : "N/A") },
    { label: "Highway MPG", key: "mpgHighway", format: (v?: number) => (v ? `${v} mpg` : "N/A") },
    { label: "Engine", key: "engineInfo", format: (v?: string) => v || "N/A" },
  ];

  const hasDifference = (key: string) => {
    if (vehicles.length < 2) return false;
    const firstVal = vehicles[0][key as keyof CompareVehicle];
    return vehicles.some((v) => v[key as keyof CompareVehicle] !== firstVal);
  };

  return (
    <div className="pt-24 pb-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Compare Vehicles
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Compare specifications side-by-side
            </p>
          </div>
          {vehicles.length > 0 && (
            <div className="flex items-center gap-2">
              {vehicles.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHighlightDiffs(!highlightDiffs)}
                  className="text-xs rounded-lg"
                >
                  {highlightDiffs ? "Clear Highlights" : "Highlight Differences"}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={clearCompare}
                className="text-xs rounded-lg text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-dashed">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <GitCompare className="h-7 w-7 text-muted-foreground/60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No vehicles to compare
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Browse our inventory and click the compare icon on up to 4 vehicles to view them side-by-side.
            </p>
            <Link href="/inventory">
              <Button className="bg-brand-600 text-white rounded-full">
                Browse Inventory
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-xl shadow-black/5 dark:shadow-none">
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-48 bg-muted/30" />
                    {vehicles.map((v) => (
                      <TableHead key={v.id} className="p-6 align-top border-l">
                        <div className="space-y-4">
                          <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={v.image}
                              alt={`${v.year} ${v.make} ${v.model}`}
                              fill
                              className="object-cover"
                              sizes="200px"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeVehicle(v.id)}
                              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm border-none"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <div>
                            <h3 className="font-heading font-semibold text-sm text-foreground leading-tight">
                              {v.year} {v.make} {v.model}
                            </h3>
                            {v.trim && <p className="text-xs text-muted-foreground mt-0.5">{v.trim}</p>}
                            <p className="text-base font-bold text-foreground mt-2">
                              {formatPrice(v.price)}
                            </p>
                          </div>
                          <Link href={`/inventory/${v.slug}`} className="block">
                            <Button size="sm" className="w-full text-xs rounded-lg">
                              View Page
                            </Button>
                          </Link>
                        </div>
                      </TableHead>
                    ))}
                    {vehicles.length < 4 && (
                      <TableHead className="p-6 align-middle border-l text-center">
                        <Link href="/inventory" className="inline-flex flex-col items-center justify-center gap-2 group">
                          <div className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center group-hover:bg-muted transition-colors">
                            <Plus className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground">
                            Add Vehicle
                          </span>
                        </Link>
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keys.map((spec) => {
                    const diff = highlightDiffs && hasDifference(spec.key);
                    return (
                      <TableRow key={spec.label} className={cn(diff && "bg-accent-50/50 dark:bg-accent-950/20")}>
                        <TableCell className="font-medium text-sm py-4 px-6 bg-muted/10">
                          {spec.label}
                        </TableCell>
                        {vehicles.map((v) => {
                          const val = v[spec.key as keyof CompareVehicle];
                          return (
                            <TableCell key={v.id} className="py-4 px-6 text-sm border-l text-foreground font-semibold">
                              {spec.format ? spec.format(val as never) : (val as string)}
                            </TableCell>
                          );
                        })}
                        {vehicles.length < 4 && <TableCell className="border-l bg-muted/5" />}
                      </TableRow>
                    );
                  })}
                  {/* Features spec row */}
                  <TableRow>
                    <TableCell className="font-medium text-sm py-4 px-6 bg-muted/10">
                      Key Features
                    </TableCell>
                    {vehicles.map((v) => (
                      <TableCell key={v.id} className="py-4 px-6 text-sm border-l align-top">
                        <ul className="space-y-1.5 list-disc list-inside text-muted-foreground text-xs font-medium">
                          {v.features.slice(0, 5).map((f) => (
                            <li key={f} className="truncate">{f}</li>
                          ))}
                        </ul>
                      </TableCell>
                    ))}
                    {vehicles.length < 4 && <TableCell className="border-l bg-muted/5" />}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
