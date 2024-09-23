import { MainTable } from "@/components/home/MainTable";
import React, { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Suspense fallback={<p>Cargando...</p>}>
        <MainTable />
      </Suspense>
    </div>
  );
}
