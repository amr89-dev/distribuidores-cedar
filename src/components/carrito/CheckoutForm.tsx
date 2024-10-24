"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";
import { Customer } from "@/types";
import { useStore } from "@/hooks/useStore";
import { LoaderCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createOrder, sendConfirmationEmail } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [customer, setCustomer] = useState<Customer>();
  const [isLoading, setIsLoading] = useState({
    searchLoading: false,
    orderLoading: false,
  });
  const { totalCartAmount, shoppingCart, products, removeFromCart } =
    useStore();
  const { toast } = useToast();
  const router = useRouter();

  const handleSearch = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, searchLoading: true }));
      setCustomer((prev) => ({ ...prev, name: "", phone: "", email: "" }));
      const res = await fetch(`/api/customers/${searchValue}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch customer");
      }
      const data = await res.json();
      if (data.id.length > 0) {
        setCustomer(data);
      }
      setIsLoading((prev) => ({ ...prev, searchLoading: false }));
    } catch (err) {
      toast({
        title: "Usuario no encontrado",
        description: `Por favor, verifica los datos e intenta nuevamente. O introduce los datos manualmente.`,
        variant: "warning",
      });
      console.log(err);
      setIsLoading((prev) => ({ ...prev, searchLoading: false }));
    }
  };

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const items = shoppingCart.map((item) => {
      const product = products.find((product) => product.sku === item.sku);
      return {
        sku: item.sku,
        description: product?.description,
        brand: product?.brand,
        price: product?.price,
        totalAmount: item.qty * (product?.price ?? 0),
        qty: item.qty,
      };
    });

    try {
      setIsLoading((prev) => ({ ...prev, orderLoading: true }));
      if (!items.length || !customer) throw new Error("Faltan datos");

      await createOrder(items, customer, totalCartAmount);

      setIsLoading((prev) => ({ ...prev, orderLoading: false }));
      toast({
        title: "Orden creada exitosamente",
        description:
          "La orden ha sido creada exitosamente, a su correo se enviará la confirmación de pedido",
        variant: "success",
      });
      await sendConfirmationEmail(items, customer);

      removeFromCart(null, true);
      setCustomer({});
      router.push("/");
    } catch (err: unknown) {
      toast({
        title: `${err}`,
        description: ` No se pudo crear la orden. Por favor, inténtalo de nuevo`,
        variant: "destructive",
      });
      console.log(err);
      setIsLoading((prev) => ({ ...prev, orderLoading: false }));
    }
  };

  const formatted = formatPrice(totalCartAmount);

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
            className={clsx(
              searchValue.length <= 0 && "border border-blue-600"
            )}
          />
          <Button
            variant="outline"
            className={
              "bg-gradient-to-r from-blue-800 to-sky-600 text-white hover:opacity-90 hover:text-white "
            }
            onClick={() => {
              handleSearch();
            }}
            disabled={searchValue.length <= 0}
          >
            {isLoading.searchLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              "Buscar"
            )}
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
          className="w-full mt-2 bg-gradient-to-r from-blue-800 to-sky-600 text-white hover:opacity-90 hover:text-white "
          disabled={
            isLoading.orderLoading ||
            isLoading.searchLoading ||
            !searchValue.length ||
            shoppingCart.length <= 0
          }
          onClick={() => {
            handleSubmit();
          }}
        >
          {isLoading.orderLoading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            "Confirmar Pedido"
          )}
        </Button>
      </div>
    </div>
  );
}
