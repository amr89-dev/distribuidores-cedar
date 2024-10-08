import CartTable from "@/components/carrito/CartTable";
import CheckoutForm from "@/components/carrito/CheckoutForm";
import { Suspense } from "react";

export default function Carrito() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 max-w-screen-2xl mx-auto p-4">
      <CheckoutForm />
      <Suspense fallback={<p>Cargando...</p>}>
        <CartTable />
      </Suspense>
    </div>
  );
}
