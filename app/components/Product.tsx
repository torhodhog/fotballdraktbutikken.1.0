import Image from "next/image";
import formatePrice from "@/utils/PriceFormat";
import Link from "next/link";
import { ProductType } from "@/types/ProductType";

export default function Product({ name, image, unit_amount, id, description, metadata }: ProductType) {
   const { features } = metadata;

   return (
      <Link href={{ pathname: `/product/${id}`, query: { name, image, unit_amount, id, description } }}>
         <div>
            <Image
               src={image}
               alt={name}
               width={400}
               height={400}
               className="rounded-lg"
            />
            <div className="font-medium py-2">
               <h1>{name}</h1>
               <h2 className="text-sm text-teal-700">{unit_amount && formatePrice(unit_amount)}</h2>
            </div>
         </div>
      </Link>
   );
}
