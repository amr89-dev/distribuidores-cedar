import { sql } from "@vercel/postgres";

export async function getCustomerById(id: string) {
  try {
    if (!id) throw new Error("Customer not found");

    const customer = await sql`SELECT * FROM Customers WHERE doc_id = ${id};`;

    return customer;
  } catch (err) {
    throw new Error("Error fetching clients");
  }
}
