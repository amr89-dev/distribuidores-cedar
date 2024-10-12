"use client";
import { useStore } from "@/hooks/useStore";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";

export default function CartIndicator() {
  const { shoppingCart } = useStore();
  return (
    <div
      className={`flex items-center relative ${clsx(
        shoppingCart.length > 0 && " "
      )} `}
    >
      <ShoppingCart className="h-9 w-9 mr-6 " />
      {shoppingCart.length > 0 && (
        <span className="font-semibold bg-blue-700 rounded-full px-2 text-md absolute -top-2 right-1 text-white">
          {shoppingCart.length}
        </span>
      )}
    </div>
  );
}
