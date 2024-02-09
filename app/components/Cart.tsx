"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/utils/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

const Cart = () => {
  const cartStore = useCartStore();

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0  bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w.1/4 h-screen p-12 overflow-y-scroll text-gray"
      >
        <h1>Dette har du handlet</h1>
        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4">
            <Image
              className="rounded-md h-34"
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quanttity: {item.quantity}</h2>
                <button onClick={() => cartStore.removeProduct({
                  id: item.id,
                  image: item.image,
                  name: item.name,
                  unit_amount: item.unit_amount,
                  quantity: item.quantity,
                })}>
                  <IoRemoveCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>

              <p className="text-sm">
                {item.unit_amount && formatPrice(item.unit_amount)}
              </p>
            </div>
          </div>
        ))}
        {cartStore.cart.length > 0 && (
        <button className="py-2 mt-4 bg-teal-700 w-full text-white rounded-md">
          Checkout
        </button>
        ) } 
        {!cartStore.cart.length && (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-36 opacity-75">
            <h1>OOPS.. den er tom</h1>
            <Image src="/basket.jpg" alt="basket" width={200} height={200} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;