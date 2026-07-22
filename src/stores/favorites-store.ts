"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteVehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  trim?: string | null;
}

interface FavoritesState {
  favorites: FavoriteVehicle[];
  addFavorite: (vehicle: FavoriteVehicle) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (vehicle) =>
        set((state) => {
          if (state.favorites.find((v) => v.id === vehicle.id)) return state;
          return { favorites: [...state.favorites, vehicle] };
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((v) => v.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((v) => v.id === id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "anycargh-favorites",
    }
  )
);
