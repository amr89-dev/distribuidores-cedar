import { getProducts } from "@/api";
import { MainTable } from "@/components/home/MainTable";
import { Product } from "@/types";

export default async function Home() {
  const data: Product[] = await getProducts();
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Distribuidores</h1>
      <MainTable data={data} />
    </div>
  );
}
