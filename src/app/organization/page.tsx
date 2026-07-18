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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrganizationClient } from "./organization-client";

export const metadata: Metadata = {
  title: "Organizational Structure & Team Directory | AnyCar Gh",
  description:
    "Explore AnyCar Gh's organizational structure, leadership team, functional departments, and core vehicle importation, sales, and logistics services.",
};

const coreServices = [
  {
    title: "Vehicle Importation & Shipping",
    desc: "Seamless overseas vehicle procurement, port clearance, customs documentation, and logistics tracking.",
    icon: Ship,
    badge: "Operations",
  },
  {
    title: "Vehicle Sales & Showroom",
    desc: "Curated selection of premium new and pre-owned automobiles with transparent pricing and demonstrations.",
    icon: Car,
    badge: "Sales",
  },
  {
    title: "Car Rentals & Fleet Management",
    desc: "Comprehensive rental services, fleet allocation, maintenance scheduling, and corporate mobility.",
    icon: Briefcase,
    badge: "Fleet",
  },
  {
    title: "Logistics Coordination",
    desc: "End-to-end vehicle delivery, transport management, and supply chain efficiency across Ghana.",
    icon: TrendingUp,
    badge: "Logistics",
  },
  {
    title: "Customer Experience & Lounge",
    desc: "Dedicated hospitality and entertainment to ensure top-tier client satisfaction during every visit.",
    icon: Headphones,
    badge: "Experience",
  },
  {
    title: "Finance & Admin Support",
    desc: "Transparent invoicing, corporate budgeting, documentation compliance, and client financing assistance.",
    icon: Calculator,
    badge: "Finance",
  },
];

export default function OrganizationPage() {
  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-accent-950 text-white p-8 sm:p-12 lg:p-16 border border-brand-800 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-accent-300">
              <Sparkles className="w-3.5 h-3.5" />
              Leadership & Corporate Structure
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
                  AnyCar<span className="text-accent-400">Gh</span>
                </h1>
                <p className="text-accent-200 text-xs sm:text-sm tracking-wider uppercase font-medium mt-0.5">
                  Organizational Structure & Team Directory
                </p>
              </div>
            </div>

            <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
              Our 11-member multi-disciplinary team is led by our Chief Executive Officer and structured across three primary functional divisions: 
              <strong className="text-white"> Operations & Logistics</strong>, 
              <strong className="text-white"> Sales & Business Development</strong>, and 
              <strong className="text-white"> Finance & Administration</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs text-brand-200">
              <div>
                <span className="block text-xl font-extrabold text-white font-heading">11</span>
                <span>Team Members</span>
              </div>
              <div>
                <span className="block text-xl font-extrabold text-accent-400 font-heading">3</span>
                <span>Core Divisions</span>
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white font-heading">6</span>
                <span>Primary Services</span>
              </div>
              <div>
                <span className="block text-xl font-extrabold text-accent-400 font-heading">100%</span>
                <span>Customer Focus</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              Core Services & Operations
            </h2>
            <p className="text-muted-foreground text-sm">
              AnyCar Gh provides full end-to-end automotive mobility solutions across Ghana and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service) => (
              <Card
                key={service.title}
                className="p-6 border-border/60 hover:border-brand-500/40 hover:shadow-lg transition-all duration-300 rounded-2xl group relative overflow-hidden"
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

        {/* Interactive Org Chart & Directory Component */}
        <OrganizationClient />
      </div>
    </div>
  );
}
