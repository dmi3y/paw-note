import db from "~/utils/db";

export async function POST(req: Request) {
  const subscription = await req.json();
  await db.read();
  db.data.subscriptions.push(subscription);
  await db.write();
  const data = db.data;
  return Response.json(
    { ...data },
    {
      status: 200,
    }
  );
}
