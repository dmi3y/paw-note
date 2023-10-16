import db from "~/utils/db";

export async function POST(req: Request) {
  const subscription = await req.json();
  await db.read();
  const newData = db.data.subscriptions.filter(
    (sub) => sub.endpoint !== subscription.endpoint
  );
  db.data.subscriptions = newData;
  await db.write();
  const data = db.data;
  return Response.json(
    { ...data },
    {
      status: 200,
    }
  );
}
