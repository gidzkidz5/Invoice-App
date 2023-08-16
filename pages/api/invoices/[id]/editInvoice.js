import connectDatabase from "@/helpers/db-util";


export default async function handler(req, res) {
    const invoiceId = req.query.id;

    if (req.method === 'PATCH') {
      console.log(req.body)
      const { id, createdAt, paymentDue, description, paymentTerms, clientName, clientEmail, status, senderAddress, clientAddress, items, total } = req.body;

      const client = await connectDatabase();
  
      const db = client.db();
      
      const result = await db.collection("Invoices").findOneAndReplace(
        { id: invoiceId },
        {
            id: id,
            createAt: createdAt,
            paymentDue: paymentDue,
            description: description,
            paymentTerms: paymentTerms,
            clientName: clientName,
            clientEmail, clientEmail,
            status: status,
            senderAddress: {
                street: senderAddress.street,
                city: senderAddress.city,
                postCode: senderAddress.postCode,
                country: senderAddress.country
            },
            clientAddress: {
                street: clientAddress.street,
                city: clientAddress.city,
                postCode: clientAddress.postCode,
                country: clientAddress.country
            },
            items: items,
            total: total

        }
      );
        
      res.status(200).json({result})
  
      client.close();
  
    }

    if (req.method === "DELETE") {
      const client = await connectDatabase();
  
      const db = client.db();

      const result = await db.collection('Invoices').findOneAndDelete({
        id: invoiceId
      });

      res.status(200).json({result})

      client.close()
    }
  }