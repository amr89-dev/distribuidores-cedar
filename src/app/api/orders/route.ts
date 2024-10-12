export async function POST(req: Request) {
  const { items, customerInfo } = await req.json();
  try {
    console.log(items, customerInfo);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
