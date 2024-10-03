import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import clsx from "clsx";

interface QuantitySelectorProps {
  maxStock: number;
  sku: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  maxStock,
  sku,
}) => {
  const { shoppingCart, addToCart } = useStore();

  const [item, setItem] = useState({ sku: "", quantity: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setItem({
      sku: sku,
      quantity: Number(value) > maxStock ? maxStock : Number(value),
    });
  };

  const handleDecrease = () => {
    setItem({ sku: sku, quantity: item.quantity - 1 });
  };

  const handleIncrease = () => {
    setItem({ sku: sku, quantity: item.quantity + 1 });
  };

  const isInShoppingCart = shoppingCart.find((item) => item.sku === sku);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex border border-neutral-200 rounded-md">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrease}
          disabled={item.quantity <= 0}
          className="border-none pl-2 rounded-r-none"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          value={item.quantity}
          onChange={handleInputChange}
          className="max-w-12 border-none text-center px-0 rounded-none"
          min="0"
          max={maxStock}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrease}
          disabled={Number(item.quantity) >= maxStock}
          className="border-none pr-2 rounded-l-none"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        className={`w-32 bg-gradient-to-r from-blue-600 to-sky-600 hover:opacity-45 hover:transition-opacity ${clsx(
          isInShoppingCart?.quantity &&
            "bg-gradient-to-r from-green-600 to-emerald-600"
        )}`}
        onClick={() => addToCart(item)}
        disabled={item.quantity <= 0 || item.quantity > maxStock}
      >
        {isInShoppingCart ? "Agregado" : "Seleccionar"}
      </Button>
    </div>
  );
};

export default QuantitySelector;
