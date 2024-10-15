import { getCustomerById } from "@/services/customer.service";
import { NextResponse as res } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { docid: string } }
) {
  const { docid } = params;
  try {
    const customer = await getCustomerById(docid);

    if (!customer) {
      return res.json({ error: "Customer not found" }, { status: 404 });
    }

    return res.json(customer, { status: 200 });
  } catch (error) {
    return res.json({ error: "Error fetching customer" }, { status: 500 });
  }
}
