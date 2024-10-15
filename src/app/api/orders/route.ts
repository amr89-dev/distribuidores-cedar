import { createOrder } from "@/services/order.service";
import { Order } from "@/types";

export async function POST(req: Request) {
  const { items, customerInfo, totalCartAmount } = await req.json();
  try {
    console.log(items, customerInfo, totalCartAmount);
    const order: Order = {
      items,
      customer: customerInfo,
      totalCartAmount,
    };

    const orderCreated = await createOrder(order);

    console.log("-->", orderCreated);
    return Response.json({ orderCreated }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
