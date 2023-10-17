import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  const subscription = await req.json();

  try {
    const response = await kv.hset(
      "subscriptions",

      { [subscription.endpoint]: subscription }
    );
    return Response.json(
      { response },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      { err: err?.toString() },
      {
        status: 500,
      }
    );
  }
}
