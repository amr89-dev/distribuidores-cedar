import { Product } from "@/types";
import { create } from "zustand";

interface StoreState {
  products: Product[];
  filteredProducts: Product[];
  filters: {
    brand: string;
  };
  setProducts: (products: Product[]) => void;
  setBrand: (brand: string) => void;
  applyFilters: () => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  filteredProducts: [],
  filters: { brand: "" },
  setProducts: (products) =>
    set(() => {
      set({ filteredProducts: products });
      return { products };
    }),
  setBrand: (brand) =>
    set((state) => ({ filters: { ...state.filters, brand } })),
  applyFilters: () =>
    set((state) => {
      const { brand } = state.filters;
      const filteredProducts = state.products.filter((product) => {
        const matchesBrand = brand
          ? product.marca.toLowerCase() === brand.toLowerCase()
          : true;

        return matchesBrand;
      });

      return { filteredProducts };
    }),
}));
