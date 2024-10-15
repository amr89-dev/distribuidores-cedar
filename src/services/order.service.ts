import { prisma } from "@/lib/prisma";
import { CartItem, Customer, Order } from "@/types";
import { insertItem } from "./orderItems.service";

export async function createOrder(order: Order) {
  const {
    items,
    totalCartAmount,
    customer,
  }: { items: CartItem[]; totalCartAmount: number; customer: Customer } = order;

  try {
    if (!customer.id) {
      throw new Error("Customer ID is required");
    }

    const order = await prisma.orders.create({
      data: {
        customer_id: customer.id,
        order_date: new Date(),
        total_amount: totalCartAmount,
      },
    });

    const orderItems = items.map(async (item) => {
      const total_amount = item.qty * (item.price ?? 0) || 0;

      const newItem = await insertItem(item, order.order_id, total_amount);
      return newItem;
    });

    return { order, orderItems };
  } catch (err) {
    console.log(err);
    throw new Error("Error creating order");
  }
}

export async function getOrderById(order_id: string) {
  try {
    const order = await prisma.orders.findUnique({
      where: { order_id },
    });
    return order;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllOrders() {
  try {
    const orders = await prisma.orders.findMany({
      include: { order_items: true },
    });
    return orders;
  } catch (err) {
    console.log(err);
  }
}
