import { getAllItems } from "@/services/items.service";
import { NextResponse as res } from "next/server";

export async function GET() {
  try {
    const items = await getAllItems();
    return res.json(items, { status: 200 });
  } catch (error) {
    return res.json({ error: "Unable to fetch items" }, { status: 500 });
  }
}
