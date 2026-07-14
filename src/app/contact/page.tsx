"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
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
  message: zod.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = zod.infer<typeof contactSchema>;

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
    toast.success("Message sent successfully! Our team will contact you shortly.");
    reset();
  };

  return (
    <div className="pt-24 pb-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Contact Our Team
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Have questions about a vehicle, financing options, or want to schedule a visit?
            Send us a message and our specialists will be in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-card border border-border/50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
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
                    placeholder="(555) 123-4567"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Describe how we can help you..."
                  rows={6}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-600 text-white rounded-xl">
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>

          {/* Contact Details side pane */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="p-6 border-border/50 rounded-2xl space-y-6">
              <h3 className="font-heading font-bold text-base text-foreground">Dealership Information</h3>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="mt-0.5">123 Auto Drive, Springfield, IL 62701</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="mt-0.5">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="mt-0.5">info@autolot.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Sales Hours</p>
                    <div className="mt-1 space-y-1 text-xs">
                      <p>Mon-Fri: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Embedded interactive map placeholder */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Map View Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
