"use client";

import { useState } from "react";
import { Heart, GitCompareArrows, Calendar, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useCompareStore, CompareVehicle } from "@/stores/compare-store";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";

interface PricePanelProps {
  vehicle: CompareVehicle & {
    condition: string;
    isNewArrival: boolean;
    isPriceDrop: boolean;
    previousPrice?: number | null;
  };
}

export function PricePanel({ vehicle }: PricePanelProps) {
  const [openInquiry, setOpenInquiry] = useState(false);
  const [openTestDrive, setOpenTestDrive] = useState(false);
  const [openReserve, setOpenReserve] = useState(false);

  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(vehicle.id));

  const addToCompare = useCompareStore((s) => s.addVehicle);
  const removeFromCompare = useCompareStore((s) => s.removeVehicle);
  const isInCompare = useCompareStore((s) => s.isInCompare(vehicle.id));

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(vehicle.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite({
        id: vehicle.id,
        slug: vehicle.slug,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        image: vehicle.image,
        trim: vehicle.trim,
      });
      toast.success("Added to favorites");
    }
  };

  const handleCompare = () => {
    if (isInCompare) {
      removeFromCompare(vehicle.id);
      toast.success("Removed from comparison");
    } else {
      const added = addToCompare(vehicle);
      if (added) toast.success("Added to comparison");
      else toast.error("Compare tray is full (max 4)");
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry sent successfully! A sales specialist will contact you shortly.");
    setOpenInquiry(false);
  };

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Test drive request received! We will confirm your appointment shortly.");
    setOpenTestDrive(false);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reservation request submitted! We have placed a temporary hold on this vehicle.");
    setOpenReserve(false);
  };

  const estimatedMonthly = Math.round(vehicle.price / 60);

  return (
    <Card className="p-6 border-border/60 shadow-xl shadow-black/5 dark:shadow-none rounded-2xl sticky top-24 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Badge variant={vehicle.condition === "NEW" ? "default" : "secondary"}>
            {vehicle.condition === "CERTIFIED" ? "Certified Pre-Owned" : vehicle.condition === "NEW" ? "New" : "Used"}
          </Badge>
          {vehicle.isPriceDrop && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white border-none">
              Price Drop
            </Badge>
          )}
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {formatPrice(vehicle.price)}
        </h2>
        {vehicle.isPriceDrop && vehicle.previousPrice && (
          <p className="text-sm text-muted-foreground line-through mt-0.5">
            Was {formatPrice(vehicle.previousPrice)}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Estimated payment: <span className="font-semibold text-foreground">{formatPrice(estimatedMonthly)}/mo</span> for 60 mos.
        </p>
      </div>

      <div className="space-y-2.5 pt-2">
        {/* Request to Reserve */}
        <Dialog open={openReserve} onOpenChange={setOpenReserve}>
          <DialogTrigger
            render={
              <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white rounded-xl h-11 text-sm font-semibold shadow-lg shadow-accent-500/20 hover:shadow-accent-500/35 transition-all">
                Request to Reserve
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            }
          />
          <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Request to Hold / Reserve</DialogTitle>
              <DialogDescription>
                Place a temporary hold on this {vehicle.year} {vehicle.make} {vehicle.model}. No payment required today.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleReserveSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <Label htmlFor="reserve-name">Full Name</Label>
                <Input id="reserve-name" required placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="reserve-email">Email Address</Label>
                  <Input id="reserve-email" type="email" required placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reserve-phone">Phone Number</Label>
                  <Input id="reserve-phone" type="tel" required placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="reserve-contact">Preferred Contact Method</Label>
                <select id="reserve-contact" className="w-full h-10 px-3 border rounded-lg text-sm bg-background">
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-accent-500 text-white rounded-xl">
                Submit Reservation Request
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Schedule Test Drive */}
        <Dialog open={openTestDrive} onOpenChange={setOpenTestDrive}>
          <DialogTrigger
            render={
              <Button variant="outline" className="w-full rounded-xl h-11 text-sm font-semibold border-border hover:bg-muted">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Test Drive
              </Button>
            }
          />
          <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Schedule a Test Drive</DialogTitle>
              <DialogDescription>
                Select a preferred date and time to test drive the {vehicle.year} {vehicle.make} {vehicle.model}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTestDriveSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <Label htmlFor="drive-name">Full Name</Label>
                <Input id="drive-name" required placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="drive-email">Email</Label>
                  <Input id="drive-email" type="email" required placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="drive-phone">Phone</Label>
                  <Input id="drive-phone" type="tel" required placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="drive-date">Preferred Date</Label>
                  <Input id="drive-date" type="date" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="drive-time">Preferred Time</Label>
                  <Input id="drive-time" type="time" required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-brand-600 text-white rounded-xl">
                Request Test Drive Appointment
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Ask a Question */}
        <Dialog open={openInquiry} onOpenChange={setOpenInquiry}>
          <DialogTrigger
            render={
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground text-xs font-semibold">
                <Mail className="h-3.5 w-3.5 mr-1.5" />
                Ask a Question
              </Button>
            }
          />
          <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Ask a Question</DialogTitle>
              <DialogDescription>
                Need more information about this vehicle? Send us an inquiry.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInquirySubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <Label htmlFor="inquiry-name">Full Name</Label>
                <Input id="inquiry-name" required placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="inquiry-email">Email</Label>
                  <Input id="inquiry-email" type="email" required placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="inquiry-phone">Phone (Optional)</Label>
                  <Input id="inquiry-phone" type="tel" placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="inquiry-msg">Message</Label>
                <Textarea id="inquiry-msg" required placeholder="Is this vehicle still available? Can you send more photos of the interior?" rows={4} />
              </div>
              <Button type="submit" className="w-full bg-brand-600 text-white rounded-xl">
                Send Message
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 border-t pt-4">
        <Button
          variant="outline"
          className={cn("flex-1 rounded-xl gap-1.5", isFavorite && "text-red-500 border-red-100 bg-red-50/50 dark:bg-red-950/20")}
          onClick={handleFavorite}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          {isFavorite ? "Saved" : "Save"}
        </Button>
        <Button
          variant="outline"
          className={cn("flex-1 rounded-xl gap-1.5", isInCompare && "text-brand-500 border-brand-100 bg-brand-50/50 dark:bg-brand-950/20")}
          onClick={handleCompare}
        >
          <GitCompareArrows className="h-4 w-4" />
          {isInCompare ? "Added" : "Compare"}
        </Button>
      </div>

      <div className="border-t pt-4 flex gap-3 text-xs text-muted-foreground items-start">
        <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">AutoLot Certified Guarantee</p>
          <p className="mt-0.5 leading-relaxed">
            Includes a 12-Month / 12,000-Mile Limited Warranty, Carfax History Report, and a 150-Point inspection.
          </p>
        </div>
      </div>
    </Card>
  );
}
