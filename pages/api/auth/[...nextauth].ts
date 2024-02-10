import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import Stripe from "stripe";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      });
      // Create a new customer in Stripe
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email as string || undefined,
          name: user.name as string || undefined,
        });
        // Update the user object in the database PRISMA//
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: customer.id,
          },
        });
      }
    },
  },
  callbacks: {
    async session({ session, token, user}){
      session.user = user
      return session
    }
  }
};

export default NextAuth(authOptions);
