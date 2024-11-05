import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types";

export async function getAllOrderItems() {
  try {
    const items = await prisma.order_items.findMany();
    return items;
  } catch (err) {
    console.log(err);
  }
}

export async function insertItem(
  item: CartItem,
  order_id: string,
  total_amount: number
) {
  try {
    const newOrderItem = await prisma.order_items.create({
      data: {
        order_id,
        sku: item.referencia!,
        price: Number(item.price),
        qty: item.qty,
        total_amount: total_amount,
      },
    });
    return newOrderItem;
  } catch (err) {
    console.log(err);
  }
}
