import { prisma } from "@/lib/prisma";
import { Seller } from "@/types";

export async function getAllSellers() {
  try {
    const sellers = await prisma.sellers.findMany();
    return sellers;
  } catch (err) {
    console.log(err);
  }
}

export async function getSellerById(id: string) {
  try {
    if (!id) throw new Error("Seller not found");

    const seller = await prisma.sellers.findUnique({
      where: { id },
    });
    if (!seller) throw new Error("Seller not found");
    return seller;
  } catch (err) {
    throw new Error("Error fetching sellers");
  }
}

export async function createSeller(seller: Seller) {
  try {
    const newSeller = await prisma.sellers.create({
      data: {
        name: seller.name,
        phone: seller.phone,
        email: seller.email,
      },
    });

    return newSeller;
  } catch (err) {
    console.log(err);
  }
}
