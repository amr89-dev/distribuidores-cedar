import { Product } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGJc9SkZ2tWcF9d5tEHQT4DjfMXTQrPETmypesiFn2cyFpnAWY7jQ76DXhnV_8aI2wW80W-142aoOA/pub?gid=789871611&single=true&output=csv";

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
