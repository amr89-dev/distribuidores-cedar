import CartTable from "@/components/carrito/CartTable";
import { Suspense } from "react";

export default function Carrito() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Suspense fallback={<p>Cargando...</p>}>
        <CartTable />
      </Suspense>
    </div>
  );
}
