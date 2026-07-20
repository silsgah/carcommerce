import type { Metadata } from "next";
import Image from "next/image";
import { Award, Users, ShieldCheck, HeartHandshake, MapPin, Phone, Mail, Globe, Ship, Car, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | AnyCargh - Cars for All Budgets",
  description:
    "Based in Ashale Botwe, Accra (near East Legon Hills), AnyCarGH is a leading vehicle sales, import sourcing, and premium car rental provider in Ghana under CEO John Kofi Boateng.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden min-h-[45vh] flex items-center p-8 sm:p-12 lg:p-16 border border-border/60 text-white shadow-2xl">
          {/* Background Car Image & Overlays */}
          <div className="absolute inset-0">
            <Image
              src="/vehicles/hero-bg.jpg"
              alt="AnyCargh Luxury Showroom & Fleet"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950/90 to-emerald-950/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              ✦ About AnyCargh
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white">
              Cars for All Budgets
            </h1>

            <div className="space-y-4 text-zinc-200 text-sm sm:text-base leading-relaxed">
              <p className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
                Based in Ashale Botwe, Accra (near East Legon Hills), AnyCarGH is a leading vehicle sales, import sourcing, and premium car rental provider in Ghana. Under the leadership of CEO John Kofi Boateng, we operate with absolute integrity, offering transparent customs clearing, verified safety standards, and top-tier logistics support.
              </p>
              <p className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
                From luxury sedans and family SUVs to robust commercial utility fleets, we coordinate the entire vehicle procurement, clearing, and delivery cycle. Whether you&apos;re buying your next car, booking a short-term rental, or importing a vehicle from overseas, we stand by your side with professional guidance every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Pillar Services */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              Our Core Services
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Three pillars built to deliver value and accessibility for every vehicle owner in Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-2xl border-border/60 space-y-4 bg-background hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">Vehicle Sales</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Right Car, The Right Price — Every Time. Inspected, verified, and priced to fit real budgets.
              </p>
            </Card>

            <Card className="p-6 rounded-2xl border-border/60 space-y-4 bg-background hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">Car Rentals</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Wherever You&apos;re Headed, We&apos;ve Got the Wheels. Clean, reliable rental fleet available on your terms.
              </p>
            </Card>

            <Card className="p-6 rounded-2xl border-border/60 space-y-4 bg-background hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">Vehicle Importation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                From Overseas to Your Driveway. Sourcing, shipping, clearing, and delivering vehicles from trusted overseas markets.
              </p>
            </Card>
          </div>
        </div>

        {/* Location & Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-border/60">
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">Visit Our Showroom</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We invite you to visit our main facility in Accra to inspect our vehicle inventory, meet our leadership team, or discuss custom vehicle import requests.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Ashale Botwe, Accra (near East Legon Hills)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>055 030 5555</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>info@anycarghana.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>anycarghana.com</span>
              </div>
            </div>
          </div>

          <Card className="p-6 border-border/60 rounded-2xl bg-background">
            <h3 className="font-heading font-semibold text-base text-foreground mb-4">Business Hours</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                { day: "Monday", hours: "9:00 AM - 6:00 PM" },
                { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
                { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
                { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
                { day: "Friday", hours: "9:00 AM - 6:00 PM" },
                { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((h) => (
                <div key={h.day} className="flex justify-between pb-2 border-b border-border/30 last:border-0 last:pb-0">
                  <span>{h.day}</span>
                  <span className="font-semibold text-foreground">{h.hours}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
