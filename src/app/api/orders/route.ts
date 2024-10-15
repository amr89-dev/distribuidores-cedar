import { createOrder, getAllOrders } from "@/services/order.service";
import { Order } from "@/types";

export async function POST(req: Request) {
  const { items, customer, totalCartAmount } = await req.json();
  try {
    const order: Order = {
      items,
      customer,
      totalCartAmount,
    };

    const orderCreated = await createOrder(order);

    return Response.json({ orderCreated }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await getAllOrders();
    return Response.json(orders, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
