import type { Metadata } from "next";
import Image from "next/image";
import { Award, Users, ShieldCheck, HeartHandshake, MapPin, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AutoLot's mission, values, our experienced team, and why we are the premier auto dealer in Springfield.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden min-h-[40vh] flex items-center p-8 sm:p-12 lg:p-16 border">
          <Image
            src="https://images.unsplash.com/photo-1562575214-da9fcf59b907?w=1200&h=600&fit=crop"
            alt="Dealership team"
            fill
            className="object-cover opacity-20 dark:opacity-10"
          />
          <div className="relative max-w-2xl space-y-4">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Our Journey & Mission
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Founded in 2001, AutoLot was built on a simple premise: vehicle buying should be
              straightforward, transparent, and enjoyable. We have helped over 15,000 drivers in
              Springfield find quality vehicles matching their budgets and lifestyles.
            </p>
          </div>
        </div>

        {/* Value Props */}
        <div className="space-y-8">
          <h2 className="text-2xl font-heading font-bold text-center text-foreground">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Certified Integrity",
                desc: "We stand behind every car we sell. Rigorous testing and honest vehicle condition reports.",
              },
              {
                icon: HeartHandshake,
                title: "Customer First",
                desc: "No high-pressure sales tactics. We work at your pace to find the perfect fit.",
              },
              {
                icon: Award,
                title: "Premium Standards",
                desc: "We curate our inventory meticulously, ensuring only quality vehicles reach our lot.",
              },
              {
                icon: Users,
                title: "Local Community",
                desc: "Springfield is our home. We proudly support local organizations, schools, and charities.",
              },
            ].map((v) => (
              <Card key={v.title} className="p-6 border-border/50 rounded-2xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                  <v.icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Location & Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t">
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">Visit Our Showroom</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We invite you to visit our state-of-the-art showroom in Springfield. Explore our full
              collection up close, speak with our product advisers, and experience the AutoLot difference.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
                <span>123 Auto Drive, Springfield, IL 62701</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent-500 shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent-500 shrink-0" />
                <span>info@autolot.com</span>
              </div>
            </div>
          </div>
          <Card className="p-6 border-border/50 rounded-2xl">
            <h3 className="font-heading font-semibold text-base text-foreground mb-4">Business Hours</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                { day: "Monday", hours: "9:00 AM - 8:00 PM" },
                { day: "Tuesday", hours: "9:00 AM - 8:00 PM" },
                { day: "Wednesday", hours: "9:00 AM - 8:00 PM" },
                { day: "Thursday", hours: "9:00 AM - 8:00 PM" },
                { day: "Friday", hours: "9:00 AM - 8:00 PM" },
                { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((h) => (
                <div key={h.day} className="flex justify-between pb-2 border-b border-border/30 last:border-0 last:pb-0">
                  <span>{h.day}</span>
                  <span className="font-semibold text-foreground">{h.hours}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
