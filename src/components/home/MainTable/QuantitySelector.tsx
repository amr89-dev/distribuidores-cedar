import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  maxStock: number;
  sku: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  maxStock,
  sku,
}) => {
  const [items, setItems] = useState({ sku: "", quantity: 1 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setItems({ sku: sku, quantity: Number(value) ?? 1 });
  };

  const handleDecrease = () => {
    setItems({ sku: sku, quantity: items.quantity - 1 });
  };

  const handleIncrease = () => {
    setItems({ sku: sku, quantity: items.quantity + 1 });
  };
  return (
    <div className="flex items-center space-x-2">
      <div className="flex border border-neutral-200 rounded-md">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrease}
          disabled={Number(items.quantity) >= maxStock || items.quantity <= 0}
          className="border-none pl-2 rounded-r-none"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          value={items.quantity}
          onChange={handleInputChange}
          className="max-w-12 border-none text-center px-0 rounded-none"
          min="0"
          max={maxStock}
          disabled={Number(items.quantity) >= maxStock || items.quantity < 0}
          type="number"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrease}
          disabled={Number(items.sku) >= maxStock}
          className="border-none pr-2 rounded-l-none"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
