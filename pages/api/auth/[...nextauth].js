import { verifyPassword } from "../../../helpers/auth"
import connectDatabase from "../../../helpers/db-util";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await connectDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("No User Found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in! - Wrong password?");
        }

        client.close();
        return { email: user.email };
      },
    }),
    // Other providers, if any
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

