"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";

type fakeClient = {
  docId?: string;
  name?: string;
  phone?: string;
  email?: string;
};

const fakeData: fakeClient[] = [
  {
    docId: "1",
    name: "Empresa 1",
    phone: "123456789",
    email: "empresa1@example.com",
  },
  {
    docId: "2",
    name: "Empresa 2",
    phone: "987654321",
    email: "empresa2@example.com",
  },
  {
    docId: "3",
    name: "Empresa 3",
    phone: "555555555",
    email: "empresa3@example.com",
  },
];

export default function CheckoutForm() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [customer, setCustomer] = useState<fakeClient>();

  const handleSearch = async () => {
    setTimeout(() => {
      const res = fakeData.filter((item) => item.docId === searchValue);

      if (res.length > 0) {
        setCustomer(res[0]);
      }
    }, 1000);
  };

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    alert(JSON.stringify(customer, null, 2));
  };

  return (
    <div className="w-full max-w-md h-auto top-0">
      <div className="sticky top-0  flex flex-col gap-2  bg-white">
        <div className="flex flex-row justify-between gap-2">
          <Input
            type="text"
            name="dealer"
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
      </div>
      <Button
        variant="outline"
        className="w-full mt-2 bg-gradient-to-r from-blue-800 to-sky-600 text-white"
        onClick={handleSubmit}
      >
        Confirmar
      </Button>
    </div>
  );
}
