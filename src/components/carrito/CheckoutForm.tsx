"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";
import { Customer } from "@/types";

export default function CheckoutForm() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [customer, setCustomer] = useState<Customer>();

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

  return (
    <div className="w-full max-w-md h-auto  top-0">
      <h2 className="text-xl font-bold mb-2">Datos del cliente:</h2>
      <div className=" sticky top-0  flex flex-col gap-2 bg-white ">
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
        <div>
          <p>Subtotal: $1000</p>
          <p>Descuento: 10%</p>
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
