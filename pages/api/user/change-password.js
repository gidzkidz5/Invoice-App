import connectDatabase from "@/helpers/db-util";
import { hashPassword, verifyPassword } from "@/helpers/auth";
import { getServerSession } from "next-auth/next";


export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const session = await getServerSession(req, res)

  // const sessionToken = req.cookies['sessionToken'];
 
  console.log("session", session)

  // if (sessionToken) {
  //   res.status(200).json({message: 'HELLO IT WORKS'})
  // } else {
  //   res.status(401).json({error: 'Not authenticated'})
  // }
  
    // const session = await getServerSession({req})
    // console.log("session")
    // console.log(session)
   
  

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  if (session){
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid Password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({message: 'Password Updated'})
  }
}

