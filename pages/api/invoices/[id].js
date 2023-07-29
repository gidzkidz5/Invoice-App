import connectDatabase from "@/helpers/db-util";

export default async function handler(req, res) {
  const client = await connectDatabase();

  const db = client.db();

  const invoiceId = req.query.id;

  if (req.method === "GET") {
    const result = await db.collection("Invoices").findOne({ id: invoiceId });

    //   console.log(result)
    if(!result) {
        return res.status(404).json({error: "No invoices found"})
    } 
    res.status(200).json({ result });
  }

  client.close();
}
