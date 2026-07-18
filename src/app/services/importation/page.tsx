import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Ship, CheckCircle2, ArrowRight, FileText, Anchor, Phone, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Vehicle Importation Services | AnyCargh - From Overseas to Your Driveway",
  description:
    "AnyCargh handles overseas sourcing, shipping, port clearance, customs documentation, and door delivery across Ghana. Importation made simple.",
};

export default function ImportationServicePage() {
  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Banner Section - Front facing shot */}
        <section className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl min-h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/vehicles/converted/IMG_3726.jpg"
              alt="Front-facing imported vehicle"
              fill
              className="object-cover opacity-35"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Ship className="w-3.5 h-3.5" />
              AnyCargh Importation & Logistics Division
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              From Overseas to Your Driveway — We Handle the Journey.
            </h1>

            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed bg-black/60 p-5 rounded-2xl border border-white/10 backdrop-blur-xs">
              Importing a car can feel like a maze of paperwork, ports, and waiting. AnyCargh takes that weight off your shoulders — sourcing, shipping, clearing, and delivering vehicles from trusted markets abroad, and managing every document and every mile along the way. You choose the car; we bring it home to you, safely and on schedule. It&apos;s importation made simple, and it&apos;s one more way AnyCargh makes sure there&apos;s truly a car for every budget.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 font-bold text-sm shadow-lg shadow-emerald-500/25">
                  Request Vehicle Import <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Import Steps */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              End-to-End Import Process
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Managed by Richard Adanu (Shipping & Documentation) and Prosper Kaitey Kwame (Operations & Logistics).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Overseas Sourcing", desc: "We source verified vehicles from trusted auctions and dealers in US, Canada, Europe, and Asia." },
              { step: "02", title: "Shipping & Tracking", desc: "Overseas container and RoRo shipping with live tracking updates." },
              { step: "03", title: "Customs Clearing", desc: "Transparent customs documentation, port clearance, and duty assessment in Ghana." },
              { step: "04", title: "Doorstep Delivery", desc: "Final vehicle inspection, registration, and handover directly to your driveway." },
            ].map((s) => (
              <Card key={s.step} className="p-6 rounded-2xl border-border/60 space-y-3 bg-background relative">
                <span className="text-2xl font-extrabold text-emerald-500 font-heading block">{s.step}</span>
                <h3 className="font-heading font-bold text-base text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Import Contact CTA */}
        <Card className="p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-white">Ready to Import Your Dream Vehicle?</h2>
            <p className="text-xs text-zinc-400">
              Email our importation desk at <span className="text-emerald-400 font-mono">imports@anycarghana.com</span> or call <span className="text-emerald-400">055 030 5555</span>.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full px-6 text-xs shrink-0">
              Submit Import Request
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
