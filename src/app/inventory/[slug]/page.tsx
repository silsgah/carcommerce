import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatPrice } from "@/lib/utils";
import { ImageGallery } from "@/components/vehicle/image-gallery";
import { PricePanel } from "@/components/vehicle/price-panel";
import { SpecSheet } from "@/components/vehicle/spec-sheet";
import { SimilarVehicles } from "@/components/vehicle/similar-vehicles";
import { FinancingCalculator } from "@/components/financing/calculator";
import { generateVehicleJsonLd } from "@/lib/structured-data";
import { prisma } from "@/lib/db";
import { ShieldCheck, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
// Fallback demo data to guarantee working states before seed runs
const DEMO_VEHICLES = [
  {
    id: "v1", slug: "2022-range-rover-autobiography", make: "Land Rover", model: "Range Rover", trim: "Autobiography LWB",
    year: 2022, price: 185000, mileage: 18500, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Santorini Black",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 518, mpgCity: 14, mpgHighway: 19, engineInfo: "5.0L Supercharged V8",
    features: ["Autobiography Package", "Panoramic Roof", "Meridian Signature Sound", "Heated & Cooled Seats", "Rear Entertainment", "Soft-Close Doors"],
    images: [
      "/vehicles/rr-autobiography-1.jpg",
      "/vehicles/rr-autobiography-2.jpg",
      "/vehicles/rr-autobiography-3.jpg",
      "/vehicles/rr-autobiography-4.jpg",
      "/vehicles/rr-autobiography-5.jpg",
    ],
    description: "A pinnacle of luxury motoring. This Certified Pre-Owned Range Rover Autobiography LWB is finished in Santorini Black over a stunning cream leather interior with wood trim. Powered by the legendary 5.0L Supercharged V8 producing 518 horsepower, it delivers effortless performance alongside supreme comfort. Loaded with the full Autobiography specification including Meridian Signature audio, panoramic roof, heated and cooled massage seats, and rear entertainment."
  },
  {
    id: "v2", slug: "2019-range-rover-sport-supercharged", make: "Land Rover", model: "Range Rover Sport", trim: "Supercharged",
    year: 2019, price: 95000, mileage: 42000, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Indus Silver",
    condition: "USED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 518, mpgCity: 14, mpgHighway: 19, engineInfo: "5.0L Supercharged V8",
    features: ["Sport Suspension", "Panoramic Roof", "Meridian Sound System", "Heated Leather Seats", "Terrain Response 2", "Adaptive Cruise Control"],
    images: [
      "/vehicles/rr-sport-1.jpg",
      "/vehicles/rr-sport-2.jpg",
      "/vehicles/rr-sport-3.jpg",
      "/vehicles/rr-sport-4.jpg",
      "/vehicles/rr-sport-5.jpg",
      "/vehicles/rr-sport-6.jpg",
      "/vehicles/rr-sport-7.jpg",
      "/vehicles/rr-sport-8.jpg",
    ],
    description: "Athletic performance meets all-terrain capability. This Indus Silver Range Rover Sport Supercharged delivers thrilling acceleration with its 518-horsepower 5.0L V8 engine. Features include sport-tuned air suspension, full black leather interior, panoramic sunroof, Meridian sound system, and Land Rover's advanced Terrain Response 2 system. Well-maintained with full service history."
  },
  {
    id: "v3", slug: "2025-toyota-land-cruiser-prado", make: "Toyota", model: "Land Cruiser Prado", trim: "VX",
    year: 2025, price: 72000, mileage: 0, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "FOUR_WD", exteriorColor: "White / Black Roof",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 326, mpgCity: 18, mpgHighway: 24, engineInfo: "2.8L Turbo Diesel / 2.4L Turbo",
    features: ["Multi-Terrain Select", "Crawl Control", "Panoramic Sunroof", "Toyota Safety Sense", "Premium Audio", "LED Headlights"],
    images: [
      "/vehicles/lc-prado-1.jpg",
      "/vehicles/lc-prado-2.jpg",
      "/vehicles/lc-prado-3.jpg",
      "/vehicles/lc-prado-4.jpg",
      "/vehicles/lc-prado-5.jpg",
      "/vehicles/lc-prado-6.jpg",
    ],
    description: "Brand new and fresh out of the box. This 2025 Toyota Land Cruiser Prado VX arrives in a striking white exterior with black roof combination. Built on Toyota's legendary TNGA-F platform, it features advanced Multi-Terrain Select, Crawl Control, and a comprehensive Toyota Safety Sense suite. The spacious interior includes a panoramic sunroof, premium audio, and seats still in their factory wrapping — truly zero miles."
  },
];

async function getVehicle(slug: string) {
  try {
    const dbVehicle = await prisma.vehicle.findUnique({
      where: { slug },
    });
    if (dbVehicle) return dbVehicle;
  } catch (e) {
    // Silently fall back to demo data if DB is not initialized yet
  }
  return DEMO_VEHICLES.find((v) => v.slug === slug) || null;
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
    description: `Buy a ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ""} with ${vehicle.mileage.toLocaleString()} miles for ${formatPrice(vehicle.price)} at AutoLot.`,
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
  const similarList = DEMO_VEHICLES.filter((v) => v.id !== vehicle.id).map((v) => ({
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
