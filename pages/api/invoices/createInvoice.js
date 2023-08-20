import connectDatabase from "@/helpers/db-util";


export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log(req.body)
      const {createdAt, paymentDue, description, paymentTerms, clientName, clientEmail, senderAddress, clientAddress, items, total } = req.body;

      if (
        !createdAt ||
        !paymentDue ||
        !description ||
        !paymentTerms ||
        !clientName ||
        !clientEmail ||
        !senderAddress ||
        !clientAddress ||
        !items[0].name ||
        total == 0
      ) {
        res.status(422).json({
          message: "Can't be blank"
        })
        return;
      }

      const client = await connectDatabase();
  
      const db = client.db();
      
      const result = await db.collection("Invoices").insertOne(req.body);
        
      res.status(200).json({result})
  
      client.close();
  
    }
  }