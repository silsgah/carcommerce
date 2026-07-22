"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CompareVehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim?: string | null;
  year: number;
  price: number;
  mileage: number;
  image: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  horsepower?: number | null;
  mpgCity?: number | null;
  mpgHighway?: number | null;
  engineInfo?: string | null;
  features: string[];
}

interface CompareState {
  vehicles: CompareVehicle[];
  addVehicle: (vehicle: CompareVehicle) => boolean;
  removeVehicle: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const MAX_COMPARE = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      addVehicle: (vehicle) => {
        const state = get();
        if (state.vehicles.length >= MAX_COMPARE) return false;
        if (state.vehicles.find((v) => v.id === vehicle.id)) return false;
        set({ vehicles: [...state.vehicles, vehicle] });
        return true;
      },
      removeVehicle: (id) =>
        set((state) => ({
          vehicles: state.vehicles.filter((v) => v.id !== id),
        })),
      isInCompare: (id) => get().vehicles.some((v) => v.id === id),
      clearCompare: () => set({ vehicles: [] }),
    }),
    {
      name: "anycargh-compare",
    }
  )
);
