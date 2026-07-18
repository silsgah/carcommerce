import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, CheckCircle2, ArrowRight, Clock, Phone, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Car Rental Services | AnyCargh - Wherever You're Headed, We've Got the Wheels",
  description:
    "Clean, reliable car rentals available on your terms, from a few hours to a few months. No long queues, no fine-print surprises at AnyCargh.",
};

export default function RentalServicePage() {
  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Banner Section - Front facing shot */}
        <section className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl min-h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/vehicles/converted/IMG_3824.jpg"
              alt="Front-facing rental car shot"
              fill
              className="object-cover opacity-35"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              AnyCargh Rental & Fleet Division
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Wherever You&apos;re Headed, We&apos;ve Got the Wheels.
            </h1>

            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed bg-black/60 p-5 rounded-2xl border border-white/10 backdrop-blur-xs">
              Need a car for a weekend trip, a business meeting, or just until yours is back on the road? AnyCargh&apos;s rental fleet is ready when you are — clean, reliable, and available on your terms, from a few hours to a few months. No long queues, no fine-print surprises. Tell us where you&apos;re headed, and we&apos;ll have the right vehicle waiting, so you can focus on the journey, not the logistics.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 font-bold text-sm shadow-lg shadow-emerald-500/25">
                  Book a Rental Vehicle <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl border-border/60 space-y-3 bg-background">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">Flexible Rental Durations</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rent on your terms — whether for a few hours, a weekend trip, or long-term executive lease.
            </p>
          </Card>

          <Card className="p-6 rounded-2xl border-border/60 space-y-3 bg-background">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">Clean, Inspected Vehicles</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every rental car undergoes thorough sanitization and safety inspection before handoff.
            </p>
          </Card>

          <Card className="p-6 rounded-2xl border-border/60 space-y-3 bg-background">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">Dedicated Rental Coordinator</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Managed by Isaac Ohene Nyanteh (Car Rental & Fleet Coordinator) for seamless bookings.
            </p>
          </Card>
        </section>

        {/* Rental Contact CTA */}
        <Card className="p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-white">Need a Rental Booking?</h2>
            <p className="text-xs text-zinc-400">
              Email our rental bookings desk at <span className="text-emerald-400 font-mono">rentals@anycarghana.com</span> or call <span className="text-emerald-400">055 030 5555</span>.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full px-6 text-xs shrink-0">
              Reserve a Vehicle
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
