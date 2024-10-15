import { getItemBySku } from "@/services/items.service";
import { NextResponse as res } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sku: string } }
) {
  const { sku } = params;
  try {
    const item = await getItemBySku(sku);

    if (!item) {
      return res.json({ error: "Item not found" }, { status: 404 });
    }

    return res.json(item, { status: 200 });
  } catch (error) {
    return res.json({ error: "Error fetching item" }, { status: 500 });
  }
}
