import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  const subscription = await req.json();

  try {
    const response = await kv.hdel("subscriptions", subscription.endpoint);
    return Response.json(
      { response },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      { err },
      {
        status: 500,
      }
    );
  }
}
