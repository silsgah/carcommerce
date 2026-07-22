"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Heart,
  GitCompareArrows,
  Menu,
  X,
  Moon,
  Sun,
  Search,
  Phone,
  MapPin,
  ChevronDown,
  Tag,
  Calendar,
  Ship,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useCompareStore } from "@/stores/compare-store";
import { cn } from "@/lib/utils";

const serviceDropdownItems = [
  { href: "/services/sales", label: "Sales", desc: "The Right Car, The Right Price — Every Time.", icon: Tag },
  { href: "/services/rental", label: "Rental", desc: "Wherever You're Headed, We've Got the Wheels.", icon: Calendar },
  { href: "/services/importation", label: "Importation", desc: "From Overseas to Your Driveway.", icon: Ship },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const favorites = useFavoritesStore((s) => s.favorites);
  const compareVehicles = useCompareStore((s) => s.vehicles);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const headerBg = scrolled || !isHome;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-xs border-b border-zinc-200"
    >
      {/* Top bar */}
      <div
        className={cn(
          "hidden lg:block transition-all duration-300 overflow-hidden border-b border-zinc-100 bg-zinc-50/80",
          scrolled ? "max-h-0 opacity-0 py-0" : "max-h-10 opacity-100 py-1.5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-zinc-700">
              <Phone className="h-3.5 w-3.5 text-emerald-600" />
              055 030 5555
            </span>
            <span className="flex items-center gap-1.5 text-zinc-600">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              Ashale Botwe, Accra (near East Legon Hills)
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <Link href="/financing" className="hover:text-emerald-600 transition-colors">
              Financing Calculator
            </Link>
            <span>|</span>
            <Link href="/organization" className="hover:text-emerald-600 transition-colors">
              Leadership & Team
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-xs border border-zinc-200 group-hover:scale-105 transition-transform bg-white shrink-0 p-0.5">
              <Image
                src="/logo.jpg"
                alt="AnyCargh Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-none font-heading text-black">
                AnyCar<span className="text-emerald-600">gh</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] font-bold leading-none mt-1 text-zinc-600">
                Sales · Rental · Importation
              </span>
            </div>
          </Link>

          {/* Desktop nav - Exact Content Brief Order: HOME | ABOUT US | SERVICES | OUR TEAM | CSR | CONTACT */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* HOME */}
            <Link
              href="/"
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                pathname === "/"
                  ? "text-emerald-600 font-extrabold"
                  : "text-zinc-700 hover:text-black hover:bg-zinc-100"
              )}
            >
              HOME
            </Link>

            {/* ABOUT US */}
            <Link
              href="/about"
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                pathname === "/about"
                  ? "text-emerald-600 font-extrabold"
                  : "text-zinc-700 hover:text-black hover:bg-zinc-100"
              )}
            >
              ABOUT US
            </Link>

            {/* SERVICES Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                  pathname.startsWith("/services")
                    ? "text-emerald-600 font-extrabold"
                    : "text-zinc-700 hover:text-black hover:bg-zinc-100"
                )}
              >
                SERVICES
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-2 w-72 z-50"
                  >
                    <div className="p-2 rounded-2xl bg-white shadow-xl border border-zinc-200">
                      {serviceDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-100 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* OUR TEAM */}
            <Link
              href="/organization"
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                pathname === "/organization"
                  ? "text-emerald-600 font-extrabold"
                  : "text-zinc-700 hover:text-black hover:bg-zinc-100"
              )}
            >
              OUR TEAM
            </Link>

            {/* CSR */}
            <Link
              href="/csr"
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                pathname === "/csr"
                  ? "text-emerald-600 font-extrabold"
                  : "text-zinc-700 hover:text-black hover:bg-zinc-100"
              )}
            >
              CSR
            </Link>

            {/* CONTACT */}
            <Link
              href="/contact"
              className={cn(
                "px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                pathname === "/contact"
                  ? "text-emerald-600 font-extrabold"
                  : "text-zinc-700 hover:text-black hover:bg-zinc-100"
              )}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <Link href="/inventory">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-zinc-700 hover:text-black hover:bg-zinc-100"
              >
                <Search className="h-[18px] w-[18px]" />
              </Button>
            </Link>

            {/* Favorites */}
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative text-zinc-700 hover:text-black hover:bg-zinc-100"
              >
                <Heart className="h-[18px] w-[18px]" />
                {mounted && favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Theme toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full text-zinc-700 hover:text-black hover:bg-zinc-100"
              >
                {theme === "dark" ? (
                  <Sun className="h-[18px] w-[18px]" />
                ) : (
                  <Moon className="h-[18px] w-[18px]" />
                )}
              </Button>
            )}

            {/* Standalone Black CTA Button on Far Right: "Get a Quote" */}
            <Link href="/contact" className="hidden lg:block ml-3">
              <Button
                size="sm"
                className="bg-black hover:bg-zinc-800 text-white border border-zinc-800 font-bold tracking-wide rounded-full px-6 shadow-md hover:border-emerald-500 transition-all text-xs"
              >
                Get a Quote
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="lg:hidden"
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full",
                      isHome && !scrolled
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-text-secondary"
                    )}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full bg-background">
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-border/40 bg-white">
                        <Image
                          src="/logo.jpg"
                          alt="AnyCargh Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xl font-extrabold tracking-tight font-heading">
                        AnyCar<span className="text-emerald-500">gh</span>
                      </span>
                    </div>
                  </div>

                  <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-surface-secondary"
                    >
                      HOME
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-surface-secondary"
                    >
                      ABOUT US
                    </Link>
                    
                    {/* Mobile Services Section */}
                    <div className="space-y-1 pt-2 pb-2">
                      <div className="px-4 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                        SERVICES
                      </div>
                      {serviceDropdownItems.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-surface-secondary"
                        >
                          <s.icon className="w-3.5 h-3.5 text-emerald-500" />
                          {s.label}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/organization"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-surface-secondary"
                    >
                      OUR TEAM
                    </Link>

                    <Link
                      href="/csr"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-surface-secondary"
                    >
                      CSR
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-surface-secondary"
                    >
                      CONTACT
                    </Link>
                  </nav>

                  <div className="p-4 border-t space-y-2">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-black hover:bg-zinc-800 text-white rounded-xl font-bold text-xs">
                        Get a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
