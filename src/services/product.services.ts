import { Product } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3X2PlMrFA5SinHE-B-h5IUrJM07yyXR633pt-ocWbYshgvSeJNi1oKL8BqFCSN59WJlvYebMWxODj/pub?gid=247277617&single=true&output=csv";

export async function getAllProducts(): Promise<Product[]> {
  noStore();
  try {
    const response = await fetch(DB_URL);
    const resText = await response.text();
    const arrProduct = resText.split("\r\n").slice(1);

    const data: Product[] = arrProduct.map((row) => {
      const arrRow = row.split(",");
      const product: Product = {
        sku: arrRow[0].trim(),
        description: arrRow[1].trim(),
        price: Number(arrRow[2]),
        stock: Number(arrRow[3]),
        brand: arrRow[4].trim().toUpperCase(),
        images: arrRow[5].split(";").map((image) => image.replace('"', "")),
      };
      return product;
    });

    return data.sort((a, b) => b.sku.localeCompare(a.sku));
  } catch (err) {
    console.log(err);
    return [];
  }
}
