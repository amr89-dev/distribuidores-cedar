import { getAllProducts } from "@/services/product.services";
import { NextResponse as res } from "next/server";

export async function GET() {
  try {
    const products = await getAllProducts();
    return res.json(products, { status: 200 });
  } catch (error) {
    return res.json({ error: "Unable to fetch products" }, { status: 500 });
  }
}
