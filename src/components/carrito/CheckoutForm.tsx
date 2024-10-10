"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";
import { Customer } from "@/types";
import { useStore } from "@/hooks/useStore";

export default function CheckoutForm() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [customer, setCustomer] = useState<Customer>();
  const { totalCartAmount } = useStore();

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/customers?docid=${searchValue}`);
      if (!res.ok) {
        throw new Error("Failed to fetch customer");
      }
      const data = await res.json();
      if (data.length > 0) {
        setCustomer(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    alert(JSON.stringify(customer, null, 2));
  };

  const formatted = new Intl.NumberFormat("en-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(totalCartAmount);

  return (
    <div className="w-full max-w-md h-auto  top-0">
      <div className=" sticky top-0  flex flex-col gap-2 bg-white ">
        <h2 className="text-xl font-bold ">Datos del cliente:</h2>
        <div className="flex flex-row justify-between gap-2">
          <Input
            type="text"
            name="dealerId"
            placeholder="Introduce el nit de la empresa"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <Button
            variant="outline"
            className={clsx(
              "transition-colors duration-300 ease-in-out",
              searchValue.length > 0 &&
                "bg-gradient-to-r from-blue-800 to-sky-600 text-white"
            )}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            name="name"
            placeholder="Nombre de la empresa"
            value={customer?.name}
            onChange={handleCustomerChange}
          />

          <Input
            type="text"
            name="phone"
            placeholder="Número de teléfono"
            value={customer?.phone}
            onChange={handleCustomerChange}
          />

          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={customer?.email}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="w-full mt-4 flex flex-col gap-2">
          <p className="text-2xl font-bold text-end">Subtotal: {formatted}</p>
        </div>
        <Button
          variant="outline"
          className="w-full mt-2 bg-gradient-to-r from-blue-800 to-sky-600 text-white"
          onClick={handleSubmit}
        >
          Confirmar Pedido
        </Button>
      </div>
    </div>
  );
}
