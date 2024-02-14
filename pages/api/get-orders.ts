import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions)
  console.log('User session:', userSession);

  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" })
    return
  }

  const orders = await prisma.order.findMany({
    where: { userId: userSession.user.id },
    include: { products: true },
  })

  console.log('Fetched orders:', orders);

  res.status(200).json(orders)
}