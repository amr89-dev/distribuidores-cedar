import { MainTable } from "@/components/home/MainTable";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Distribuidores</h1>
      <MainTable />
    </div>
  );
}
