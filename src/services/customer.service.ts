import { prisma } from "../lib/prisma";

export async function getCustomerById(id: string) {
  try {
    if (!id) throw new Error("Customer not found");

    const customer = await prisma.customers.findUnique({
      where: { doc_id: id },
    });
    if (!customer) throw new Error("Customer not found");
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
