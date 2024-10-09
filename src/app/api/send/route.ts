import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { items, dealerInfo } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Distribuidores Cedar <distribuidores@musicalcedar.com>",
      to: [dealerInfo.email, "distribuidores@musicalcedar.com"],
      subject: "Confirmación de pedido",
      react: EmailTemplate({ items, dealerInfo }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
