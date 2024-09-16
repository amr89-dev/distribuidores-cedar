import { getProducts } from "@/api";
import { MainTable } from "@/components/home/MainTable";
import { Product } from "@/types";
import { Suspense } from "react";

export default async function Home() {
  const data: Product[] = await getProducts();
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Distribuidores</h1>
      <Suspense fallback={<p>Cargando...</p>}>
        {data.length > 0 ? (
          <MainTable data={data} />
        ) : (
          <p>No se pudieron cargar los productos.</p>
        )}
      </Suspense>
    </div>
  );
}
