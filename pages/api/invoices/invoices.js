import connectDatabase from "@/helpers/db-util";

export default async function handler(req, res) {

  const client = await connectDatabase();

  const db = client.db();

  if (req.method==="GET") {
  const result = await db.collection("Invoices").find().toArray();

  res.status(200).json({result})
  }

  client.close();
}
