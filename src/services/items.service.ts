import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types";

export async function getAllItems() {
  try {
    const items = await prisma.items.findMany();
    return items;
  } catch (err) {
    console.log(err);
  }
}

export async function getItemBySku(sku: string) {
  try {
    const item = await prisma.items.findUnique({
      where: { sku },
    });
    return item;
  } catch (err) {
    console.log(err);
  }
}

export async function insertItem(item: CartItem) {
  try {
    const newItem = await prisma.items.create({
      data: {
        sku: item.sku!,
        brand: item.brand,
        description: item.description,
        price: Number(item.price),
      },
    });
    return newItem;
  } catch (err) {
    console.log(err);
  }
}
