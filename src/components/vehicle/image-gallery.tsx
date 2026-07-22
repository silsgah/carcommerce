"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = images.length > 0 ? images : ["/placeholder-car.jpg"];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white group border border-zinc-200 shadow-xs">
        <Image
          src={items[activeIndex]}
          alt={`${title} - view ${activeIndex + 1}`}
          fill
          className="object-cover transition-all duration-300"
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
        />

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Zoom Lightbox Trigger */}
        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-4 right-4 h-9 w-9 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            }
          />
          <DialogContent className="max-w-[95vw] max-h-[90vh] p-0 overflow-hidden border-none bg-black/95">
            <div className="relative w-full h-[80vh]">
              <Image
                src={items[activeIndex]}
                alt={title}
                fill
                className="object-contain"
                sizes="95vw"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Counter Badge */}
        <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
          {activeIndex + 1} / {items.length}
        </div>
      </div>

      {/* Thumbnails strip */}
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {items.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative aspect-[4/3] w-20 sm:w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                activeIndex === idx
                  ? "border-brand-500 ring-2 ring-brand-500/20"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${title} thumb ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, 96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
