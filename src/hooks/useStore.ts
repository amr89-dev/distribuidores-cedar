import { CartItem, Product } from "@/types";
import { create } from "zustand";

interface StoreState {
  products: Product[];
  shoppingCart: CartItem[];
  filteredProducts: Product[];
  filters: {
    brand: string;
  };
  setProducts: (products: Product[]) => void;
  setBrand: (brand: string) => void;
  applyFilters: () => void;
  addToCart: (product: CartItem) => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  filteredProducts: [],
  shoppingCart: [],
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
          ? product.brand.toLowerCase() === brand.toLowerCase()
          : true;

        return matchesBrand;
      });

      return { filteredProducts };
    }),
  addToCart: (product: CartItem) =>
    set((state) => {
      const itemExists = state.shoppingCart.find(
        (item) => item.sku === product.sku
      );
      let newCart = [];
      itemExists
        ? (newCart = state.shoppingCart.map((item) =>
            item.sku === product.sku
              ? { ...item, quantity: item.qty + product.qty }
              : item
          ))
        : (newCart = [...state.shoppingCart, product]);

      return { shoppingCart: newCart };
    }),
}));
