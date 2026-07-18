"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Building2,
  FileText,
  ShieldCheck,
  Briefcase,
  Ship,
  TrendingUp,
  Calculator,
  Headphones,
  Wrench,
  Car,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  number: string;
  name: string;
  position: string;
  department: "Executive Leadership" | "Operations & Logistics" | "Sales & Business Development" | "Finance & Administration";
  reportsTo: string;
  roles: string;
  initials: string;
  color: string;
  icon: any;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    number: "01",
    name: "John Boateng",
    position: "Chief Executive Officer (CEO)",
    department: "Executive Leadership",
    reportsTo: "Board of Directors / Stakeholders",
    roles:
      "Sets the company's vision and strategy, oversees business performance, approves major investments, builds partnerships, manages key stakeholders, ensures legal compliance, and drives business growth.",
    initials: "JB",
    color: "from-amber-500 to-amber-700",
    icon: ShieldCheck,
  },
  {
    id: "2",
    number: "02",
    name: "Prosper Kaitey Kwame",
    position: "Operations & Logistics Manager",
    department: "Operations & Logistics",
    reportsTo: "Chief Executive Officer (CEO)",
    roles:
      "Oversees day-to-day operations, coordinates vehicle imports and exports, manages shipping schedules, supervises fleet movement, ensures timely vehicle delivery, and improves operational efficiency.",
    initials: "PK",
    color: "from-blue-500 to-indigo-600",
    icon: Ship,
  },
  {
    id: "3",
    number: "03",
    name: "Samuel Kofi Asare",
    position: "Sales & Business Development Manager",
    department: "Sales & Business Development",
    reportsTo: "Chief Executive Officer (CEO)",
    roles:
      "Develops sales strategies, manages the sales team, identifies new business opportunities, builds corporate partnerships, negotiates contracts, and drives revenue growth.",
    initials: "SA",
    color: "from-emerald-500 to-teal-700",
    icon: TrendingUp,
  },
  {
    id: "4",
    number: "04",
    name: "Linda Esi Arthur",
    position: "Finance & Administration Officer",
    department: "Finance & Administration",
    reportsTo: "Chief Executive Officer (CEO)",
    roles:
      "Manages accounting, payroll, budgeting, invoicing, expense tracking, office administration, procurement support, and prepares financial reports for management.",
    initials: "LA",
    color: "from-purple-500 to-purple-700",
    icon: Calculator,
  },
  {
    id: "5",
    number: "05",
    name: "Richmond Ganaku",
    position: "Vehicle Sales Executive",
    department: "Sales & Business Development",
    reportsTo: "Sales & Business Development Manager",
    roles:
      "Markets and sells vehicles, follows up with leads, conducts vehicle demonstrations, prepares quotations, manages customer relationships, and ensures high customer satisfaction.",
    initials: "RG",
    color: "from-emerald-600 to-green-700",
    icon: Car,
  },
  {
    id: "6",
    number: "06",
    name: "Reynold Antwi",
    position: "Marketing & Customer Relations Officer",
    department: "Sales & Business Development",
    reportsTo: "Sales & Business Development Manager",
    roles:
      "Manages social media and digital marketing, creates promotional campaigns, responds to customer inquiries, manages online listings, strengthens the company's brand, and supports customer retention.",
    initials: "RA",
    color: "from-teal-500 to-emerald-600",
    icon: Users,
  },
  {
    id: "7",
    number: "07",
    name: "Richard Adanu",
    position: "Shipping & Documentation Officer",
    department: "Operations & Logistics",
    reportsTo: "Operations & Logistics Manager",
    roles:
      "Handles import/export documentation, liaises with shipping lines, customs agents, and ports, tracks shipments, processes vehicle registration documents, and ensures compliance with shipping regulations.",
    initials: "RA",
    color: "from-blue-600 to-cyan-600",
    icon: FileText,
  },
  {
    id: "8",
    number: "08",
    name: "Isaac Ohene Nyanteh",
    position: "Car Rental & Fleet Coordinator",
    department: "Operations & Logistics",
    reportsTo: "Operations & Logistics Manager",
    roles:
      "Manages rental bookings, allocates vehicles, oversees rental agreements, monitors vehicle availability, coordinates fleet utilization, and ensures timely returns and inspections.",
    initials: "IN",
    color: "from-cyan-600 to-blue-700",
    icon: Briefcase,
  },
  {
    id: "9",
    number: "09",
    name: "Stanley Ofori Agyeman",
    position: "Entertainment & Customer Experience Officer",
    department: "Operations & Logistics",
    reportsTo: "Operations & Logistics Manager",
    roles:
      "Creates a comfortable, engaging, and enjoyable environment for customers while they wait, enhancing the overall customer experience and the company's brand image.",
    initials: "SA",
    color: "from-sky-500 to-indigo-600",
    icon: Headphones,
  },
  {
    id: "10",
    number: "10",
    name: "Leslie Nii Okai",
    position: "Facility Manager",
    department: "Operations & Logistics",
    reportsTo: "Operations & Logistics Manager",
    roles:
      "Ensures the garage, office, and surrounding facilities are safe, functional, clean, and operating efficiently while supporting daily business operations.",
    initials: "LO",
    color: "from-slate-600 to-slate-800",
    icon: Wrench,
  },
  {
    id: "11",
    number: "11",
    name: "Isaac Kumah",
    position: "Facility Manager",
    department: "Operations & Logistics",
    reportsTo: "Operations & Logistics Manager",
    roles:
      "Ensures the garage, office, and surrounding facilities are safe, functional, clean, and operating efficiently while supporting daily business operations.",
    initials: "IK",
    color: "from-slate-600 to-slate-800",
    icon: Wrench,
  },
];

const departments = [
  "All",
  "Executive Leadership",
  "Operations & Logistics",
  "Sales & Business Development",
  "Finance & Administration",
] as const;

export function OrganizationClient() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"directory" | "chart">("chart");

  const filteredMembers = teamMembers.filter((m) => {
    const matchesDept =
      selectedDept === "All" || m.department === selectedDept;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.roles.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* View Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-secondary border border-border/50">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "chart" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("chart")}
            className="rounded-xl gap-2 font-medium text-xs sm:text-sm"
          >
            <Layers className="w-4 h-4" />
            Org Chart View
          </Button>
          <Button
            variant={viewMode === "directory" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("directory")}
            className="rounded-xl gap-2 font-medium text-xs sm:text-sm"
          >
            <Users className="w-4 h-4" />
            Team Directory
          </Button>
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, title, or responsibilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-10 rounded-xl bg-background border-border/60 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Organizational Hierarchy Chart View */}
      {viewMode === "chart" && (
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Organizational Hierarchy & Reporting Structure
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Visualizing the reporting flow from the CEO to functional management and operational staff.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-background border border-border/60 shadow-sm overflow-x-auto">
            <div className="min-w-[850px] flex flex-col items-center space-y-8">
              {/* Level 1: CEO */}
              <div className="flex flex-col items-center">
                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/40 shadow-lg text-center max-w-xs w-72">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-amber-500 text-white mb-2 inline-block">
                    Chief Executive
                  </span>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold text-lg flex items-center justify-center mx-auto mb-2 shadow-md">
                    JB
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground">John Boateng</h3>
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Chief Executive Officer (CEO)</p>
                  <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2">
                    Strategy, vision, business growth, investments & compliance.
                  </p>
                </div>
                {/* Connecting Line Down */}
                <div className="w-0.5 h-8 bg-border" />
                <div className="w-[80%] h-0.5 bg-border relative">
                  <div className="absolute left-0 top-0 w-0.5 h-6 bg-border" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-border" />
                  <div className="absolute right-0 top-0 w-0.5 h-6 bg-border" />
                </div>
              </div>

              {/* Level 2: Department Managers */}
              <div className="grid grid-cols-3 gap-6 w-full pt-4">
                {/* Branch 1: Operations & Logistics */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="p-4 rounded-2xl bg-blue-500/10 border-2 border-blue-500/40 shadow-md text-center w-full">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white mb-1.5 inline-block">
                      Operations & Logistics
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-1">
                      PK
                    </div>
                    <h4 className="font-heading font-bold text-sm text-foreground">Prosper Kaitey Kwame</h4>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Operations & Logistics Manager</p>
                  </div>
                  <div className="w-0.5 h-6 bg-border" />
                  {/* Operations Staff Nodes */}
                  <div className="space-y-3 w-full">
                    {[
                      { name: "Richard Adanu", title: "Shipping & Documentation", icon: FileText },
                      { name: "Isaac Ohene Nyanteh", title: "Car Rental & Fleet", icon: Briefcase },
                      { name: "Stanley Ofori Agyeman", title: "Entertainment & Customer Exp.", icon: Headphones },
                      { name: "Leslie Nii Okai", title: "Facility Manager", icon: Wrench },
                      { name: "Isaac Kumah", title: "Facility Manager", icon: Wrench },
                    ].map((staff) => (
                      <div
                        key={staff.name}
                        className="p-3 rounded-xl bg-surface-secondary border border-border/50 text-left flex items-center gap-3 shadow-xs hover:border-blue-400/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <staff.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-foreground">{staff.name}</div>
                          <div className="text-[10px] text-muted-foreground">{staff.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Branch 2: Sales & Business Dev */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 shadow-md text-center w-full">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white mb-1.5 inline-block">
                      Sales & Business Dev
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-sm flex items-center justify-center mx-auto mb-1">
                      SA
                    </div>
                    <h4 className="font-heading font-bold text-sm text-foreground">Samuel Kofi Asare</h4>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Sales & Business Dev Manager</p>
                  </div>
                  <div className="w-0.5 h-6 bg-border" />
                  {/* Sales Staff Nodes */}
                  <div className="space-y-3 w-full">
                    {[
                      { name: "Richmond Ganaku", title: "Vehicle Sales Executive", icon: Car },
                      { name: "Reynold Antwi", title: "Marketing & Customer Relations", icon: Users },
                    ].map((staff) => (
                      <div
                        key={staff.name}
                        className="p-3 rounded-xl bg-surface-secondary border border-border/50 text-left flex items-center gap-3 shadow-xs hover:border-emerald-400/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <staff.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-foreground">{staff.name}</div>
                          <div className="text-[10px] text-muted-foreground">{staff.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Branch 3: Finance & Admin */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="p-4 rounded-2xl bg-purple-500/10 border-2 border-purple-500/40 shadow-md text-center w-full">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-600 text-white mb-1.5 inline-block">
                      Finance & Admin
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-sm flex items-center justify-center mx-auto mb-1">
                      LA
                    </div>
                    <h4 className="font-heading font-bold text-sm text-foreground">Linda Esi Arthur</h4>
                    <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Finance & Administration Officer</p>
                  </div>
                  <div className="w-0.5 h-6 bg-border" />
                  <div className="p-4 rounded-xl bg-surface-secondary border border-purple-500/20 text-center w-full text-xs text-muted-foreground">
                    Direct executive reporting line. Manages corporate accounting, payroll, budgeting, invoicing & procurement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Department Tabs Filter */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDept === dept ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "rounded-full text-xs font-medium shrink-0 transition-all",
                selectedDept === dept
                  ? "bg-brand-600 hover:bg-brand-700 text-white shadow-md"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {dept}
              {dept === "All" && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                  {teamMembers.length}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Directory Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full p-6 border-border/60 hover:border-brand-500/50 hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col justify-between group bg-background">
                  <div className="space-y-4">
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl bg-gradient-to-br text-white font-bold text-base flex items-center justify-center shadow-md shrink-0",
                            member.color
                          )}
                        >
                          {member.initials}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            #{member.number}
                          </span>
                          <h3 className="font-heading font-bold text-base text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {member.name}
                          </h3>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-surface-secondary flex items-center justify-center text-muted-foreground shrink-0 border border-border/40">
                        <member.icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Position & Department */}
                    <div className="space-y-1.5 pt-2 border-t border-border/40">
                      <div className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                        {member.position}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                        <Building2 className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                        <span>{member.department}</span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                      {member.roles}
                    </p>
                  </div>

                  {/* Reports To Footer */}
                  <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-medium">Reports To:</span>
                    <span className="font-semibold text-foreground bg-surface-secondary px-2.5 py-1 rounded-md border border-border/30">
                      {member.reportsTo}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <Users className="w-12 h-12 text-muted-foreground/40 mx-auto" />
            <h3 className="text-lg font-bold text-foreground">No team members found</h3>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search criteria or selected department filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
