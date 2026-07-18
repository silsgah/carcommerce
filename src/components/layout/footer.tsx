import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Ship,
  Car,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services/sales", label: "Sales" },
  { href: "/services/rental", label: "Rental" },
  { href: "/services/importation", label: "Importation" },
  { href: "/organization", label: "Our Team" },
  { href: "/csr", label: "CSR" },
  { href: "/contact", label: "Contact Us" },
];

const departmentEmails = [
  { dept: "General Inquiries", email: "info@anycarghana.com" },
  { dept: "Sales", email: "sales@anycarghana.com" },
  { dept: "Rentals", email: "rentals@anycarghana.com" },
  { dept: "Importation", email: "imports@anycarghana.com" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white mt-auto border-t border-zinc-800">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-zinc-700 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="AnyCargh Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight font-heading">
                  AnyCar<span className="text-emerald-500">gh</span>
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed">
              AnyCargh delivers unparalleled vehicle sales, reliable rentals, and seamless importation across Ghana. Discover transparency and certified quality tailored to your journey.
            </p>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com/share/188FXXC1b5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-emerald-600 flex items-center justify-center transition-colors text-zinc-300 hover:text-white border border-zinc-800"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/anycar_gh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-emerald-600 flex items-center justify-center transition-colors text-zinc-300 hover:text-white border border-zinc-800"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Department Emails */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 font-heading">
              Department Emails
            </h3>
            <ul className="space-y-3">
              {departmentEmails.map((item) => (
                <li key={item.dept} className="text-xs">
                  <div className="text-zinc-500 font-medium">{item.dept}</div>
                  <a href={`mailto:${item.email}`} className="text-zinc-300 hover:text-emerald-400 font-mono text-[11px] transition-colors">
                    {item.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 font-heading">
              Head Office
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Ashale Botwe, Accra (near East Legon Hills)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                <a href="tel:0550305555" className="hover:text-white transition-colors">
                  055 030 5555
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-emerald-500 shrink-0" />
                <a href="https://anycarghana.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  anycarghana.com
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <Clock className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Mon-Fri: 9AM-6PM | Sat: 9AM-4PM</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-zinc-800" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} AnyCargh. All rights reserved. Cars for All Budgets.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
