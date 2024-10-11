import CartTable from "@/components/carrito/CartTable";
import CheckoutForm from "@/components/carrito/CheckoutForm";
import Link from "next/link";
import { Suspense } from "react";

export default function Carrito() {
  return (
    <div className=" max-w-screen-2xl mx-auto p-4">
      <Link
        href="/"
        className=" bg-gradient-to-r from-blue-800 to-sky-600 text-white p-2 rounded-lg"
      >
        Volver
      </Link>
      <div className="flex flex-col lg:flex-row gap-4 mt-3">
        <CheckoutForm />
        <Suspense fallback={<p>Cargando...</p>}>
          <CartTable />
        </Suspense>
      </div>
    </div>
  );
}
