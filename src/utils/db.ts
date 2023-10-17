import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low<{ subscriptions: any[] }>(new JSONFile("db.json"), {
  subscriptions: [],
});

export default db;
