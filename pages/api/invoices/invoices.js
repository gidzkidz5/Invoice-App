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

export async function createHandler(req, res) {
  console.log("h1")
  if (req.method === 'POST') {
    const client = await connectDatabase();

    const db = client.db();

    const result = await db.collection("Invoices").insertOne(req.body);

    res.status(200).json({result})

    client.close();

  }
}