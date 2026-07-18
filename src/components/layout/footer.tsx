import Link from "next/link";
import Image from "next/image";
import {
  Car,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/inventory", label: "Browse Inventory" },
  { href: "/financing", label: "Financing Calculator" },
  { href: "/organization", label: "Organizational Structure" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/favorites", label: "Saved Vehicles" },
  { href: "/compare", label: "Compare Vehicles" },
];

const vehicleLinks = [
  { href: "/inventory?condition=NEW", label: "New Vehicles" },
  { href: "/inventory?condition=USED", label: "Used Vehicles" },
  { href: "/inventory?condition=CERTIFIED", label: "Certified Pre-Owned" },
  { href: "/inventory?bodyType=SUV", label: "SUVs" },
  { href: "/inventory?bodyType=SEDAN", label: "Sedans" },
  { href: "/inventory?bodyType=TRUCK", label: "Trucks" },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-brand-700 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="AnyCar Gh Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  AnyCar<span className="text-accent-400">Gh</span>
                </span>
              </div>
            </Link>
            <p className="text-brand-300 text-sm leading-relaxed">
              Your premier destination for quality vehicles. We offer a curated
              selection of new and pre-owned cars with transparent pricing and
              exceptional service.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse Vehicles */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4">
              Browse Vehicles
            </h3>
            <ul className="space-y-2.5">
              {vehicleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4">
              Visit Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-brand-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent-500" />
                123 Auto Drive, Springfield, IL 62701
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm text-brand-400 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-500" />
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@autolot.com"
                  className="flex items-center gap-3 text-sm text-brand-400 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent-500" />
                  info@autolot.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-brand-400">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-accent-500" />
                <div>
                  <p>Mon-Fri: 9AM - 8PM</p>
                  <p>Saturday: 9AM - 6PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-brand-800" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-500">
          <p>© {new Date().getFullYear()} AutoLot. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-brand-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-brand-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
