"use client";
import { useStore } from "@/hooks/useStore";
import { ShoppingCart } from "lucide-react";

export default function CartIndicator() {
  const { shoppingCart } = useStore();
  return (
    <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
      <ShoppingCart className="h-5 w-5 mr-2" />
      <span className="font-semibold">{shoppingCart.length}</span>
    </div>
  );
}
