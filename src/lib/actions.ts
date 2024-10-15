import { CartItem, Customer } from "@/types";

export const createOrder = async (
  items: CartItem[],
  customer: Customer,
  totalCartAmount: number
) => {
  try {
    const res = await fetch("api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, customer, totalCartAmount }),
    });

    if (!res.ok) {
      throw new Error("Failed to create order");
    }
    const { orderCreated } = await res.json();

    return orderCreated;
  } catch (err) {
    console.log(err);
    throw new Error("Error creating order");
  }
};
