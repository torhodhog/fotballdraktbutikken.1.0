import Image from "next/image";
import formatePrice from "@/utils/PriceFormat";
import { AddCartType } from "@/types/AddCartTypes";

export default function Product({ name, image, price }: AddCartType) {
  return (
    <div className="text-gray-700">
      <Image
        src={image}
        alt={name}
        width={400}
        height={400}
        className="rounded-lg"
      />
      <div className="font-medium py-2">
      <h1 >{name}</h1>
      <h2 className="text-sm text-teal-700">{price && formatePrice(price)}</h2>
      </div>
    </div>
  );
}
