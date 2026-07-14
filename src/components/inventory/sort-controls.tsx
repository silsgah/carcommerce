"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/inventory-filters";
import { cn } from "@/lib/utils";

interface SortControlsProps {
  totalCount: number;
  currentSort: string;
  currentView: "grid" | "list";
}

export function SortControls({
  totalCount,
  currentSort,
  currentView,
}: SortControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updateParams = useCallback(
    (key: string, value: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key !== "page") params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams, startTransition]
  );

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{totalCount}</span>{" "}
        {totalCount === 1 ? "vehicle" : "vehicles"} found
      </p>

      <div className="flex items-center gap-2">
        <Select
          value={currentSort}
          onValueChange={(val) => updateParams("sort", val)}
        >
          <SelectTrigger className="w-[180px] h-9 text-sm rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-none h-9 w-9",
              currentView === "grid" && "bg-muted"
            )}
            onClick={() => updateParams("view", "grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-none h-9 w-9",
              currentView === "list" && "bg-muted"
            )}
            onClick={() => updateParams("view", "list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
