import { getCustomerById } from "@/services/customer.service";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("docid") ?? "";
  try {
    const { rows: customer } = await getCustomerById(id);
    return res.json(customer, { status: 200 });
  } catch (error) {
    return res.json({ error: "Error fetching clients" }, { status: 500 });
  }
}
