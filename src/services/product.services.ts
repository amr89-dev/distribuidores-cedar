import { Product } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const DB_URL = "https://busca-precio-cedar-api.onrender.com/api/list";

export async function getAllProducts(): Promise<Product[]> {
  noStore();
  try {
    const res = await fetch(DB_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
