import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { items, customer } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Distribuidores Cedar <distribuidores@musicalcedar.com>",
      to: [customer.email, "distribuidores@musicalcedar.com"],
      subject: "Confirmación de pedido",
      react: EmailTemplate({ items, customer }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
