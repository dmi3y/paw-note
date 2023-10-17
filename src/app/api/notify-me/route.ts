import { kv } from "@vercel/kv";
import sendNotifications from "~/utils/sendNotifications";

export async function POST(req: Request) {
  const subscription = await req.json();

  try {
    const sub = await kv.hget("subscriptions", subscription.endpoint);
    sendNotifications([sub]);
    return Response.json(
      { sub },
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
