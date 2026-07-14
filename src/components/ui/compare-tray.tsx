"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompareArrows, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/stores/compare-store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CompareFloatingBar() {
  const vehicles = useCompareStore((s) => s.vehicles);
  const removeVehicle = useCompareStore((s) => s.removeVehicle);
  const clearCompare = useCompareStore((s) => s.clearCompare);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || vehicles.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none"
      >
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <div className="bg-brand-950 dark:bg-brand-900 text-white rounded-2xl shadow-2xl shadow-brand-950/40 p-4 flex items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <GitCompareArrows className="h-5 w-5 text-accent-400" />
              <span className="text-sm font-medium">
                Compare ({vehicles.length}/4)
              </span>
            </div>

            <div className="flex-1 flex items-center gap-2 overflow-x-auto">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-1.5 bg-brand-800 rounded-lg px-2.5 py-1.5 text-xs shrink-0"
                >
                  <span className="truncate max-w-28">
                    {v.year} {v.make} {v.model}
                  </span>
                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="text-brand-400 hover:text-white transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompare}
                className="text-brand-400 hover:text-white hover:bg-brand-800 text-xs"
              >
                Clear
              </Button>
              <Link href="/compare">
                <Button
                  size="sm"
                  className="bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-xs gap-1"
                >
                  Compare <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
