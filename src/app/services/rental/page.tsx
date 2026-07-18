"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, CheckCircle2, ArrowRight, Clock, Phone, Mail, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function RentalServicePage() {
  const todayStr = new Date().toISOString().split("T")[0];
  const defaultEndStr = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(defaultEndStr);

  const getDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const rentalDays = getDays();
  const isExceeded = rentalDays > 90;
  const isInvalid = rentalDays <= 0 || isExceeded;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInvalid) {
      if (isExceeded) {
        toast.error("Rental/Hold period cannot exceed 3 months (90 days).");
      } else {
        toast.error("End date must be after start date.");
      }
      return;
    }
    toast.success(`Rental reservation request submitted for ${rentalDays} days! We will contact you at 055 030 5555.`);
  };

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
              <a href="#rental-booking-form">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 font-bold text-sm shadow-lg shadow-emerald-500/25">
                  Book / Hold a Rental Vehicle <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Rental & Hold Duration Calculator */}
        <section id="rental-booking-form" className="scroll-mt-28">
          <Card className="p-8 rounded-3xl border-border/60 bg-background shadow-lg max-w-3xl mx-auto space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Rental / Hold Booking Request
              </h2>
              <p className="text-xs text-muted-foreground">
                Select your preferred rental start and end dates. <strong className="text-foreground">Maximum period allowed is 3 months (90 days).</strong>
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="rent-name">Full Name</Label>
                  <Input id="rent-name" required placeholder="e.g. Kwame Mensah" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="rent-phone">Phone Number</Label>
                  <Input id="rent-phone" type="tel" required placeholder="055 030 5555" />
                </div>
              </div>

              {/* Date Range Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
                <div className="space-y-1">
                  <Label htmlFor="start-date" className="text-xs font-semibold">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    required
                    min={todayStr}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="end-date" className="text-xs font-semibold">End Date (Max 3 Months)</Label>
                  <Input
                    id="end-date"
                    type="date"
                    required
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={cn(isExceeded && "border-red-500 focus-visible:ring-red-500")}
                  />
                </div>
              </div>

              {/* Duration Banner */}
              <div className="text-xs">
                {isExceeded ? (
                  <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Selected hold duration ({rentalDays} days) exceeds the maximum allowed 3 months (90 days). Please adjust end date.</span>
                  </div>
                ) : rentalDays > 0 ? (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-between">
                    <span>Total Rental Duration: {rentalDays} {rentalDays === 1 ? "day" : "days"}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-bold">
                      Within 90-Day Limit
                    </span>
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isInvalid}
                className={cn(
                  "w-full text-white font-bold rounded-full py-3 text-sm transition-all",
                  isInvalid ? "bg-zinc-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 shadow-md"
                )}
              >
                {isExceeded ? "Duration Exceeds 3-Month Limit" : "Submit Rental / Hold Request"}
              </Button>
            </form>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl border-border/60 space-y-3 bg-background">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">Flexible Rental Durations</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rent on your terms — from a few hours or weekend trip up to 3 months (90 days).
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
      </div>
    </div>
  );
}
