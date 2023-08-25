import connectDatabase from "@/helpers/db-util";
import { idGenerator, validateEmail } from "@/helpers/others-util";


export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log(req.body)
      const {createdAt, paymentDue, description, paymentTerms, clientName, clientEmail, senderAddress, clientAddress, items, total } = req.body;

      function checkItems(itemsArray) {
        let isInvalid = false;
        itemsArray.forEach(item => {
            if (!(item.name) || (item.quantity == 0 )|| (item.price == 0)) {
              isInvalid = true
            } 
        });
        return isInvalid
      }
      if (
        !createdAt ||
        !paymentDue ||
        !description ||
        !paymentTerms ||
        !clientName ||
        !clientEmail ||
        !senderAddress.street ||
        !senderAddress.city ||
        !senderAddress.postCode ||
        !senderAddress.country ||
        !clientAddress.street ||
        !clientAddress.city ||
        !clientAddress.postCode ||
        !clientAddress.country ||
        checkItems(items) ||
        total === 0
      ) {
        res.status(422).json({
          message: "Can't be blank"
        })
        

        return;
      }

      if (
        !validateEmail(clientEmail)
      ) {
        res.status(422).json({
          message: "Invalid Email Format"
        })
        return;
      }

      const client = await connectDatabase();
  
      const db = client.db();

      let idExists = true;
      let generatedId;
      while(idExists) {
        generatedId = idGenerator();
        console.log(generatedId)
        idExists = await db.collection("Invoices").findOne({id: generatedId})
        console.log("idExists: ", idExists)
      }
  
      console.log("past while loop", idExists)

      req.body.id = generatedId

      console.log("req.body :", req.body)
      
      const result = await db.collection("Invoices").insertOne(req.body);
        
      res.status(200).json({result})
  
      client.close();
  
    }
  }