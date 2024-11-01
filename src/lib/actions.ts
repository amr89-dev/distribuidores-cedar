import { CartItem, Customer } from "@/types";

export const sendConfirmationEmail = async (
  items: CartItem[],
  customer: Customer,
  sellerMail: string
) => {
  try {
    const res = await fetch("/api/send/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, customer, sellerMail }),
    });

    if (!res.ok) {
      throw new Error("Failed to send confirmation email");
    }
    const { emailSent } = await res.json();

    return emailSent;
  } catch (err) {
    console.log(err);
    throw new Error("Error sending confirmation email");
  }
};
