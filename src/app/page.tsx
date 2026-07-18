import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Car,
  Shield,
  Award,
  BadgeDollarSign,
  Calculator,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatMileage } from "@/lib/utils";

// Vehicle data — real inventory
const featuredVehicles = [
  {
    id: "1",
    slug: "2022-range-rover-autobiography",
    year: 2022,
    make: "Land Rover",
    model: "Range Rover",
    trim: "Autobiography LWB",
    price: 185000,
    mileage: 18500,
    condition: "CERTIFIED",
    image: "/vehicles/rr-autobiography-1.jpg",
    isNewArrival: true,
  },
  {
    id: "2",
    slug: "2019-range-rover-sport-supercharged",
    year: 2019,
    make: "Land Rover",
    model: "Range Rover Sport",
    trim: "Supercharged",
    price: 95000,
    mileage: 42000,
    condition: "USED",
    image: "/vehicles/rr-sport-1.jpg",
    isNewArrival: true,
  },
  {
    id: "3",
    slug: "2025-toyota-land-cruiser-prado",
    year: 2025,
    make: "Toyota",
    model: "Land Cruiser Prado",
    trim: "VX",
    price: 72000,
    mileage: 0,
    condition: "NEW",
    image: "/vehicles/lc-prado-1.jpg",
    isNewArrival: true,
  },
  {
    id: "4",
    slug: "2023-land-rover-defender-110",
    year: 2023,
    make: "Land Rover",
    model: "Defender 110",
    trim: "X-Dynamic SE",
    price: 88500,
    mileage: 12400,
    condition: "USED",
    image: "/vehicles/converted/IMG_3452.jpg",
    isNewArrival: true,
  },
  {
    id: "5",
    slug: "2023-dodge-charger-srt-hellcat",
    year: 2023,
    make: "Dodge",
    model: "Charger",
    trim: "SRT Hellcat Widebody",
    price: 82900,
    mileage: 6800,
    condition: "USED",
    image: "/vehicles/converted/IMG_3661.jpg",
    isNewArrival: true,
  },
  {
    id: "6",
    slug: "2022-ram-1500-trx",
    year: 2022,
    make: "RAM",
    model: "1500",
    trim: "TRX 4x4",
    price: 89900,
    mileage: 15300,
    condition: "USED",
    image: "/vehicles/converted/IMG_3676.jpg",
    isNewArrival: true,
  },
  {
    id: "7",
    slug: "2024-acura-mdx-aspec",
    year: 2024,
    make: "Acura",
    model: "MDX",
    trim: "A-Spec Package",
    price: 61500,
    mileage: 4200,
    condition: "CERTIFIED",
    image: "/vehicles/converted/IMG_3684.jpg",
    isNewArrival: true,
  },
  {
    id: "8",
    slug: "2023-mercedes-amg-g63",
    year: 2023,
    make: "Mercedes-Benz",
    model: "G-Class",
    trim: "AMG G 63",
    price: 198000,
    mileage: 9100,
    condition: "CERTIFIED",
    image: "/vehicles/converted/IMG_3726.jpg",
    isNewArrival: true,
  },
  {
    id: "9",
    slug: "2024-honda-crv-hybrid-sport-touring",
    year: 2024,
    make: "Honda",
    model: "CR-V Hybrid",
    trim: "Sport Touring AWD",
    price: 41200,
    mileage: 2500,
    condition: "NEW",
    image: "/vehicles/converted/IMG_3824.jpg",
    isNewArrival: true,
  },
];

const bodyTypes = [
  { label: "SUVs", icon: Car, href: "/inventory?bodyType=SUV", count: 10 },
  { label: "Sedans", icon: Car, href: "/inventory?bodyType=SEDAN", count: 4 },
  { label: "Coupes", icon: Zap, href: "/inventory?bodyType=COUPE", count: 4 },
  { label: "Trucks", icon: Truck, href: "/inventory?bodyType=TRUCK", count: 2 },
  { label: "Hatchbacks", icon: Car, href: "/inventory?bodyType=HATCHBACK", count: 1 },
  { label: "Electric", icon: Zap, href: "/inventory?fuelType=ELECTRIC", count: 2 },
];

const stats = [
  { value: "200+", label: "Vehicles in Stock" },
  { value: "15K+", label: "Happy Customers" },
  { value: "25+", label: "Years of Service" },
  { value: "4.9★", label: "Customer Rating" },
];

export default function HomePage() {
  return (
    <>
      {/* ────── Hero ────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/vehicles/hero-bg.jpg"
            alt="Luxury car showroom"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-32 lg:py-40">
          <div className="max-w-2xl">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-6 text-xs font-semibold uppercase tracking-wider">
              ✦ Cars for All Budgets
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight">
              AnyCar<span className="text-emerald-500">gh</span>
              <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold text-emerald-400">
                Sales · Rental · Importation
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              AnyCargh delivers unparalleled vehicle sales, reliable rentals, and seamless importation across Ghana. Discover transparency and certified quality tailored to your journey.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
              <Link href="/inventory">
                <Button
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white rounded-full px-8 shadow-xl shadow-accent-500/25 hover:shadow-accent-500/40 transition-all text-base"
                >
                  Browse Inventory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/financing">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-white/20 text-white hover:bg-white/10 hover:text-white text-base"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Payment Calculator
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl lg:text-3xl font-heading font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-brand-300 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── Browse by Category ────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Find exactly what you&apos;re looking for in our diverse inventory
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {bodyTypes.map((type) => (
              <Link key={type.label} href={type.href}>
                <div className="group relative bg-card rounded-2xl border border-border/60 p-6 text-center hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                    <type.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground">
                    {type.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {type.count} vehicles
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────── Featured Vehicles ────── */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                Featured Vehicles
              </h2>
              <p className="text-muted-foreground mt-2">
                Hand-picked selections from our premium collection
              </p>
            </div>
            <Link
              href="/inventory"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => (
              <Link key={vehicle.id} href={`/inventory/${vehicle.slug}`}>
                <div className="group bg-card rounded-2xl border border-border/60 hover:border-border-hover hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {vehicle.isNewArrival && (
                        <Badge className="bg-blue-500 text-white border-0 text-[10px] font-semibold shadow-lg">
                          New Arrival
                        </Badge>
                      )}
                      <Badge
                        className={
                          vehicle.condition === "NEW"
                            ? "bg-brand-600 text-white border-0 text-[10px] font-semibold shadow-lg"
                            : "bg-amber-500 text-white border-0 text-[10px] font-semibold shadow-lg"
                        }
                      >
                        {vehicle.condition === "CERTIFIED" ? "CPO" : vehicle.condition === "NEW" ? "New" : "Used"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {vehicle.trim} · {formatMileage(vehicle.mileage)}
                    </p>
                    <div className="flex items-end justify-between mt-3 pt-3 border-t border-border/50">
                      <p className="text-xl font-bold text-foreground">
                        {formatPrice(vehicle.price)}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        Est. {formatPrice(Math.round(vehicle.price / 60))}/mo
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link href="/inventory">
              <Button variant="outline" className="rounded-full">
                View All Vehicles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ────── Trust Signals ────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
              Why Choose AutoLot
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              We&apos;re committed to making your car buying experience exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Certified Quality",
                description:
                  "Every vehicle undergoes a rigorous multi-point inspection before it reaches our lot.",
              },
              {
                icon: BadgeDollarSign,
                title: "Transparent Pricing",
                description:
                  "No hidden fees, no surprises. The price you see is the price you pay.",
              },
              {
                icon: Award,
                title: "Award-Winning Service",
                description:
                  "Rated 4.9/5 by our customers. Our team is dedicated to your satisfaction.",
              },
              {
                icon: Calculator,
                title: "Easy Financing",
                description:
                  "Competitive rates and flexible terms. Get pre-qualified in minutes, not hours.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative bg-card rounded-2xl border border-border/60 p-7 hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/40 dark:to-accent-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── Financing CTA ────── */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 p-10 lg:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-400/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 text-center lg:text-left">
                <Badge className="bg-accent-500/20 text-accent-300 border-accent-500/30 mb-4">
                  <Calculator className="h-3 w-3 mr-1" />
                  Financing Tools
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white">
                  See What You Can Afford
                </h2>
                <p className="text-brand-200 mt-3 max-w-lg">
                  Use our payment calculator to estimate monthly payments, or
                  get pre-qualified for financing in minutes — no impact to your
                  credit score.
                </p>
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mt-8">
                  <Link href="/financing">
                    <Button
                      size="lg"
                      className="bg-accent-500 hover:bg-accent-600 text-white rounded-full px-8 shadow-xl shadow-accent-500/25"
                    >
                      Payment Calculator
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 border-white/20 text-white hover:bg-white/10 hover:text-white"
                    >
                      Talk to Finance Team
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="shrink-0 w-full lg:w-auto">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 max-w-sm mx-auto">
                  <p className="text-brand-300 text-sm mb-1">
                    Estimated Monthly Payment
                  </p>
                  <p className="text-4xl font-heading font-bold text-white">
                    $583<span className="text-lg text-brand-400">/mo</span>
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-brand-300">
                    <div className="flex justify-between">
                      <span>Vehicle Price</span>
                      <span className="text-white">$35,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment</span>
                      <span className="text-white">$5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Term</span>
                      <span className="text-white">60 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>APR</span>
                      <span className="text-white">6.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
