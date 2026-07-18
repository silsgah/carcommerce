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
  {
    id: "v4", slug: "2023-land-rover-defender-110", make: "Land Rover", model: "Defender 110", trim: "X-Dynamic SE",
    year: 2023, price: 88500, mileage: 12400, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Fuji White",
    condition: "USED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 395, mpgCity: 17, mpgHighway: 22, engineInfo: "3.0L Turbocharged I6 MHEV",
    features: ["Off-Road Pack", "Air Suspension", "3D Surround Camera", "Meridian Sound", "Panoramic Roof"],
    images: ["/vehicles/converted/IMG_3452.jpg", "/vehicles/converted/IMG_3461.jpg"],
    description: "Rugged yet ultra-refined. This Fuji White Land Rover Defender 110 X-Dynamic SE combines legendary off-road heritage with modern luxury. Features include air suspension, 3D surround cameras, panoramic sunroof, and premium Meridian audio."
  },
  {
    id: "v5", slug: "2023-dodge-charger-srt-hellcat", make: "Dodge", model: "Charger", trim: "SRT Hellcat Widebody",
    year: 2023, price: 82900, mileage: 6800, bodyType: "SEDAN", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "RWD", exteriorColor: "Yellow / Go Mango",
    condition: "USED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 717, mpgCity: 12, mpgHighway: 21, engineInfo: "6.2L Supercharged HEMI V8",
    features: ["Widebody Package", "Brembo Brakes", "Laguna Leather Seats", "Harman Kardon Audio", "Launch Control"],
    images: [
      "/vehicles/converted/IMG_3661.jpg",
      "/vehicles/converted/IMG_3662.jpg",
      "/vehicles/converted/IMG_3663.jpg",
      "/vehicles/converted/IMG_3664.jpg",
      "/vehicles/converted/IMG_3666.jpg",
      "/vehicles/converted/IMG_3667.jpg",
      "/vehicles/converted/IMG_3668.jpg",
      "/vehicles/converted/IMG_3669.jpg",
      "/vehicles/converted/IMG_3670.jpg",
    ],
    description: "Raw American muscle. Powered by the supercharged 6.2L HEMI V8 producing an astonishing 717 horsepower. Finished in a high-octane yellow exterior with widebody stance, Brembo 6-piston brakes, launch control, and luxury sport interior."
  },
  {
    id: "v6", slug: "2022-ram-1500-trx", make: "RAM", model: "1500", trim: "TRX 4x4",
    year: 2022, price: 89900, mileage: 15300, bodyType: "TRUCK", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "FOUR_WD", exteriorColor: "Diamond Black Crystal",
    condition: "USED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 702, mpgCity: 10, mpgHighway: 14, engineInfo: "6.2L Supercharged HEMI V8",
    features: ["Bilstein Black Hawk shocks", "TRX Level 2 Group", "Head-Up Display", "Harman Kardon Sound", "Panoramic Sunroof"],
    images: [
      "/vehicles/converted/IMG_3676.jpg",
      "/vehicles/converted/IMG_3677.jpg",
      "/vehicles/converted/IMG_3678.jpg",
      "/vehicles/converted/IMG_3681.jpg",
      "/vehicles/converted/IMG_3682.jpg",
    ],
    description: "The apex predator of performance pickup trucks. Featuring a 702-horsepower supercharged V8 engine, active Bilstein Black Hawk e2 adaptive shocks, launch control, and a fully loaded TRX Level 2 luxury interior."
  },
  {
    id: "v7", slug: "2024-acura-mdx-aspec", make: "Acura", model: "MDX", trim: "A-Spec Package",
    year: 2024, price: 61500, mileage: 4200, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Platinum White Pearl",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 290, mpgCity: 19, mpgHighway: 25, engineInfo: "3.5L V6",
    features: ["Super Handling AWD", "ELS Studio 3D Sound", "Milano Leather Seats", "Panoramic Moonroof", "A-Spec Styling"],
    images: [
      "/vehicles/converted/IMG_3684.jpg",
      "/vehicles/converted/IMG_3686.jpg",
      "/vehicles/converted/IMG_3688.jpg",
    ],
    description: "Sophisticated performance and 3-row utility. Finished in Platinum White Pearl with red Milano leather accents, Super Handling All-Wheel Drive (SH-AWD), ELS Studio 3D audio, and aggressive A-Spec styling."
  },
  {
    id: "v8", slug: "2023-mercedes-amg-g63", make: "Mercedes-Benz", model: "G-Class", trim: "AMG G 63",
    year: 2023, price: 198000, mileage: 9100, bodyType: "SUV", fuelType: "GASOLINE",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Polar White",
    condition: "CERTIFIED", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 577, mpgCity: 13, mpgHighway: 16, engineInfo: "4.0L V8 Biturbo",
    features: ["AMG Night Package", "Red Quilted Leather", "Burmester Surround Sound", "Carbon Fiber Trim", "AMG Performance Exhaust"],
    images: [
      "/vehicles/converted/IMG_3726.jpg",
      "/vehicles/converted/IMG_3727.jpg",
      "/vehicles/converted/IMG_3728.jpg",
      "/vehicles/converted/IMG_3729.jpg",
      "/vehicles/converted/IMG_3730.jpg",
    ],
    description: "An iconic luxury SUV like no other. Powered by a hand-built 4.0L V8 Biturbo with 577 hp. Stunning Polar White exterior with red diamond-quilted leather interior, carbon fiber steering wheel, dual widescreen displays, and AMG performance exhaust."
  },
  {
    id: "v9", slug: "2024-honda-crv-hybrid-sport-touring", make: "Honda", model: "CR-V Hybrid", trim: "Sport Touring AWD",
    year: 2024, price: 41200, mileage: 2500, bodyType: "SUV", fuelType: "HYBRID",
    transmission: "AUTOMATIC", drivetrain: "AWD", exteriorColor: "Canyon River Blue",
    condition: "NEW", status: "AVAILABLE", isNewArrival: true, isPriceDrop: false, previousPrice: null,
    horsepower: 204, mpgCity: 40, mpgHighway: 34, engineInfo: "2.0L 4-Cylinder Hybrid",
    features: ["Bose Premium Audio", "Leather Seats w/ Orange Stitching", "Hands-Free Power Tailgate", "Honda Sensing", "Wireless Apple CarPlay"],
    images: [
      "/vehicles/converted/IMG_3824.jpg",
      "/vehicles/converted/IMG_3823.jpg",
      "/vehicles/converted/IMG_3830.jpg",
      "/vehicles/converted/IMG_3833.jpg",
      "/vehicles/converted/IMG_3817.jpg",
      "/vehicles/converted/IMG_3820.jpg",
      "/vehicles/converted/IMG_3821.jpg",
      "/vehicles/converted/IMG_3822.jpg",
    ],
    description: "The top-of-the-line hybrid crossover. Features an advanced 204-hp hybrid powertrain, Real Time AWD, Bose premium 12-speaker audio system, orange contrast-stitched leather interior, and up to 40 MPG."
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
