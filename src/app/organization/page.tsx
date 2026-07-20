import type { Metadata } from "next";
import Image from "next/image";
import {
  Users,
  Briefcase,
  Ship,
  TrendingUp,
  Calculator,
  Building2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Car,
  FileText,
  Wrench,
  Headphones,
  FileSpreadsheet,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrganizationClient } from "./organization-client";

export const metadata: Metadata = {
  title: "AnyCargh Organizational Structure & Team Directory | AnyCar Gh",
  description:
    "Official organizational structure and team directory of AnyCargh, detailing our eleven-member team led by the CEO across Operations & Logistics, Sales & Business Development, and Finance & Administration.",
};

const coreServices = [
  {
    title: "Vehicle Importation & Shipping",
    desc: "Seamless overseas vehicle procurement, port clearance, shipping schedules, customs documentation, and logistics tracking.",
    icon: Ship,
    badge: "Operations",
  },
  {
    title: "Vehicle Sales & Showroom",
    desc: "Curated selection of premium new and pre-owned automobiles, market lead follow-up, vehicle demonstrations, and transparent quotations.",
    icon: Car,
    badge: "Sales",
  },
  {
    title: "Car Rentals & Fleet Management",
    desc: "Comprehensive rental bookings, fleet allocation, vehicle availability monitoring, rental agreements, and timely inspections.",
    icon: Briefcase,
    badge: "Fleet",
  },
  {
    title: "Logistics Coordination",
    desc: "End-to-end vehicle delivery, fleet movement supervision, transport management, and operational efficiency across Ghana.",
    icon: TrendingUp,
    badge: "Logistics",
  },
  {
    title: "Customer Service & Marketing",
    desc: "Digital marketing campaigns, social media, online listings, customer retention, and an engaging waiting lounge experience.",
    icon: Headphones,
    badge: "Experience",
  },
  {
    title: "Finance & Administration Support",
    desc: "Accounting, payroll, budgeting, invoicing, expense tracking, office administration, and financial management reports.",
    icon: Calculator,
    badge: "Finance",
  },
];

export default function OrganizationPage() {
  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden text-white p-8 sm:p-12 lg:p-16 border border-brand-800 shadow-2xl">
          {/* Background Car Image & Overlays */}
          <div className="absolute inset-0">
            <Image
              src="/vehicles/converted/IMG_3726.jpg"
              alt="AnyCargh Corporate Fleet"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-accent-300">
              <Sparkles className="w-3.5 h-3.5" />
              Official Corporate Document & Directory
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-1 shadow-lg shrink-0 border border-white/20">
                <Image
                  src="/logo.jpg"
                  alt="AnyCar Gh Logo"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white">
                  AnyCar<span className="text-accent-400">gh</span>
                </h1>
                <p className="text-accent-200 text-xs sm:text-sm tracking-wider uppercase font-medium mt-0.5">
                  Organizational Structure & Team Directory
                </p>
              </div>
            </div>

            <p className="text-brand-100 text-sm sm:text-base leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
              This document sets out AnyCargh&apos;s organizational structure — an eleven-member team led by the Chief Executive Officer, organized across three functional areas: 
              <strong className="text-white"> Operations & Logistics</strong>, 
              <strong className="text-white"> Sales & Business Development</strong>, and 
              <strong className="text-white"> Finance & Administration</strong>. The structure is built to support the company&apos;s core services: vehicle importation and shipping, vehicle sales, car rentals, fleet management, logistics coordination, and customer service and marketing.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs text-brand-200">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-2xl font-extrabold text-white font-heading">11</span>
                <span>Team Members</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-2xl font-extrabold text-accent-400 font-heading">3</span>
                <span>Functional Areas</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-2xl font-extrabold text-white font-heading">6</span>
                <span>Core Services</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-2xl font-extrabold text-accent-400 font-heading">100%</span>
                <span>Excellence & Trust</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              Company Core Services
            </h2>
            <p className="text-muted-foreground text-sm">
              Our organizational structure is engineered specifically to deliver seamless automotive solutions across Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service) => (
              <Card
                key={service.title}
                className="p-6 border-border/60 hover:border-brand-500/40 hover:shadow-lg transition-all duration-300 rounded-2xl group relative overflow-hidden bg-background"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-400/10 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary border border-border/50">
                    {service.badge}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-foreground mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Client Section: Charts, Directory & Reporting Lines */}
        <OrganizationClient />
      </div>
    </div>
  );
}
