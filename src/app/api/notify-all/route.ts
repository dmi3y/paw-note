import db from "~/utils/db";
import sendNotifications from "~/utils/sendNotifications";

export async function POST(req: Request) {
  await db.read();
  const subscriptions = db.data.subscriptions;
  sendNotifications(subscriptions);
  const data = db.data;
  return Response.json(
    { ...data },
    {
      status: 200,
    }
  );
}
