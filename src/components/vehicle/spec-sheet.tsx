"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Check, Info, ShieldAlert, Award } from "lucide-react";

interface SpecSheetProps {
  vehicle: {
    year: number;
    make: string;
    model: string;
    trim?: string | null;
    mileage: number;
    bodyType: string;
    fuelType: string;
    transmission: string;
    drivetrain: string;
    exteriorColor: string;
    interiorColor?: string | null;
    engineInfo?: string | null;
    horsepower?: number | null;
    mpgCity?: number | null;
    mpgHighway?: number | null;
    features: string[];
    description?: string | null;
  };
}

export function SpecSheet({ vehicle }: SpecSheetProps) {
  const specs = [
    { label: "Make", value: vehicle.make },
    { label: "Model", value: vehicle.model },
    { label: "Year", value: vehicle.year },
    { label: "Trim", value: vehicle.trim || "Base" },
    { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} mi` },
    { label: "Body Style", value: vehicle.bodyType.replace("_", " ") },
    { label: "Fuel Type", value: vehicle.fuelType.replace("_", " ") },
    { label: "Transmission", value: vehicle.transmission.replace("_", " ") },
    { label: "Drivetrain", value: vehicle.drivetrain.replace("_", " ") },
    { label: "Exterior Color", value: vehicle.exteriorColor },
    { label: "Interior Color", value: vehicle.interiorColor || "N/A" },
    { label: "Engine", value: vehicle.engineInfo || "N/A" },
    { label: "Horsepower", value: vehicle.horsepower ? `${vehicle.horsepower} hp` : "N/A" },
    { label: "City MPG", value: vehicle.mpgCity ? `${vehicle.mpgCity} mpg` : "N/A" },
    { label: "Highway MPG", value: vehicle.mpgHighway ? `${vehicle.mpgHighway} mpg` : "N/A" },
  ];

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-4 w-full max-w-lg mb-6 bg-muted/60 p-1 rounded-xl">
        <TabsTrigger value="overview" className="rounded-lg text-xs font-semibold">Overview</TabsTrigger>
        <TabsTrigger value="specs" className="rounded-lg text-xs font-semibold">Specs</TabsTrigger>
        <TabsTrigger value="features" className="rounded-lg text-xs font-semibold">Features</TabsTrigger>
        <TabsTrigger value="history" className="rounded-lg text-xs font-semibold">History</TabsTrigger>
      </TabsList>

      {/* ────── Overview ────── */}
      <TabsContent value="overview" className="space-y-6 outline-none">
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Vehicle Description
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
            {vehicle.description ||
              `This immaculate ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ""} is a prime example of quality engineering. Featuring a ${vehicle.engineInfo || "powerful engine"} and ${vehicle.transmission.toLowerCase()} transmission, it offers a smooth, confidence-inspiring ride. Rigorously inspected and detail-prepped by our service team, it is ready for its new home.`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
          {specs.slice(4, 10).map((spec) => (
            <div key={spec.label} className="bg-surface-secondary border border-border/40 rounded-xl p-4">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                {spec.label}
              </p>
              <p className="text-sm font-semibold text-foreground mt-1">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* ────── Specifications ────── */}
      <TabsContent value="specs" className="outline-none">
        <Card className="rounded-2xl border-border/60 overflow-hidden">
          <div className="divide-y divide-border/50">
            {specs.map((spec) => (
              <div key={spec.label} className="flex py-3.5 px-5 text-sm">
                <span className="w-1/3 text-muted-foreground font-medium">{spec.label}</span>
                <span className="w-2/3 text-foreground font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>

      {/* ────── Features & Options ────── */}
      <TabsContent value="features" className="outline-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {vehicle.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5 bg-surface-secondary border border-border/30 rounded-xl p-3.5">
              <div className="w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-sm font-medium text-foreground">{feat}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* ────── History & Warranty ────── */}
      <TabsContent value="history" className="space-y-6 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <Award className="h-5 w-5 text-accent-500" />
              <h4 className="font-heading font-semibold text-foreground">Clean Carfax Report</h4>
            </div>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                No accidents or damage reported
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                1-Owner vehicle history record
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                Regularly serviced with full documents
              </li>
            </ul>
          </div>

          <div className="border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <Info className="h-5 w-5 text-brand-500" />
              <h4 className="font-heading font-semibold text-foreground">Warranty Coverage</h4>
            </div>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                Balance of Factory Warranty remains
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                30-Day exchange guarantee policy
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                Optional extended service plans available
              </li>
            </ul>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
