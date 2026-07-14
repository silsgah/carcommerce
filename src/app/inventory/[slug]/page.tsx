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
    id: "v1", slug: "2024-bmw-m4-competition", make: "BMW", model: "M4", trim: "Competition xDrive",
    year: 2024, price: 84900, mileage: 1250, bodyType: "COUPE", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Sapphire Black",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 503, mpgCity: 16, mpgHighway: 23, engineInfo: "3.0L Twin-Turbo I6",
    features: ["Adaptive M Suspension", "M Carbon Bucket Seats", "Head-Up Display", "Harman Kardon Audio", "Carbon Roof", "Laserlights"],
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    ],
    description: "Experience the ultimate driving machine. This brand new BMW M4 Competition Coupe is equipped with the state-of-the-art xDrive all-wheel-drive system and a heart-pounding 503-horsepower twin-turbocharged engine. Finished in Sapphire Black over black extended Merino leather."
  },
  {
    id: "v2", slug: "2024-mercedes-amg-gt-63", make: "Mercedes-Benz", model: "AMG GT", trim: "63 S",
    year: 2024, price: 179900, mileage: 890, bodyType: "COUPE", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Obsidian Black",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false,
    horsepower: 630, mpgCity: 15, mpgHighway: 20, engineInfo: "4.0L Twin-Turbo V8",
    features: ["AMG Performance Exhaust", "Carbon Fiber Package", "Burmester Sound", "Rear Axle Steering", "Dynamic Plus Package"],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=800&h=600&fit=crop",
    ],
    description: "Handcrafted performance meets grand touring comfort. Powered by a thunderous 630-hp 4.0L V8, this stunning AMG GT 63 S delivers unparalleled acceleration and dynamic handling. Equipped with carbon fiber trim, aerodynamic package, and active suspension."
  },
  {
    id: "v3", slug: "2023-porsche-911-carrera-s", make: "Porsche", model: "911", trim: "Carrera S",
    year: 2023, price: 128500, mileage: 4200, bodyType: "COUPE", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "RWD", exteriorColor: "Guards Red",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: false, isPriceDrop: true, previousPrice: 135000,
    horsepower: 443, mpgCity: 18, mpgHighway: 24, engineInfo: "3.0L Twin-Turbo H6",
    features: ["Sport Chrono Package", "PASM Sport Suspension", "Bose Surround Sound", "Premium Package", "Sport Exhaust"],
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop",
    ],
    description: "The timeless benchmark of sports cars. This Certified Pre-Owned Guards Red Carrera S has been thoroughly inspected and includes Porsche Certified warranty. Loaded with key enthusiast options including Sport Chrono and active suspension."
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
