import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Tag, CheckCircle2, ArrowRight, ShieldCheck, Phone, Mail, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Vehicle Sales | AnyCargh - The Right Car, The Right Price — Every Time",
  description:
    "Every vehicle on the AnyCargh lot is inspected, verified, and priced to fit real budgets. Discover honest deals on quality vehicles with zero pressure or hidden costs.",
};

export default function SalesServicePage() {
  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Banner Section - Front facing shot */}
        <section className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl min-h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/vehicles/lc-prado-1.jpg"
              alt="Front-facing vehicle shot on AnyCargh sales lot"
              fill
              className="object-cover opacity-35"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              AnyCargh Sales Division
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              The Right Car, The Right Price — Every Time.
            </h1>

            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed bg-black/60 p-5 rounded-2xl border border-white/10 backdrop-blur-xs">
              Buying a car shouldn&apos;t feel like a gamble. Every vehicle on the AnyCargh lot is inspected, verified, and priced to fit real budgets — not just the lucky few. Whether it&apos;s a first car or an upgrade for a growing family, our sales team walks with you from the first test drive to the final handshake. No pressure, no hidden costs — just an honest deal on a car you&apos;ll actually love driving home in. Because at AnyCargh, everyone deserves a car that fits their life, and their wallet.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/inventory">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 font-bold text-sm shadow-lg shadow-emerald-500/25">
                  Browse Inventory <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 text-sm font-semibold">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Pillars of AnyCargh Sales */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl border-border/60 space-y-3 bg-background">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">Verified Multi-Point Inspection</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every vehicle undergoes exhaustive mechanical and safety testing before listing. No surprises.
            </p>
          </Card>

          <Card className="p-6 rounded-2xl border-border/60 space-y-3 bg-background">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">Transparent Cedi Pricing</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All prices displayed transparently in Ghana Cedis (GH₵). What you see is what you pay.
            </p>
          </Card>

          <Card className="p-6 rounded-2xl border-border/60 space-y-3 bg-background">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground">Guided Test Drives & Handshake</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our dedicated sales executive Richmond Ganaku and team walk with you every step of the journey.
            </p>
          </Card>
        </section>

        {/* Contact CTA card */}
        <Card className="p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-white">Have a Sales Inquiry?</h2>
            <p className="text-xs text-zinc-400">
              Email our dedicated sales department at <span className="text-emerald-400 font-mono">sales@anycarghana.com</span> or call <span className="text-emerald-400">055 030 5555</span>.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full px-6 text-xs shrink-0">
              Get a Quote Now
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
