import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CompareFloatingBar } from "@/components/ui/compare-tray";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AutoLot — Premium Vehicles, Transparent Pricing",
    template: "%s | AutoLot",
  },
  description:
    "Browse our curated selection of new and pre-owned vehicles. Transparent pricing, certified quality, and exceptional service at AutoLot.",
  keywords: [
    "car dealership",
    "used cars",
    "new cars",
    "certified pre-owned",
    "auto dealer",
    "buy car online",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AutoLot",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CompareFloatingBar />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
