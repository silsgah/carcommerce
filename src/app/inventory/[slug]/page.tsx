import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatPrice } from "@/lib/utils";
import { ImageGallery } from "@/components/vehicle/image-gallery";
import { PricePanel } from "@/components/vehicle/price-panel";
import { SpecSheet } from "@/components/vehicle/spec-sheet";
import { SimilarVehicles } from "@/components/vehicle/similar-vehicles";
import { FinancingCalculator } from "@/components/financing/calculator";
import { generateVehicleJsonLd } from "@/lib/structured-data";
import { getVehicleBySlug, getSimilarVehicles as fetchSimilar, vehicles } from "@/data/vehicles";
import { ShieldCheck, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Pre-render all vehicle pages at build time (fully static on Vercel)
export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

function getVehicle(slug: string) {
  return getVehicleBySlug(slug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const vehicle = await getVehicle(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: `Buy a ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ""} with ${vehicle.mileage.toLocaleString()} miles for ${formatPrice(vehicle.price)} at AnyCargh.`,
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  // Generate structured data
  const jsonLd = generateVehicleJsonLd(vehicle);

  // Cast type for similar vehicles
  const similarList = fetchSimilar(vehicle.id).map((v) => ({
    id: v.id,
    slug: v.slug,
    make: v.make,
    model: v.model,
    year: v.year,
    price: v.price,
    image: v.images[0] || "",
    trim: v.trim,
  }));

  // Cast type for price panel
  const panelVehicle = {
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
    condition: vehicle.condition,
    isNewArrival: vehicle.isNewArrival,
    isPriceDrop: vehicle.isPriceDrop,
    previousPrice: vehicle.previousPrice,
  };

  return (
    <div className="pt-24 pb-20 bg-surface">
      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/inventory"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Inventory
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          <span className="text-sm font-medium text-foreground truncate">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </span>
        </div>

        {/* Heading Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              {vehicle.trim && (
                <p className="text-lg text-muted-foreground mt-1">
                  {vehicle.trim}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">
                  {vehicle.mileage.toLocaleString()}
                </span>{" "}
                mi
              </div>
              <span className="w-1.5 h-1.5 bg-border rounded-full" />
              <div>{vehicle.transmission.replace("_", " ")}</div>
              <span className="w-1.5 h-1.5 bg-border rounded-full" />
              <div>{vehicle.drivetrain}</div>
            </div>
          </div>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Gallery + Spec sheets */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={vehicle.images} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
            <SpecSheet vehicle={vehicle} />

            {/* Embedded Payment Calculator */}
            <div className="border border-border/60 rounded-2xl p-6 bg-card">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Estimate Monthly Payments
              </h3>
              <FinancingCalculator initialPrice={vehicle.price} embed />
            </div>
          </div>

          {/* Sticky Sidebar Action Panel */}
          <div>
            <PricePanel vehicle={panelVehicle} />
          </div>
        </div>

        {/* Similar Vehicles Carousel */}
        <div className="mt-16 pt-12 border-t">
          <SimilarVehicles vehicles={similarList} />
        </div>
      </div>
    </div>
  );
}
