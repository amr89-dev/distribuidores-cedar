import { MainTable } from "@/components/home/MainTable";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <MainTable />
    </div>
  );
}
