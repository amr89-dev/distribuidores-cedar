import { createSeller, getAllSellers } from "@/services/serllers.service";

export async function POST(req: Request) {
  const { name, phone, email } = await req.json();
  try {
    const seller = await createSeller({ name, phone, email });

    return Response.json(seller, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sellers = await getAllSellers();
    return Response.json(sellers, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
