import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility (CSR) | AnyCargh - Giving Back",
  description:
    "At AnyCargh, our commitment goes beyond the vehicles we sell, rent, and import. Discover our community support and upcoming flood relief donation initiative in Ghana.",
};

export default function CSRPage() {
  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Banner Section */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-emerald-950 text-white p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl min-h-[45vh] flex items-center">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current text-emerald-400" />
              Corporate Social Responsibility
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Giving Back to the Communities That Drive Us Forward
            </h1>

            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs">
              At AnyCargh, our commitment goes beyond the vehicles we sell, rent, and import. We believe a business built on trust owes something back to the community that places its trust in us. AnyCargh is currently planning a flood relief donation to support communities across Ghana affected by flooding — details on the initiative will be shared here soon.
            </p>
          </div>
        </section>

        {/* CSR Initiatives Spotlight */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              Community Relief & Support
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Empowering local communities across Accra, Ashale Botwe, and disaster-affected regions in Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 rounded-3xl border-emerald-500/40 bg-gradient-to-br from-emerald-500/5 to-transparent space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-block">
                Upcoming Initiative
              </span>
              <h3 className="font-heading font-bold text-xl text-foreground">
                Ghana Flood Relief Donation Drive
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Providing essential supplies, emergency support, and logistics transport to families affected by recent seasonal flooding. Further details will be announced shortly.
              </p>
            </Card>

            <Card className="p-8 rounded-3xl border-border/60 bg-background space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-foreground flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-muted-foreground inline-block">
                Ongoing Commitment
              </span>
              <h3 className="font-heading font-bold text-xl text-foreground">
                Local Community Engagement
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Supporting youth employment, technical garage training in Ashale Botwe, and promoting road safety standards across Greater Accra.
              </p>
            </Card>
          </div>
        </section>

        {/* Contact CTA */}
        <Card className="p-8 rounded-3xl bg-black text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-heading font-bold text-white">Partner with AnyCargh CSR</h2>
            <p className="text-xs text-zinc-400">
              For partnership or community outreach inquiries, contact <span className="text-emerald-400 font-mono">info@anycarghana.com</span>.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full px-6 text-xs shrink-0">
              Contact CSR Desk
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
