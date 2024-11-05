import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import clsx from "clsx";

interface QuantitySelectorProps {
  maxStock: number;
  referencia: string;
  flag?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  maxStock,
  referencia,
  flag,
}) => {
  const { shoppingCart, addToCart, removeFromCart, updateTotalCartAmount } =
    useStore();
  const [item, setItem] = useState({ referencia: "", qty: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setItem({
      referencia: referencia,
      qty: Number(value) > maxStock ? maxStock : Number(value),
    });
  };

  const handleDecrease = () => {
    setItem({ referencia: referencia, qty: item.qty - 1 });
  };

  const handleIncrease = () => {
    setItem({ referencia: referencia, qty: item.qty + 1 });
  };

  const isInShoppingCart = shoppingCart.find(
    (item) => item.referencia === referencia
  );

  return (
    <div className="flex items-center space-x-2">
      <div className="flex border border-neutral-200 rounded-md">
        <Button
          variant="outline"
          size="icon"
          onClick={
            isInShoppingCart
              ? () => {
                  removeFromCart(isInShoppingCart.referencia as string, false);
                  updateTotalCartAmount();
                }
              : handleDecrease
          }
          disabled={
            isInShoppingCart ? isInShoppingCart.qty <= 0 : item.qty <= 0
          }
          className="border-none pl-2 rounded-r-none"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          value={isInShoppingCart ? isInShoppingCart.qty : item.qty}
          onChange={handleInputChange}
          className="max-w-12 border-none text-center px-0 rounded-none"
          min="0"
          max={maxStock}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={
            isInShoppingCart
              ? () => {
                  addToCart({
                    referencia: isInShoppingCart.referencia,
                    qty: 1,
                  });
                  updateTotalCartAmount();
                }
              : handleIncrease
          }
          disabled={
            isInShoppingCart
              ? isInShoppingCart.qty >= maxStock
              : Number(item.qty) >= maxStock
          }
          className="border-none pr-2 rounded-l-none"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {flag && (
        <Button
          className={`w-32 bg-gradient-to-r from-blue-600 to-sky-600 hover:opacity-45 hover:transition-opacity ${clsx(
            isInShoppingCart?.qty &&
              "disabled:bg-gradient-to-r disabled:from-green-600 disabled:to-emerald-600 disabled:opacity-1  "
          )}`}
          onClick={() => {
            addToCart(item);
            updateTotalCartAmount();
          }}
          disabled={item.qty <= 0 || item.qty > maxStock}
        >
          {isInShoppingCart ? "Agregado" : "Seleccionar"}
        </Button>
      )}
    </div>
  );
};

export default QuantitySelector;
