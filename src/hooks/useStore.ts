import { CartItem, Product } from "@/types";
import { create } from "zustand";

interface StoreState {
  products: Product[];
  shoppingCart: CartItem[];
  totalCartAmount: number;
  updateTotalCartAmount: () => void;
  filteredProducts: Product[];
  filters: {
    brand: string;
  };
  setProducts: (products: Product[]) => void;
  setBrand: (brand: string) => void;
  applyFilters: () => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (sku: string | null, all: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  filteredProducts: [],
  shoppingCart: [],
  totalCartAmount: 0,
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
              ? { ...item, qty: item.qty + product.qty }
              : item
          ))
        : (newCart = [...state.shoppingCart, product]);

      return { shoppingCart: newCart };
    }),
  removeFromCart: (sku, all = false) =>
    set((state) => {
      let newCart: CartItem[] = [];
      if (all) {
        return { shoppingCart: newCart };
      }
      const itemToDelete = state.shoppingCart.find((item) => item.sku === sku);

      itemToDelete && itemToDelete?.qty > 1
        ? (newCart = state.shoppingCart.map((item) =>
            item.sku === sku ? { ...item, qty: item.qty - 1 } : item
          ))
        : (newCart = state.shoppingCart.filter((item) => item.sku !== sku));

      return { shoppingCart: newCart };
    }),
  updateTotalCartAmount: () =>
    set((state) => {
      const totalAmount = state.shoppingCart.reduce((acc, item) => {
        const product = state.products.find(
          (product) => product.sku === item.sku
        );
        const price = product?.price ?? 0;
        return acc + item.qty * price;
      }, 0);
      state.totalCartAmount = totalAmount;
      return { totalCartAmount: totalAmount };
    }),
}));
