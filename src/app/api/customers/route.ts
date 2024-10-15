import { getAllCustomers } from "@/services/customer.service";
import { NextResponse as res } from "next/server";

export async function GET() {
  try {
    const customers = await getAllCustomers();
    return res.json(customers, { status: 200 });
  } catch (error) {
    return res.json({ error: "Unable to fetch customers" }, { status: 500 });
  }
}
