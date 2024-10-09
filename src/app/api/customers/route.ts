import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function getClientsFromDB(id: string) {
  try {
    if (!id) throw new Error("Customer not found");
    const customer = await sql`SELECT * FROM Customers WHERE doc_id = ${id};`;
    return customer;
  } catch (err) {
    throw new Error("Error fetching clients");
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("docid") ?? "";
  try {
    const { rows: customer } = await getClientsFromDB(id);
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching clients" },
      { status: 500 }
    );
  }
}
