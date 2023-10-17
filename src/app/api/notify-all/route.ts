import { kv } from "@vercel/kv";
import sendNotifications from "~/utils/sendNotifications";

export async function POST(req: Request) {
  try {
    const subs = await kv.hgetall("subscriptions");
    const subscriptions = Object.values(subs || {});
    sendNotifications(subscriptions);
    return Response.json(
      { subscriptions },
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
