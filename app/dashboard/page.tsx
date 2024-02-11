// import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./auth/[...nextauth]";

// const fetchOrders = async () => {
//    const prisma = new PrismaClient();
//    const user = await getServerSession(authOptions)
//    if(!user){
//       return {message: "Ikke logget inn"}
//    }
//    const orders = await prisma.order.findMany({
//       where: {userId: user.user.id},
//       include: {products: true}
//   })
//   return orders
// }

// export default async function Dashboard(){
//    const orders = await fetchOrders()
//    console.log(orders)
//    return(
//       <div>
//          <h1>Dashboard</h1>
//       </div>
//    )
// }