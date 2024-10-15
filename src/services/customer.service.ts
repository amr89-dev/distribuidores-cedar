import { prisma } from "../lib/prisma";
import { sql } from "@vercel/postgres";

export async function getCustomerById(id: string) {
  try {
    if (!id) throw new Error("Customer not found");

    const customer = await sql`SELECT * FROM Customers WHERE doc_id = ${id};`;

    if (customer.rows.length === 0) throw new Error("Customer not found");
    return customer;
  } catch (err) {
    throw new Error("Error fetching clients");
  }
}

export async function getAllCustomers() {
  try {
    const customers = await prisma.customers.findMany();
    return customers;
  } catch (err) {
    console.log(err);
  }
}
