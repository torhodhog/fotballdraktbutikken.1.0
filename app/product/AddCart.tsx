"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartTypes";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  return (
    <>
      <button
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
        onClick={() =>
          cartStore.addProduct({ name, id, image, unit_amount, quantity})
        }
      >
        Add to cart
      </button>
    </>
  );
}
