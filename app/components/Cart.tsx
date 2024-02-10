"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/utils/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";

const Cart = () => {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0  bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 h-screen p-12 overflow-y-scroll text-gray w-full lg:w-2/5"
      >
        <button onClick={() => cartStore.toggleCart()} className="text-sm font-bold pb-12">Tilbake til butikk</button>
        {/* Cart Items */}
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((item) => (
              <div className="flex py-4 gap-4" key={item.id}>
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
                    <h2>Quantity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
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
          </>
        )}
        {cartStore.cart.length > 0 && (
          <motion.div layout>
            <p>Totalt: {formatPrice(totalPrice)}</p>
            <button 
            onClick={() => cartStore.setCheckout('checkout')}
            className="py-2 mt-4 bg-teal-700 w-full text-white rounded-md">
              Checkout
            </button>
          </motion.div>
        )}
        {/* Checkout form */}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        <AnimatePresence>
          {!cartStore.cart.length && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-36 opacity-75"
            >
              <h1>OOPS.. den er tom</h1>
              <Image src="/basket.jpg" alt="basket" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cart;
