import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import { format } from "path";
import formatPrice from "@/utils/PriceFormat";

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: { userId: user.user.id },
    include: { products: true },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null)
    return <div>Du må være logget inn for å se dine bestillinger</div>;
  if (orders.length === 0) {
    return (
      <div>
        <h1>Ingen bestillinger</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="font-medium ">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg p-8 my-12">
            <h2>Referansenummer: {order.id}</h2>
            <p>Time: {new Date(order.createdDate).toString()}</p>
            <p className="text-md py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>
                <div className="flex gap-8">
                  {order.products.map((product) => (
                     <div className="py-2" key={product}>
                        <h2 className="py-2">{product.name}</h2>
                        <div className="flex items-center gap-4">
                           <Image src={product.image!} width={36} height={46} alt={product.name}/>
                           <p>{formatPrice(product.unit_amount)}</p>
                           <p>Quantity: {product.quantity}</p>
                        </div>
                     </div>
                  ))}
                </div>
          </div>
        ))}
      </div>
    </div>
  );
}
