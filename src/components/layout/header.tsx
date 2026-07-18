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
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useCompareStore } from "@/stores/compare-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/inventory", label: "Inventory" },
  { href: "/financing", label: "Financing" },
  { href: "/organization", label: "Organization" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        headerBg
          ? "bg-white/80 dark:bg-brand-950/80 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div
        className={cn(
          "hidden lg:block transition-all duration-300 overflow-hidden",
          headerBg ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-xs">
          <div className={cn("flex items-center gap-4", isHome && !scrolled ? "text-white/80" : "text-text-muted")}>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              (555) 123-4567
            </span>
            <span>Mon-Fri: 9AM-8PM | Sat: 9AM-6PM</span>
          </div>
          <div className={cn("flex items-center gap-4", isHome && !scrolled ? "text-white/80" : "text-text-muted")}>
            <Link href="/financing" className="hover:text-accent-500 transition-colors">
              Get Pre-Qualified
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-lg shadow-md border border-border/40 group-hover:scale-105 transition-transform bg-white">
              <Image
                src="/logo.jpg"
                alt="AnyCar Gh Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-xl font-bold tracking-tight leading-none",
                  isHome && !scrolled
                    ? "text-white"
                    : "text-text-primary"
                )}
              >
                AnyCar<span className="text-accent-500">Gh</span>
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] leading-none mt-0.5",
                  isHome && !scrolled
                    ? "text-white/60"
                    : "text-text-muted"
                )}
              >
                Premium Autos & Logistics
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? isHome && !scrolled
                      ? "text-white"
                      : "text-brand-600 dark:text-brand-400"
                    : isHome && !scrolled
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                )}
              >
                {link.label}
                {(pathname === link.href || pathname.startsWith(link.href + "/")) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-accent-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <Link href="/inventory">
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
                <Search className="h-[18px] w-[18px]" />
              </Button>
            </Link>

            {/* Favorites */}
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full relative",
                  isHome && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-text-secondary"
                )}
              >
                <Heart className="h-[18px] w-[18px]" />
                {mounted && favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Compare */}
            <Link href="/compare">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full relative",
                  isHome && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-text-secondary"
                )}
              >
                <GitCompareArrows className="h-[18px] w-[18px]" />
                {mounted && compareVehicles.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {compareVehicles.length}
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
                className={cn(
                  "rounded-full",
                  isHome && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-text-secondary"
                )}
              >
                {theme === "dark" ? (
                  <Sun className="h-[18px] w-[18px]" />
                ) : (
                  <Moon className="h-[18px] w-[18px]" />
                )}
              </Button>
            )}

            {/* CTA */}
            <Link href="/inventory" className="hidden lg:block ml-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40 transition-all rounded-full px-5"
              >
                Browse Cars
              </Button>
            </Link>

            {/* Mobile menu */}
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
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 overflow-hidden rounded-lg shadow-md border border-border/40 bg-white">
                        <Image
                          src="/logo.jpg"
                          alt="AnyCar Gh Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xl font-bold tracking-tight">
                        AnyCar<span className="text-accent-500">Gh</span>
                      </span>
                    </div>
                  </div>
                  <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                          pathname === link.href
                            ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                            : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t mt-4">
                      <Link
                        href="/favorites"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Heart className="h-4 w-4" /> Favorites
                        </span>
                        {mounted && favorites.length > 0 && (
                          <span className="w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center">
                            {favorites.length}
                          </span>
                        )}
                      </Link>
                      <Link
                        href="/compare"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <GitCompareArrows className="h-4 w-4" /> Compare
                        </span>
                        {mounted && compareVehicles.length > 0 && (
                          <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                            {compareVehicles.length}
                          </span>
                        )}
                      </Link>
                    </div>
                  </nav>
                  <div className="p-4 border-t">
                    <Link
                      href="/inventory"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Button className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl">
                        Browse Cars
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
