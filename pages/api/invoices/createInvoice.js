import connectDatabase from "@/helpers/db-util";


export default async function handler(req, res) {
    if (req.method === 'POST') {
      const client = await connectDatabase();
  
      const db = client.db();
  
      const result = await db.collection("Invoices").insertOne(req.body);
  
      res.status(200).json({result})
  
      client.close();
  
    }
  }