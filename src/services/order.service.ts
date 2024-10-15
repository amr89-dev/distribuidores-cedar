import { Order } from "@/types";

export async function createOrder(order: Order) {
  const { items, totalCartAmount, customer } = order;

  try {
    console.log(items, totalCartAmount, customer);

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
