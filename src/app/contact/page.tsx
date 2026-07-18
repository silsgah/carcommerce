"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Phone, Mail, MapPin, Clock, Send, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(10, "Phone must be at least 10 digits"),
  service: zod.string().optional(),
  message: zod.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = zod.infer<typeof contactSchema>;

const departmentEmails = [
  { dept: "General Inquiries", purpose: "Main contact-form address", email: "info@anycarghana.com" },
  { dept: "Sales", purpose: "Vehicle sales enquiries", email: "sales@anycarghana.com" },
  { dept: "Rentals", purpose: "Rental bookings", email: "rentals@anycarghana.com" },
  { dept: "Importation", purpose: "Import requests & tracking", email: "imports@anycarghana.com" },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    toast.success("Message sent successfully! Our AnyCargh team will contact you shortly.");
    reset();
  };

  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
            Contact AnyCar<span className="text-emerald-500">gh</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Have questions about buying a vehicle, rental bookings, or custom overseas importation? Send us a message and our specialists will assist you right away.
          </p>
        </div>

        {/* Contact Form & Main Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Get a Quote / Send Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="e.g. John Mensah"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="055 030 5555"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message & Details</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us about the vehicle you wish to buy, rent, or import..."
                  rows={5}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white rounded-full px-8 py-2.5 font-bold text-xs shadow-md border border-zinc-800 hover:border-emerald-500 transition-all"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Submit Quote Request"}
              </Button>
            </form>
          </div>

          {/* Quick Info Box */}
          <div className="space-y-6">
            <Card className="p-6 rounded-3xl border-border/60 bg-background space-y-6">
              <h2 className="text-lg font-heading font-bold text-foreground">Contact Information</h2>

              <div className="space-y-4 text-xs text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-foreground">Address</div>
                    <div>Ashale Botwe, Accra (near East Legon Hills)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground">Phone</div>
                    <a href="tel:0550305555" className="hover:text-emerald-500 transition-colors font-semibold">
                      055 030 5555
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground">Website</div>
                    <a href="https://anycarghana.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors font-mono">
                      anycarghana.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-foreground">Business Hours</div>
                    <div>Mon-Fri: 9:00 AM - 6:00 PM</div>
                    <div>Sat: 9:00 AM - 4:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="text-xs font-bold text-foreground mb-2">Social Channels</div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com/share/188FXXC1b5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Facebook
                  </a>
                  <span>·</span>
                  <a
                    href="https://instagram.com/anycar_gh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Instagram (@anycar_gh)
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Department Emails Table */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Departmental Email Addresses
            </h2>
            <p className="text-xs text-muted-foreground">
              Direct departmental communication channels confirmed for AnyCargh.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-surface-secondary text-text-secondary uppercase text-[10px] font-bold tracking-wider border-b border-border/60">
                <tr>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Purpose</th>
                  <th className="py-3.5 px-6">Suggested Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-foreground">
                {departmentEmails.map((dept) => (
                  <tr key={dept.dept} className="hover:bg-surface-secondary/40 transition-colors">
                    <td className="py-4 px-6 font-bold font-heading text-foreground">{dept.dept}</td>
                    <td className="py-4 px-6 text-xs text-muted-foreground">{dept.purpose}</td>
                    <td className="py-4 px-6">
                      <a href={`mailto:${dept.email}`} className="text-emerald-600 dark:text-emerald-400 font-mono font-medium hover:underline">
                        {dept.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
