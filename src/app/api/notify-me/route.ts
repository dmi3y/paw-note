import db from "~/utils/db";
import sendNotifications from "~/utils/sendNotifications";

export async function POST(req: Request) {
  const { endpoint } = await req.json();
  await db.read();
  const subscription = db.data.subscriptions.find(
    (sub) => sub.endpoint === endpoint
  );
  sendNotifications([subscription]);
  const data = db.data;
  return Response.json(
    { ...data },
    {
      status: 200,
    }
  );
}
