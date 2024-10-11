import CartTable from "@/components/carrito/CartTable";
import CheckoutForm from "@/components/carrito/CheckoutForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Carrito() {
  return (
    <div className=" max-w-screen-2xl mx-auto p-4">
      <div className="flex items-center justify-between ">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm transform transition-transform duration-100 hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-3">
        <CheckoutForm />
        <Suspense fallback={<p>Cargando...</p>}>
          <CartTable />
        </Suspense>
      </div>
    </div>
  );
}
